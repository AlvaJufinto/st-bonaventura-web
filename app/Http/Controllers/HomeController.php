<?php

namespace App\Http\Controllers;

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
    $news = News::query()
      ->orderBy('created_at', 'desc')
      ->where('status_id', 3)
      ->limit(5)
      ->get();


    return Inertia::render('Home/Index', [
      "news" => $news,
    ]);
  }
}
