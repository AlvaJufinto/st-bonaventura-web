<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\ArticleType;
use App\Models\Organization;
use App\Models\Status;
use App\Models\User;
use App\Services\Permissions;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $statuses = Status::get();
    $user = auth()->user();

    $permissions = Permissions::permissions($user);

    $relations = ['status', 'user', 'publisher', 'articleType'];

    $articles =  $permissions['allowToseeAllBeritaKegiatan'] ? Article::with($relations)->paginate(10) : Article::with($relations)->where('user_id', $user->id)->paginate(10);

    return Inertia::render('Articles/Index', compact('articles', 'statuses'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $statuses = Status::get();
    $user = Auth::user();
    $organizations = $user->organizations;
    $articleTypes = ArticleType::get();

    return Inertia::render('Articles/Create', props: [
      'statuses' => $statuses,
      'organizations' => $organizations,
      'articleTypes' => $articleTypes
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'title' => 'required|max:255',
      'published_date' => 'required|date|before_or_equal:today',
      'expired_date' => 'required|date|after_or_equal:today',
      'content' => 'required',
      'publisher_id' => 'required|integer|exists:organizations,id',
      'status_id' => 'required|integer|exists:statuses,id',
      'article_type_id' => 'required|integer|exists:article_types,id',
      "image" => 'required|file|mimes:png,jpg,jpeg,webp|max:5120',
    ]);

    if ($validated['article_type_id'] != 3) {
      unset($validated['expired_date']);
    }

    $validated['user_id'] = Auth::user()->id;

    $validated['preview'] = Str::words(
      strip_tags($validated['content']),
      20
    );

    $file = $request->file('image');
    $client = new \GuzzleHttp\Client();
    $PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL');

    try {
      // Upload image to external service
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
        return back()->withErrors(['image' => 'Image upload failed.']);
      }

      // Replace image file with uploaded filename
      $validated['main_image_name'] = $responseData['file']['fileName'];

      // Create article with uploaded image filename
      Article::create($validated);

      return to_route('article.index')->with('success', "Artikel berhasil dibuat");
    } catch (\Exception $e) {
      return redirect()->back()
        ->with('error', 'Artikel gagal dibuat. Error uploading image: ' . $e->getMessage())
        ->withErrors(['image' => 'Error uploading image: ' . $e->getMessage()]);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Article $article)
  {
    $article = $article->load(['publisher']);
    return Inertia::render('Information/ArticleDetail', compact('article'));
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Article $article)
  {
    $statuses = Status::get();
    $user = Auth::user();
    $organizations = $user->organizations;
    $articleTypes = ArticleType::get();


    $article = $article->load(['status', 'user', 'publisher']);

    return Inertia::render('Articles/Edit', [
      'article' => $article,
      'statuses' => $statuses,
      'organizations' => $organizations,
      'articleTypes' => $articleTypes
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Article $article)
  {
    $validated = $request->validate([
      'title' => 'required|max:255',
      'published_date' => 'required|date',
      'expired_date' => 'nullable|date',
      'content' => 'required',
      'publisher_id' => 'required|integer|exists:organizations,id',
      'status_id' => 'required|integer|exists:statuses,id',
      'article_type_id' => 'required|integer|exists:article_types,id',
      "image" => 'nullable|file|mimes:png,jpg,jpeg,webp|max:5120',
    ]);


    // Handle expired_date logic
    if ($validated['article_type_id'] != 3) {
      $validated['expired_date'] = null;
    }

    // Update preview from content
    $validated['preview'] = Str::words(
      strip_tags($validated['content']),
      20
    );

    // Handle image upload if new image is provided
    if ($request->hasFile('image')) {
      $file = $request->file('image');
      $client = new \GuzzleHttp\Client();
      $PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL'); // Use config() instead of env() for consistency

      try {
        // Upload new image to external service
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
          return back()->withErrors(['image' => 'Image upload failed.']);
        }

        // Update with new image filename
        $validated['main_image_name'] = $responseData['file']['fileName'];
      } catch (\Exception $e) {
        return redirect()->back()
          ->with('error', 'Artikel gagal diupdate. Error uploading image: ' . $e->getMessage())
          ->withErrors(['image' => 'Error uploading image: ' . $e->getMessage()]);
      }
    }

    // Remove image dari array jika tidak ada file upload
    unset($validated['image']);

    try {
      // Debug: Log data before update
      // Log::info('Data to update:', $validated);
      // Log::info('Article ID:', $article->id);

      // Update the article
      $updated = $article->update($validated);

      // Debug: Check if update was successful
      // Log::info('Update result:', ['success' => $updated]);

      if ($updated) {
        return to_route('article.index')->with('success', "Artikel berhasil diupdate");
      } else {
        return redirect()->back()
          ->with('error', 'Artikel gagal diupdate: No changes detected')
          ->withInput();
      }
    } catch (\Exception $e) {
      // Log::error('Update error:', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
      return redirect()->back()
        ->with('error', 'Artikel gagal diupdate: ' . $e->getMessage())
        ->withInput();
    }
  }

  public function indexGuest()
  {
    $articles = Article::where('status_id', 3)
      ->whereIn('article_type_id', [1, 2])
      ->with(['publisher', 'user', 'articleType'])
      ->orderBy('created_at', 'desc')
      ->paginate(7);

    return Inertia::render('Information/ArticleIndex', compact('articles'));
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Article $article)
  {
    // try {
    //   // Optionally: Delete image from external service
    //   if ($article->main_image_name) {
    //     $client = new \GuzzleHttp\Client();
    //     $PUBLIC_ASSET_URL = env('PUBLIC_ASSET_URL');

    //     try {
    //       $client->delete("{$PUBLIC_ASSET_URL}/images/{$article->main_image_name}");
    //     } catch (\Exception $e) {
    //       // Log the error but don't fail the deletion
    // Log::warning('Failed to delete image from external service: ' . $e->getMessage());
    //     }
    //   }

    //   $article->delete();

    //   return to_route('article.index')->with('success', "Artikel berhasil dihapus");
    // } catch (\Exception $e) {
    //   return redirect()->back()
    //     ->with('error', 'Artikel gagal dihapus: ' . $e->getMessage());
    // }
  }
}
