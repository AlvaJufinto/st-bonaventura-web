<?php

namespace App\Services;


class Permissions
{
	public static function permissions($user)
	{

		// dd($user);
		return [
			// buat ngecek otoritas yg paling atas aj si sebenerny
			'allowToSeeWartaMinggu' => $user?->role?->role_level <= 2 || $user?->role?->id == 4,
			'allowToSeeAllBidang' => $user?->role?->role_level <= 2,
			'allowToSeeAllTerritorial' => $user?->role?->role_level <= 2,
			'allowToSeeAllPengurus' => $user?->role?->role_level <= 1,
			'allowToSeeAllBeritaKegiatan' =>  $user?->role?->role_level <= 2,

			'allowToSeeDPH' => $user?->role?->role_level <= 1,

			// ni jg buat si verfikikator kyk admin dan komsos
			'allowToPublish' => $user?->role?->role_level <= 2,

			// klo yg ini cuma buat admin
			'allowToSeeAuditLog' =>  $user?->role?->role_level == 1,
			'canImpersonate' => $user?->role?->role_level == 1,

			// klo yg ini buat ngeliat dia punya org apa tdk
			'isHead' => $user?->organizations?->count() > 0,
			'currentOrganization' => $user?->organizations()->with(['type', 'parent'])?->first() ?? null,
		];
	}
}