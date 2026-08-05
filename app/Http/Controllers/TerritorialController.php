<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Organization;
use App\Models\Period;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TerritorialController extends Controller
{
  public function map(Request $request)
  {
    $periodId = $request->get('period_id');

    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $periods = Period::orderBy('start_year', 'desc')->get();

    $wilayah = Organization::where('organization_type_id', 1)
      ->with(['type', 'members' => function ($query) use ($targetPeriodId) {
        $query->wherePivot('period_id', $targetPeriodId);
      }])
      ->with(['children' => function ($query) use ($targetPeriodId) {
        $query->where('organization_type_id', 2)
          ->with(['members' => function ($q) use ($targetPeriodId) {
            $q->wherePivot('period_id', $targetPeriodId);
          }]);
      }])
      ->get();

    return inertia('Territorial/Map', [
      'wilayah' => $wilayah,
      'periods' => $periods,
      'selectedPeriodId' => (int) $targetPeriodId,
    ]);
  }

  public function showGuest(Request $request, Organization $territorial)
  {
    if (!in_array($territorial->organization_type_id, [1, 2])) {
      abort(404);
      return;
    }

    $periodId = $request->get('period_id');
    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $periods = Period::orderBy('start_year', 'desc')->get();

    $territory = Organization::where('id', $territorial->id)
      ->with(['type', 'members' => function ($query) use ($targetPeriodId) {
        $query->wherePivot('period_id', $targetPeriodId);
      }])
      ->first();

    $children = Organization::where('parent_id', $territorial->id)
      ->where('organization_type_id', 2)
      ->with(['type', 'members' => function ($query) use ($targetPeriodId) {
        $query->wherePivot('period_id', $targetPeriodId);
      }])
      ->get();

    $articles = Article::query()
      ->where('publisher_id', $territorial->id)
      ->where('status_id', 3)
      ->whereIn('article_type_id', [1, 2])
      ->with(['publisher', 'user', 'articleType'])
      ->orderBy('created_at', 'desc')
      ->paginate(7);

    return Inertia::render('Territorial/Show', [
      'data' => [
        'id' => $territory->id,
        'name' => $territory->name,
        'alternate_name' => $territory->alternate_name,
        'address' => $territory->address,
        'description' => $territory->description,
        'organization_type_id' => $territory->organization_type_id,
        'members' => $territory->members,
        'children' => $children,
      ],
      'articles' => $articles,
      'periods' => $periods,
      'selectedPeriodId' => (int) $targetPeriodId,
    ]);
  }

  public function approve($id)
  {
    $organization = Organization::findOrFail($id);
    if ($organization->user_id !== auth()->id() && !auth()->user()->can('publish')) {
      abort(403);
    }
    $organization->status_id = 3;
    $organization->save();

    return back()->with('success', 'Wilayah/Lingkungan berhasil disetujui.');
  }

  public function revert($id)
  {
    $organization = Organization::findOrFail($id);
    if ($organization->user_id !== auth()->id() && !auth()->user()->can('publish')) {
      abort(403);
    }
    $organization->status_id = 2;
    $organization->save();

    return back()->with('success', 'Wilayah/Lingkungan berhasil dikembalikan menjadi review.');
  }

  public function index(Request $request)
  {
    $periodId = $request->get('period_id');

    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $periods = Period::orderBy('start_year', 'desc')->get();
    $statuses = Status::all();

    $territories = Organization::where('organization_type_id', 1)
      ->with(['type', 'head', 'period', 'members' => function ($query) use ($targetPeriodId) {
        $query->wherePivot('period_id', $targetPeriodId);
      }])
      ->with(['children' => function ($query) use ($targetPeriodId) {
        $query->where('organization_type_id', 2)
          ->with(['type', 'parent', 'head', 'period', 'members' => function ($q) use ($targetPeriodId) {
            $q->wherePivot('period_id', $targetPeriodId);
          }]);
      }])
      ->get();

    $territories->each(function ($territory) use ($statuses) {
      $territory->status = $statuses->firstWhere('id', $territory->status_id) ?? null;
      $territory->children->each(function ($child) use ($statuses) {
        $child->status = $statuses->firstWhere('id', $child->status_id) ?? null;
      });
    });

    return Inertia::render('Territorial/Index', [
      'territories' => $territories,
      'statuses' => $statuses,
      'periods' => $periods,
      'selectedPeriodId' => (int) $targetPeriodId,
    ]);
  }

  public function create() {}

  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:100',
      'alternate_name' => 'required|string|max:100',
      'address' => 'required|string|max:100',
      'user_id' => 'required|integer|exists:users,id',
      'status_id' => 'required|integer|exists:statuses,id',
      'parent_id' => 'nullable|integer|exists:organizations,id',
      'organization_type_id' => 'required|integer|exists:organization_types,id',
      'period_id' => 'required|integer|exists:periods,id',
    ]);

    $organization = Organization::create([
      'name' => $validatedData['name'],
      'alternate_name' => $validatedData['alternate_name'],
      'address' => $validatedData['address'],
      'user_id' => $validatedData['user_id'],
      'status_id' => $validatedData['status_id'],
      'parent_id' => $validatedData['parent_id'] ?? null,
      'organization_type_id' => $validatedData['organization_type_id'],
      'period_id' => $validatedData['period_id'],
    ]);

    $organization->members()->attach($validatedData['user_id'], [
      'period_id' => $validatedData['period_id'],
      'role' => $validatedData['organization_type_id'] == 1 ? 'Koordinator Wilayah' : 'Ketua Lingkungan',
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    return to_route('teritorial.index', ['period_id' => $validatedData['period_id']])
      ->with('success', 'Wilayah / Lingkungan berhasil dibuat.');
  }

  public function edit(string $id) {}

  public function update(Request $request, string $id)
  {
    $validatedData = $request->validate([
      'name' => 'nullable|string|max:255',
      'alternate_name' => 'nullable|string|max:255',
      'address' => 'nullable|string|max:100',
      'description' => 'nullable|string|max:255',
      'status_id' => 'nullable|integer|exists:statuses,id',
      'head_id' => 'nullable|integer|exists:users,id',
      'period_id' => 'nullable|integer|exists:periods,id',
    ]);

    $organization = Organization::findOrFail($id);

    $organization->update($validatedData);

    if (isset($validatedData['period_id']) && isset($validatedData['head_id'])) {
      $existingMember = $organization->members()
        ->wherePivot('period_id', $validatedData['period_id'])
        ->first();

      if ($existingMember) {
        $organization->members()->updateExistingPivot($existingMember->id, [
          'period_id' => $validatedData['period_id'],
          'role' => $organization->organization_type_id == 1 ? 'Koordinator Wilayah' : 'Ketua Lingkungan',
        ]);
      } else {
        $organization->members()->attach($validatedData['head_id'], [
          'period_id' => $validatedData['period_id'],
          'role' => $organization->organization_type_id == 1 ? 'Koordinator Wilayah' : 'Ketua Lingkungan',
        ]);
      }
    }

    return redirect()->route('teritorial.index', ['period_id' => $validatedData['period_id'] ?? $organization->period_id])
      ->with('success', 'Wilayah/Lingkungan berhasil diupdate');
  }

  public function destroy(string $id)
  {
    //
  }
}