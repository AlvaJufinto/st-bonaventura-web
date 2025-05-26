<?php

namespace App\Http\Controllers;

use App\Enums\ArticleStatus;
use App\Models\Article;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('Articles/Index');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $statuses = Status::get();

    return Inertia::render('Articles/Create', [
      'statuses' => $statuses,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Article $article)
  {
    //
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

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Article $article)
  {
    //
  }
}