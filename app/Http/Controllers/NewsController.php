<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
  public function approve($id)
  {
    $news = News::findOrFail($id);
    $news->status_id = 3;
    $news->save();

    return back()->with('success', 'Warta Minggu berhasil disetujui.');
  }


  public function revert($id)
  {
    $news = News::findOrFail($id);
    $news->status_id = 2;
    $news->save();

    return back()->with('success', 'Warta Minggu berhasil dikembalikan menjadi review.');
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $news = News::with(['status', 'user'])->paginate(20);
    $statuses = Status::get();

    return Inertia::render("News/Index", compact('news', 'statuses'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $statuses = Status::all();

    return Inertia::render('News/Create', [
      'statuses' => $statuses,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'title' => 'nullable|string|max:255',
      'alternate_title' => 'required|string|max:255',
      "file" => 'required|file|mimes:pdf|max:2048',
      'user_id' => 'required|integer|exists:users,id',
      'status_id' => 'required|integer|exists:statuses,id',
    ]);

    $file = $request->file('file');

    $client = new \GuzzleHttp\Client();

    $PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL');

    try {
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
        return back()->withErrors(['file' => 'File upload failed.']);
      }

      $validatedData['document_name'] = $responseData['file']['fileName'];

      News::create($validatedData);

      return to_route('warta-minggu.create')->with('success', 'Warta Minggu berhasil diunggah.');
    } catch (\Exception $e) {
      to_route('warta-minggu.create')->with('error', 'Warta Minggu gagal diunggah.' . $e->getMessage());
      return back()->withErrors(['file' => 'Error uploading file: ' . $e->getMessage()]);
    }
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request)
  {
    $user = $request->user();

    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
      'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:2048',
    ]);

    // Handle profile picture upload
    if ($request->hasFile('profile_picture')) {
      $file = $request->file('profile_picture');

      $client = new \GuzzleHttp\Client();
      $PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL');

      try {
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
          return back()->withErrors(['profile_picture' => 'Profile picture upload failed.']);
        }

        // Delete old profile picture if exists
        if ($user->profile_picture) {
          // Optionally delete old file from external service
          // You might want to implement a delete endpoint
        }

        $validatedData['profile_picture'] = $responseData['file']['fileName'];
      } catch (\Exception $e) {
        return back()->withErrors(['profile_picture' => 'Error uploading profile picture: ' . $e->getMessage()]);
      }
    }

    // Remove profile_picture from validated data if no file was uploaded
    if (!$request->hasFile('profile_picture')) {
      unset($validatedData['profile_picture']);
    }

    $user->fill($validatedData);

    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    $user->save();

    return redirect()->route('profile.edit')->with('success', 'Profile updated successfully.');
  }
  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
