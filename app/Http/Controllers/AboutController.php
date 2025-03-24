<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
  public function council()
  {
    return Inertia::render('About/Council');
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
