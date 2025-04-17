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

  public function showGuest(Organization $wilayah)
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

    return Inertia::render('Territorial/Index', compact('territories', 'statuses'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create() {}

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:100',
      'alternate_name' => 'required|string|max:100',
      'address' => 'required|string|max:100',
      'user_id' => 'required|integer|exists:users,id',
      'status_id' => 'required|integer|exists:statuses,id',
      'parent_id' => 'nullable|integer|exists:organizations,id',
      'organization_type_id' => 'required|integer|exists:organization_types,id'
    ]);

    Organization::create($validatedData);

    return to_route('teritorial.index')->with('success', 'Wilayah / lingkungan berhasil dibuat.');
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id) {}

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $validatedData = $request->validate([
      'name' => 'nullable|string|max:255',
      'alternate_name' => 'nullable|string|max:255',
      'address' => 'nullable|string|max:100',
      'status_id' => 'nullable|integer|exists:statuses,id',
    ]);

    $news = Organization::findOrFail($id);

    $news->update($validatedData);

    return redirect()->route('teritorial.index')->with('success', 'Wilayah/Lingkunganberhasil diupdate');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
