<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    $articles = Article::where('status_id', 3)
      ->with(['publisher', 'user'])
      ->orderBy('created_at', 'desc')->limit(4)->get();

    $news = News::query()
      ->orderBy('created_at', 'desc')
      ->where('status_id', 3)
      ->limit(5)
      ->get();


    return Inertia::render('Home/Index', compact('articles', 'news'));
  }
}
