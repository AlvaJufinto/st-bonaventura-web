<?php

namespace App\Enums;

enum ArticleStatus: string
{
  case DRAFT = 'draft';
  case DELETED = 'archived';
  case PUBLISHED = 'published';

  public static function getAll(): array
  {
    return self::cases();
  }
}
