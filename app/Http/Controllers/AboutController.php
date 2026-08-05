<?php

namespace App\Http\Controllers;

use App\Models\Council;
use App\Models\Organization;
use App\Models\Period;
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
			->with(['users' => fn($q) => $q->wherePivot('period_id', $targetPeriodId)])
			->orderBy('order', 'asc')
			->get();

		$dph = $councils->map(fn($council) => [
			'id' => $council->id,
			'role' => $council->title,
			'order' => $council->order,
			'members' => $council->users,
		]);

		$allPlenoOrgs = Organization::query()
			->whereIn('organization_type_id', [1, 2, 4, 5, 6, 7, 8, 10])
			->with(['members' => fn($q) => $q->wherePivot('period_id', $targetPeriodId)])
			->get()
			->map(fn($org) => [
				'id' => $org->id,
				'name' => $org->name,
				'alternate_name' => $org->alternate_name,
				'organization_type_id' => $org->organization_type_id,
				'members' => $org->members,
			]);

		$buildPlenoGroup = function (array $typeIds) use ($allPlenoOrgs) {
			return $allPlenoOrgs->whereIn('organization_type_id', $typeIds)->values();
		};

		$periods = Period::orderBy('start_year', 'desc')->get();

		return Inertia::render('About/Council', [
			'dph' => [
				'title' => 'Dewan Paroki Harian',
				'members' => $dph,
			],
			'plenoGroups' => [
				[
					'key' => 'wilayah_lingkungan',
					'title' => 'Wilayah & Lingkungan',
					'items' => $buildPlenoGroup([1, 2]),
				],
				[
					'key' => 'seksi_bagian',
					'title' => 'Seksi & Bagian',
					'items' => $buildPlenoGroup([4, 5, 8]),
				],
				[
					'key' => 'komunitas_tim',
					'title' => 'Komunitas & Tim',
					'items' => $buildPlenoGroup([6, 7]),
				],
				[
					'key' => 'perwakilan',
					'title' => 'Perwakilan Sekolah, Biara & Komunitas',
					'items' => $buildPlenoGroup([10]),
				],
			],
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
