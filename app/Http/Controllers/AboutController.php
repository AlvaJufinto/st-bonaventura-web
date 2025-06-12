<?php

namespace App\Http\Controllers;

use App\Models\Council;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
  public function council()
  {
    $councils = Council::query()
      ->orderBy('order', 'asc')
      ->with('user')
      ->get();

    $councilsSecond = Organization::query()
      ->with('head')
      ->whereIn('organization_type_id', [1, 2, 4, 5])
      ->get();


    return Inertia::render('About/Council', compact('councils', 'councilsSecond'));
  }
  public function history(Request $request)
  {
    return Inertia::render("About/History");
  }

  public function saint(Request $request)
  {
    return Inertia::render('About/Saint');
  }
}
