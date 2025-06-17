<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
  /**
   * Display the user's profile form.
   */
  public function edit(Request $request): Response
  {
    return Inertia::render('Profile/Edit', [
      'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
      'status' => session('status'),
    ]);
  }

  /**
   * Update the user's profile information.
   */
  public function update(ProfileUpdateRequest $request): RedirectResponse
  {
    $request->user()->fill($request->validated());

    if ($request->user()->isDirty('email')) {
      $request->user()->email_verified_at = null;
    }

    $request->user()->save();

    return Redirect::route('profile.edit');
  }

  /**
   * Update profile with file upload (POST method)
   */
  public function updateWithFile(Request $request): RedirectResponse
  {
    $user = $request->user();

    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
      'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:2048',
      'remove_profile_picture' => 'boolean',
    ]);

    // Handle profile picture removal
    if ($request->boolean('remove_profile_picture') && $user->profile_picture) {
      // Delete old profile picture from external service
      // $this->deleteProfilePictureFromService($user->profile_picture);

      // Set profile_picture to null
      $user->profile_picture = null;
    }
    // Handle profile picture upload (only if not removing)
    elseif ($request->hasFile('profile_picture') && !$request->boolean('remove_profile_picture')) {
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
          // $this->deleteProfilePictureFromService($user->profile_picture);
        }

        $user->profile_picture = $responseData['file']['fileName'];
      } catch (\Exception $e) {
        return back()->withErrors(['profile_picture' => 'Error uploading profile picture: ' . $e->getMessage()]);
      }
    }

    // Update other profile data
    $user->name = $validatedData['name'];
    $user->email = $validatedData['email'];

    if ($user->isDirty('email')) {
      $user->email_verified_at = null;
    }

    $user->save();

    return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
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
   * Delete the user's account.
   */
  public function destroy(Request $request): RedirectResponse
  {
    $request->validate([
      'password' => ['required', 'current_password'],
    ]);

    $user = $request->user();

    // Delete profile picture before deleting user
    if ($user->profile_picture) {
      $this->deleteProfilePictureFromService($user->profile_picture);
    }

    Auth::logout();

    $user->delete();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return Redirect::to('/');
  }
}
