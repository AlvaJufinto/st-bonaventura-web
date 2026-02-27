<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Status;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
	public function store(Request $request,)
	{
		$validatedData = $request->validate([
			'title' => 'nullable|string|max:255',
			'alternate_title' => 'required|string|max:255',
			'file' => 'required|file|mimes:pdf|max:12288',
			'user_id' => 'required|integer|exists:users,id',
			'status_id' => 'required|integer|exists:statuses,id',
		]);

		try {
			$file = $request->file('file');

			if (!$file) {
				throw new \Exception('File not provided.');
			}

			$fileUploadService = new FileUploadService();

			$result = $fileUploadService->getFileNameAndDirectory(
				$validatedData['alternate_title'],
				$file->getClientOriginalExtension(),
				'docs/warta-minggu'
			);

			$path = $fileUploadService->uploadFile(
				$file,
				$result['directory'],
				$result['fileName'],
			);

			if (!$path) {
				throw new \Exception('Upload failed.');
			}

			$validatedData['document_name'] = $path;

			News::create($validatedData);

			return to_route('warta-minggu.create')
				->with('success', 'Warta Minggu berhasil diunggah.');
		} catch (\Exception $e) {
			return back()->withErrors([
				'file' => 'Error uploading file: ' . $e->getMessage()
			]);
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
		$request->validate(
			[
				'title' => 'nullable|string|max:255',
				'alternate_title' => 'required|string|max:255',
				'status_id' => 'required|integer|exists:statuses,id',
			]
		);
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
