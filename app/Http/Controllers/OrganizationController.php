<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\OrganizationType;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
	public function manage()
	{
		$organization = Organization::with(['head', 'parent', 'type', 'status'])
			->where('head_id', auth()->id())
			->firstOrFail();

		return Inertia::render('Organization/Manage', [
			'organization' => $organization
		]);
	}

	public function edit()
	{
		$userOrganizationId = auth()->user()->organizations->first()->id;
		$organization = Organization::with(['type', 'status', 'head', 'parent'])->findOrFail(id: $userOrganizationId);

		return Inertia::render('Organization/Edit', [
			'organization' => $organization,
			//'organizationTypes' => OrganizationType::all(),
			//'statuses' => Status::all(),
			//'users' => User::all(),
			//'parents' => Organization::where('id', '!=', $organization->id)->get(),
		]);
	}

	public function update(Request $request)
	{
		$userOrganizationId = auth()->user()->organizations->first()->id;
		$organization = Organization::with(['type', 'status', 'head', 'parent'])
			->findOrFail($userOrganizationId);

		$validated = $request->validate([
			'banner' => 'nullable|file|mimes:png,jpg,jpeg,webp|max:5120',
			'logo' => 'nullable|file|mimes:png,jpg,jpeg,webp|max:5120',
			'alternate_name' => 'nullable|string|max:255',
			'address' => 'nullable|string',
			'description' => 'nullable|string',
		]);

		$client = new \GuzzleHttp\Client();
		$PUBLIC_ASSET_URL = config('app.PUBLIC_ASSET_URL');

		try {
			// Upload banner hanya jika ada file baru
			if ($request->hasFile('banner')) {
				$file = $request->file('banner');
				$response = $client->post("{$PUBLIC_ASSET_URL}/upload", [
					'multipart' => [[
						'name'      => 'file',
						'contents'  => fopen($file->getPathname(), 'r'),
						'filename'  => $file->getClientOriginalName(),
					]],
				]);

				$responseData = json_decode($response->getBody()->getContents(), true);
				if (!isset($responseData['file']['fileName'])) {
					return back()->withErrors(['banner' => 'Banner upload failed.']);
				}
				$validated['banner'] = $responseData['file']['fileName'];
			} else {
				// Jangan update banner jika tidak ada file baru
				unset($validated['banner']);
			}

			// Upload logo hanya jika ada file baru
			if ($request->hasFile('logo')) {
				$file = $request->file('logo');
				$response = $client->post("{$PUBLIC_ASSET_URL}/upload", [
					'multipart' => [[
						'name'      => 'file',
						'contents'  => fopen($file->getPathname(), 'r'),
						'filename'  => $file->getClientOriginalName(),
					]],
				]);

				$responseData = json_decode($response->getBody()->getContents(), true);
				if (!isset($responseData['file']['fileName'])) {
					return back()->withErrors(['logo' => 'Logo upload failed.']);
				}
				$validated['logo'] = $responseData['file']['fileName'];
			} else {
				// Jangan update logo jika tidak ada file baru
				unset($validated['logo']);
			}

			$organization->update($validated);

			return redirect()
				->route('organization.manage')
				->with('success', 'Organization updated successfully.');
		} catch (\Exception $e) {
			return redirect()->back()
				->with('error', 'Organization update failed: ' . $e->getMessage())
				->withErrors(['file' => 'Error uploading file: ' . $e->getMessage()]);
		}
	}
}
