<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Organization;
use App\Models\Period;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BidangController extends Controller
{
  public function index(Request $request)
  {
    $periodId = $request->get('period_id');

    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $periods = Period::orderBy('start_year', 'desc')->get();

    $bidang = Organization::whereIn('organization_type_id', [3, 5])
      ->with(['head', 'parent', 'status', 'period', 'members' => function ($query) use ($targetPeriodId) {
        $query->wherePivot('period_id', $targetPeriodId);
      }])
      ->with(['children' => function ($query) use ($targetPeriodId) {
        $query->with(['status', 'members' => function ($q) use ($targetPeriodId) {
          $q->wherePivot('period_id', $targetPeriodId);
        }]);
      }])
      ->get();

    $bidang = $bidang->map(function ($org) use ($targetPeriodId) {
      $org->head = $org->members->first(function ($member) {
        return $member->pivot->role && str_contains(strtolower($member->pivot->role), 'head');
      });
      $org->children = $org->children->map(function ($child) {
        $child->head = $child->members->first(function ($member) {
          return $member->pivot->role && str_contains(strtolower($member->pivot->role), 'head');
        });
        return $child;
      });
      return $org;
    });

    return Inertia::render('Bidang/Index', [
      'bidang' => $bidang,
      'periods' => $periods,
      'selectedPeriodId' => (int) $targetPeriodId,
    ]);
  }

  public function showGuest(Request $request, Organization $bidang)
  {
    if (!in_array($bidang->organization_type_id, [3, 5]) || $bidang->status_id != 3) {
      abort(404);
    }

    $periodId = $request->get('period_id');
    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $periods = Period::orderBy('start_year', 'desc')->get();

    $bidang = $bidang->load(['type', 'period', 'members' => function ($query) use ($targetPeriodId) {
      $query->wherePivot('period_id', $targetPeriodId);
    }, 'children' => function ($query) use ($targetPeriodId) {
      $query->with(['type', 'members' => function ($q) use ($targetPeriodId) {
        $q->wherePivot('period_id', $targetPeriodId);
      }]);
    }]);

    $bidang->head = $bidang->members->first(function ($member) {
      return $member->pivot->role && str_contains(strtolower($member->pivot->role), 'head');
    });

    $bidang->children = $bidang->children->map(function ($child) {
      $child->head = $child->members->first(function ($member) {
        return $member->pivot->role && str_contains(strtolower($member->pivot->role), 'head');
      });
      return $child;
    });

    return Inertia::render('Bidang/Show', [
      'bidang' => $bidang,
      'periods' => $periods,
      'selectedPeriodId' => (int) $targetPeriodId,
    ]);
  }

  public function showDetailGuest(Request $request, Organization $bidang, string $bidangDetailSlug)
  {
    $periodId = $request->get('period_id');
    $activePeriod = Period::active()->first();
    $targetPeriodId = $periodId ?? $activePeriod?->id;

    $periods = Period::orderBy('start_year', 'desc')->get();

    $bidangDetail = Organization::where('slug', $bidangDetailSlug)
      ->where('parent_id', $bidang->id)->firstOrFail();

    if (!in_array($bidangDetail->organization_type_id, [4, 5, 6, 7, 9])) {
      abort(404);
      return;
    }

    $bidangDetail = $bidangDetail->load([
      'type',
      'period',
      'members' => function ($query) use ($targetPeriodId) {
        $query->wherePivot('period_id', $targetPeriodId);
      },
      'children' => function ($query) {
        $query->where('organization_type_id', 2)->with(['type']);
      },
    ]);

    $bidangDetail->head = $bidangDetail->members->first(function ($member) {
      return $member->pivot->role && str_contains(strtolower($member->pivot->role), 'head');
    });

    $articles = Article::query()
      ->where('publisher_id', $bidangDetail->id)
      ->where('status_id', 3)
      ->whereIn('article_type_id', [1, 2])
      ->with(['publisher', 'user', 'articleType'])
      ->orderBy('created_at', 'desc')
      ->paginate(7);

    return Inertia::render('Territorial/Show', [
      'data' => $bidangDetail,
      'articles' => $articles,
      'periods' => $periods,
      'selectedPeriodId' => (int) $targetPeriodId,
    ]);
  }

  public function approve($id)
  {
    $organization = Organization::findOrFail($id);
    $organization->status_id = 3;
    $organization->save();

    return back()->with('success', 'Bidang/Seksi/Kategorial/Seksi/Tim berhasil disetujui.');
  }

  public function revert($id)
  {
    $organization = Organization::findOrFail($id);
    $organization->status_id = 2;
    $organization->save();

    return back()->with('success', 'Bidang/Seksi/Kategorial/Seksi/Tim berhasil dikembalikan menjadi review.');
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    //
  }

  public function show(string $id)
  {
    //
  }

  public function edit(string $id)
  {
    //
  }

  public function update(Request $request, string $id)
  {
    //
  }

  public function destroy(string $id)
  {
    //
  }
}