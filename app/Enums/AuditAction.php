<?php

namespace App\Enums;

enum AuditAction: int
{
  case Viewed = 1;
  case Created = 2;
  case Updated = 3;
  case Deleted = 4;
}
