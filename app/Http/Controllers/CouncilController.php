<?php

namespace App\Http\Controllers;

use App\Models\Council;
use App\Models\Period;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CouncilController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $periodId = request()->query('period');
    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $councils = Council::query()
      ->with(['users' => fn($q) => $q->wherePivot('period_id', $targetPeriodId)->orderBy('name')])
      ->orderBy('order', 'asc')
      ->get()
      ->map(fn($council) => [
        'id' => $council->id,
        'title' => $council->title,
        'order' => $council->order,
        'users' => $council->users,
      ]);

    $periods = Period::orderBy('start_year', 'desc')->get();

    return Inertia::render('Council/Index', compact('councils', 'periods'));
  }

  public function reorder(Request $request)
  {
    $orderedIds = $request->input('ordered_ids');

    foreach ($orderedIds as $index => $id) {
      DB::table('councils')->where('id', $id)->update(['order' => $index + 1]);
    }
    return response()->json([
      'message' => 'Urutan berhasil diperbarui.'
    ]);
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
  public function show(Council $council)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Council $council)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Council $council)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Council $council)
  {
    //
  }
}
