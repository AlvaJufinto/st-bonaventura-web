<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\Organization;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $statuses = Status::get();
    $articles = Article::with(['status', 'user', 'publisher'])->paginate(10);

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


    return Inertia::render('Articles/Create', props: [
      'statuses' => $statuses,
      'organizations' => $organizations
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      'title' => 'required|max:255',
      'published_date' => 'required',
      'content' => 'required',
      'publisher_id' => 'required|integer|exists:organizations,id',
      'status_id' => 'required|integer|exists:statuses,id',
      "image" => 'required|file|mimes:png,jpg,jpeg,gif,webp,svg|max:5120',
    ]);

    $validated['user_id'] = Auth::user()->id;

    $validated['preview'] = Str::words(
      strip_tags($validated['content']),
      20
    );

    // Handle image upload to external service
    $file = $request->file('image');
    $client = new \GuzzleHttp\Client();
    $PUBLIC_ASSET_URL = env('PUBLIC_ASSET_URL');

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

    // dd($article->toArray());

    return Inertia::render('Information/ArticleDetail', compact('article'));
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Article $article)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Article $article)
  {
    //
  }

  public function indexGuest()
  {
    $articles = Article::where('status_id', 3)
      ->with(['publisher', 'user'])
      ->orderBy('created_at', 'desc')  // newest first
      ->paginate(10);

    return Inertia::render('Information/ArticleIndex', compact('articles'));
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Article $article)
  {
    //
  }
}
