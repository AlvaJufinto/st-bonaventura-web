<?php

namespace App\Services;

use App\Models\Organization;
use App\Models\Period;
use Illuminate\Support\Facades\Schema;

class SharedData
{
	public static function wilayah()
	{
		$activePeriod = Period::active()->first();
		$targetPeriodId = $activePeriod?->id;

		if (!Schema::hasTable('organizations')) {
			return collect();
		}

		return Organization::where('organization_type_id', 1)
			->where('status_id', 3)
			->whereHas('members', function ($query) use ($targetPeriodId) {
				$query->where('organization_user.period_id', $targetPeriodId);
			})
			->get();
	}

	public static function bidang()
	{
		$activePeriod = Period::active()->first();
		$targetPeriodId = $activePeriod?->id;

		if (!Schema::hasTable('organizations')) {
			return collect();
		}

		return Organization::where('organization_type_id', 3)
			->where('status_id', 3)
			//->whereHas('members', function ($query) use ($targetPeriodId) {
			//	$query->where('organization_user.period_id', $targetPeriodId);
			//})
			->get();
	}
}