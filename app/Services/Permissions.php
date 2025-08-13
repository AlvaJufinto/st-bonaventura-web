<?php

namespace App\Services;


class Permissions
{
	public static function permissions($user)
	{

		// dd($user);
		return [
			// buat ngecek otoritas yg paling atas aj si sebenerny
			'allowToSeeWartaMinggu' => $user?->role?->id <= 2 || $user?->role?->id == 4,
			'allowToSeeAllBidang' => $user?->role?->id <= 2,
			'allowToSeeAllTerritorial' => $user?->role?->id <= 2,
			'allowToSeeAllPengurus' => $user?->role?->id <= 2,
			'allowToSeeAllBeritaKegiatan' =>  $user?->role?->id <= 2,

			'allowToSeeDPH' => $user?->role?->id <= 2,

			// ni jg buat si verfikikator kyk admin dan komsos
			'allowToPublish' => $user?->role?->id <= 2,

			// klo yg ini cuma buat admin
			'allowToSeeAuditLog' =>  $user?->role?->id == 1,
			'canImpersonate' => $user?->role?->id == 1,

			// klo yg ini buat ngeliat dia punya org apa tdk
			'isHead' => $user?->organizations?->count() > 0,
		];
	}
}
