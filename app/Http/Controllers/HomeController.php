<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    $lastRun = Cache::get('articles_expire_last_run');

    if (!$lastRun || Carbon::parse($lastRun)->lt(now()->subDay())) {
      Article::whereDate('expired_date', '<=', now())
        ->where('status_id', '!=', 1)
        ->update(['status_id' => 1]);

      Cache::put('articles_expire_last_run', now());
    }


    $articles = Article::where('status_id', 3)
      ->whereIn('article_type_id', [1, 2])
      ->with(['publisher', 'user', 'articleType'])
      ->orderBy('created_at', 'desc')->limit(4)->get();

    $news = News::query()
      ->orderBy('created_at', 'desc')
      ->where('status_id', 3)
      ->limit(5)
      ->get();

    $announcements = Article::where('status_id', 3)
      ->where('article_type_id', 3)
      ->with('publisher', 'user', 'articleType');

    return Inertia::render('Home/Index', compact('articles', 'news', 'announcements'));
  }
}
