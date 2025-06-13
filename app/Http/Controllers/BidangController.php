<?php

namespace App\Http\Controllers;

use App\Models\Article;
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
    $bidang = Organization::orWhere('organization_type_id', 3)->with(['head', 'parent', 'status', 'children' => function ($query) {
      $query->with(['head', 'status']);
    }])->get();


    return Inertia::render('Bidang/Index', compact('bidang'));
  }

  public function showGuest(Organization $bidang)
  {
    if (!in_array($bidang->organization_type_id, [3, 5]) || $bidang->status_id != 3) {
      abort(404);
    }

    $bidang = $bidang->load(['type', 'head', 'children' => function ($query) {
      $query->with(['head', 'type']);
    }]);

    return Inertia::render('Bidang/Show', compact('bidang'));
  }

  public function showDetailGuest(Organization $bidang, string $bidangDetailSlug)
  {
    $bidangDetail = Organization::where('slug', $bidangDetailSlug)
      ->where('parent_id', $bidang->id)->firstOrFail();

    if (!in_array($bidangDetail->organization_type_id, [4, 5, 6, 7, 9])) {
      abort(404);
      return;
    }


    $bidangDetail = $bidangDetail->load([
      'type',
      'head',
      'children' => function ($query) {
        $query->where('organization_type_id', 2)->with(['type', 'head']);
      },
    ]);

    $articles = Article::query()
      ->where('publisher_id', $bidangDetail->id)
      ->where('status_id', 3)
      ->whereIn('article_type_id', [1, 2])
      ->with(['publisher', 'user', 'articleType'])
      ->orderBy('created_at', 'desc')
      ->paginate(7);


    return Inertia::render('Territorial/Show', ['data' => $bidangDetail, 'articles' => $articles]);
  }

  public function approve($id)
  {
    $news = Organization::findOrFail($id);
    $news->status_id = 3;
    $news->save();

    return back()->with('success', 'Bidang/Seksi/Kategorial/Seksi/Tim berhasil disetujui.');
  }
  public function revert($id)
  {
    $news = Organization::findOrFail($id);
    $news->status_id = 2;
    $news->save();

    return back()->with('success', 'Bidang/Seksi/Kategorial/Seksi/Tim berhasil dikembalikan menjadi review.');
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
