<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
	public function manage()
	{
		$organization = Organization::with('head')
			->where('head_id', auth()->id())
			->firstOrFail();

		return Inertia::render('Organization/Manage', [
			'organization' => $organization
		]);
	}
}
