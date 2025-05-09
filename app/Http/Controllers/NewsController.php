<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
  public function approve($id)
  {
    $news = News::findOrFail($id);
    $news->status_id = 3;
    $news->save();

    return back()->with('success', 'Warta Minggu berhasil disetujui.');
  }


  public function revert($id)
  {
    $news = News::findOrFail($id);
    $news->status_id = 2;
    $news->save();

    return back()->with('success', 'Warta Minggu berhasil dikembalikan menjadi review.');
  }

  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $news = News::with(['status', 'user'])->paginate(20);
    $statuses = Status::get();

    return Inertia::render("News/Index", compact('news', 'statuses'));
  }

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
      "file" => 'required|file|mimes:pdf|max:2048',
      'user_id' => 'required|integer|exists:users,id',
      'status_id' => 'required|integer|exists:statuses,id',
    ]);

    $file = $request->file('file');

    $client = new \GuzzleHttp\Client();

    $PUBLIC_ASSET_URL = env('PUBLIC_ASSET_URL');

    try {
      $response = $client->post("{$PUBLIC_ASSET_URL}/upload", [
        'multipart' => [
          [
            'name'     => 'file',
            'contents' => fopen($file->getPathname(), 'r'),
            'filename' => $file->getClientOriginalName(),
          ],
        ],
      ]);

      $responseData = json_decode($response->getBody()->getContents(), true);

      if (!isset($responseData['file']['fileName'])) {
        return back()->withErrors(['file' => 'File upload failed.']);
      }

      $validatedData['document_name'] = $responseData['file']['fileName'];

      News::create($validatedData);

      return to_route('warta-minggu.create')->with('success', 'Warta Minggu berhasil diunggah.');
    } catch (\Exception $e) {
      return back()->withErrors(['file' => 'Error uploading file: ' . $e->getMessage()]);
    }
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
    $request->validate([
      'title' => 'nullable|string|max:255',
      'alternate_title' => 'required|string|max:255',
      'status_id' => 'required|integer|exists:statuses,id',
    ]);

    $news = News::findOrFail($id);

    $news->update([
      'title' => $request->input('title'),
      'alternate_title' => $request->input('alternate_title'),
      'status_id' => $request->input('status_id'),
    ]);

    return redirect()->route('warta-minggu.index')->with('success', 'Warta Minggu berhasil diupdate');
  }
  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
