<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BidangController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $bidang = Organization::where('organization_type_id', 3)->with(['head', 'parent', 'status', 'children' => function ($query) {
      $query->with(['head', 'status']);
    }])->get();


    return Inertia::render('Bidang/Index', compact('bidang'));
  }

  public function showGuest(Organization $bidang)
  {
    if ($bidang->organization_type_id != 3 || $bidang->status_id != 3) {
      abort(404);
    }

    $bidang = $bidang->load(['type', 'head', 'children' => function ($query) {
      $query->with(['head', 'type']);
    }]);

    return Inertia::render('Bidang/Show', compact('bidang'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
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
