<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function news(Request $request)
  {
    $news = News::query()
      ->orderBy('created_at', 'desc')
      ->where('status_id', 3)
      ->paginate(4);


    return Inertia::render("Information/News", compact('news'));
  }
}
