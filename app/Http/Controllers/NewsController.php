<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index() {}

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $statuses = Status::all();


    return Inertia::render('News/Create', [
      'statuses' => $statuses,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'title' => 'nullable|string|max:255',
      'alternate_title' => 'required|string|max:255',
      'document_name' => 'required|string|max:255',
      'user_id' => 'required|integer|exists:users,id',
      'status_id' => 'required|integer|exists:statuses,id',
    ]);


    News::create(
      $validatedData
    );

    return to_route('warta-minggu.create');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}