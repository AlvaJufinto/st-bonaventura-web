<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TerritorialController extends Controller
{
  public function map()
  {
    $wilayah = Organization::where('organization_type_id', 1)->with(
      'type'
    )
      ->with(['children' => function ($query) {
        $query->where('organization_type_id', 2);
      }])
      ->get();

    return inertia('Territorial/Map', compact('wilayah'));
  }

  public function show(Organization $wilayah)
  {
    $wilayah->load([
      'children' => function ($query) {
        $query->where('organization_type_id', 2);
      },
    ]);


    return inertia('Territorial/Show', compact('wilayah'));
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $statuses = Status::all()->keyBy('id');

    $territories = Organization::where('organization_type_id', 1)
      ->with(['type', 'children' => function ($query) {
        $query->where('organization_type_id', 2)->with('type');
      }])
      ->get();

    $territories->each(function ($territory) use ($statuses) {
      $territory->status = $statuses[$territory->status_id] ?? null;
      $territory->children->each(function ($child) use ($statuses) {
        $child->status = $statuses[$child->status_id] ?? null;
      });
    });

    return Inertia::render('Territorial/Index', compact('territories'));
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
