<?php

namespace App\Services;


class Permissions
{
  public static function permissions($user)
  {

    // dd($user);
    return [
      'allowToSeeWartaMinggu' => $user?->role?->id <= 2 || $user?->role?->id == 4,
      'allowToSeeAllBidang' => $user?->role?->id <= 2,
      'allowToSeeAllTerritorial' => $user?->role?->id <= 2,
      'allowToSeeAllPengurus' => $user?->role?->id <= 2,
      'allowToSeeAllBeritaKegiatan' =>  $user?->role?->id <= 2,

      'allowToSeeDPH' => $user?->role?->id <= 2,

      'allowToPublish' => $user?->role?->id <= 2,

      'allowToSeeAuditLog' =>  $user?->role?->id == 1,
      'canImpersonate' => $user?->role?->id == 1
    ];
  }
}
