<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function news(Request $request)
  {
    return Inertia::render("Information/News");
  }
}
