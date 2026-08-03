<?php

namespace App\Http\Controllers;

use App\Models\Council;
use App\Models\Organization;
use App\Models\Period;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
	public function council()
	{
		$periodId = request()->query('period');
		$activePeriod = Period::active()->first();
		$targetPeriodId = $periodId ?? $activePeriod?->id;

		$councils = Council::query()
			->orderBy('order', 'asc')
			->get()
			->map(function ($council) use ($targetPeriodId) {
				$users = $council->users()
					->wherePivot('period_id', $targetPeriodId)
					->get();
				return [
					'id' => $council->id,
					'title' => $council->title,
					'order' => $council->order,
					'users' => $users,
				];
			});

		$organizations = Organization::query()
			->whereIn('organization_type_id', [1, 2, 3, 4, 5, 6, 7, 8])
			->with(['members' => function ($query) use ($targetPeriodId) {
				$query->wherePivot('period_id', $targetPeriodId);
			}])
			->get()
			->map(function ($org) {
				return [
					'id' => $org->id,
					'name' => $org->name,
					'alternate_name' => $org->alternate_name,
					'organization_type_id' => $org->organization_type_id,
					'members' => $org->members,
					'head' => $org->members->first(),
				];
			});

		$periods = Period::orderBy('start_year', 'desc')->get();

		return Inertia::render('About/Council', [
			'councils' => $councils,
			'councilsSecond' => $organizations,
			'periods' => $periods,
		]);
	}
	public function history(Request $request)
	{
		return Inertia::render("About/History");
	}

	public function saint(Request $request)
	{
		return Inertia::render('About/Saint');
	}
}
