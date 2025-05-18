<?php

namespace App\Services;


class Permissions
{
  public static function permissions($user)
  {

    // dd($user);
    return [
      'allowToSeeWartaMinggu' => $user?->role?->id <= 2,
      'allowToSeeAllBidang' => $user?->role?->id <= 2,
      'allowToSeeAllTerritorial' => $user?->role?->id <= 2,
      'allowToSeeAllPengurus' => $user?->role?->id <= 2,

      'canImpersonate' => $user?->role?->id == 1
    ];
  }
}
