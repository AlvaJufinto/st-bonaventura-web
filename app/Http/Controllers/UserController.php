<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function getUsers(Request $request)
  {
    $query = User::query();

    $query->where('status_id', 3);
    // $query->whereDoesntHave('organization');

    // Filter berdasarkan search term jika ada
    if ($search = $request->input('search')) {
      $query->whereRaw(
        "MATCH(name, username, email) AGAINST (? IN BOOLEAN MODE)",
        [$search]
      );
    }

    $users = $query->limit(10)->get();

    return response()->json([
      'data' => $users,
    ]);
  }

  public function index(Request $request)
  {

    $search = $request->input('search');

    $query = User::select('id', 'name', 'username', 'email', 'role_id', 'status_id', 'profile_picture')
      ->with([
        'role:id,name',
        'organizations',
        'status:id,name'
      ]);

    // Add search functionality
    if ($search && strlen($search) >= 3) {
      $query->where(function ($q) use ($search) {
        $q->where('name', 'like', "%{$search}%")
          ->orWhere('username', 'like', "%{$search}%")
          ->orWhere('email', 'like', "%{$search}%");
      });
    }
    $users = $query->paginate(30);

    $users->appends(['search' => $request->input('search')]);

    return Inertia::render('User/Index', compact('users'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    $user = User::with(['role:id,name', 'organizations', 'status:id,name'])
      ->findOrFail($id);

    $roles = \App\Models\Role::select('id', 'name')->get();
    $statuses = \App\Models\Status::select('id', 'name')->get();

    $organizations = \App\Models\Organization::whereNotIn('organization_type_id', [3])
      ->with(['parent'])
      ->get()
      ->map(function ($org) use ($user) {
        $org->is_occupied = $org->head_id && $org->head_id != $user->id;
        $org->is_current_user = $org->head_id == $user->id;

        if ($org->organization_type_id == 2) {
          $org->name = "{$org->name} ({$org->parent->name})";
        }

        return $org;
      });

    $publicAssetUrl = config('app.PUBLIC_ASSET_URL');

    return Inertia::render('User/Edit', compact('user', 'roles', 'statuses', 'organizations', 'publicAssetUrl'));
  }

  public function update(Request $request, string $id)
  {
    $user = User::findOrFail($id);

    $request->validate([
      'name' => 'required|string|max:255',
      'username' => 'required|string|max:255|unique:users,username,' . $id,
      'email' => 'required|string|email|max:255|unique:users,email,' . $id,
      'role_id' => 'required|exists:roles,id',
      'status_id' => 'required|exists:statuses,id',
      'organizations' => 'array',
      'organizations.*' => 'exists:organizations,id',
    ]);

    $user->update($request->only(['name', 'username', 'email', 'role_id', 'status_id']));

    if ($request->has('organizations')) {
      // Reset semua organization yang sebelumnya dipimpin user ini
      \App\Models\Organization::where('head_id', $id)->update(['head_id' => null]);

      // Set organization yang dipilih dengan head_id = user ini
      if (!empty($request->organizations)) {
        \App\Models\Organization::whereIn('id', $request->organizations)
          ->update(['head_id' => $id]);
      }
    }

    return redirect()->route('user.index')->with('success', 'User updated successfully.');
  }

  /**
   * Upload profile picture for user
   */
  public function uploadProfilePicture(Request $request, string $id)
  {
    $user = User::findOrFail($id);

    $request->validate([
      'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB max
    ]);

    try {
      $file = $request->file('profile_picture');
      $client = new \GuzzleHttp\Client();
      $PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL');

      // Upload to external service
      $response = $client->post("{$PUBLIC_ASSET_URL}/upload", [
        'multipart' => [
          [
            'name'      => 'file',
            'contents'  => fopen($file->getPathname(), 'r'),
            'filename'  => $file->getClientOriginalName(),
          ],
        ],
      ]);

      $responseData = json_decode($response->getBody()->getContents(), true);

      if (!isset($responseData['file']['fileName'])) {
        return redirect()->back()->with('error', 'Profile picture upload failed.');
      }

      // Delete old profile picture if exists
      if ($user->profile_picture) {
        $this->deleteProfilePictureFromService($user->profile_picture);
      }

      // Update user record with new filename
      $user->update([
        'profile_picture' => $responseData['file']['fileName']
      ]);

      return redirect()->back()->with('success', 'Profile picture uploaded successfully.');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Failed to upload profile picture: ' . $e->getMessage());
    }
  }

  /**
   * Remove profile picture for user
   */
  public function removeProfilePicture(Request $request, string $id)
  {
    $user = User::findOrFail($id);

    try {
      // Delete profile picture from external service if exists
      if ($user->profile_picture) {
        $this->deleteProfilePictureFromService($user->profile_picture);
      }

      // Update user record
      $user->update([
        'profile_picture' => null
      ]);

      return redirect()->back()->with('success', 'Profile picture removed successfully.');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Failed to remove profile picture: ' . $e->getMessage());
    }
  }

  /**
   * Delete profile picture from external service
   */
  private function deleteProfilePictureFromService($fileName)
  {
    try {
      $client = new \GuzzleHttp\Client();
      $PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL');

      $response = $client->delete("{$PUBLIC_ASSET_URL}/delete/{$fileName}");

      // Log the response if needed
      // \Log::info('Profile picture deleted: ' . $fileName);
    } catch (\Exception $e) {
      // Log error but don't fail the request
      // \Log::error('Failed to delete profile picture from service: ' . $e->getMessage());
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
