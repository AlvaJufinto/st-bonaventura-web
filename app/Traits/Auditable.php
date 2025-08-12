<?php

namespace App\Traits;

use App\Enums\AuditAction;
use App\Models\AuditLog;

trait Auditable
{
  public static function bootAuditable()
  {
    static::created(function ($model) {
      $model->storeAuditLog(AuditAction::Created);
    });

    static::updated(function ($model) {
      $model->storeAuditLog(
        AuditAction::Updated,
        collect($model->getChanges())
          ->except(['updated_at'])
          ->map(fn($new, $field) => [
            'old' => $model->getOriginal($field),
            'new' => $new
          ])
          ->toArray()
      );
    });


    static::deleted(function ($model) {
      $model->storeAuditLog(AuditAction::Deleted);
    });
  }

  public function auditLogs()
  {
    return $this->morphMany(AuditLog::class, 'auditable');
  }

  protected function storeAuditLog(AuditAction $action, array $data = [])
  {
    if (auth()->check()) {
      $this->auditLogs()->create([
        'user_id' => auth()->id(),
        'action' => $action->value,
        'data' => $data,
        'label' => method_exists($this, 'getAuditLabel') ? $this->getAuditLabel() : null,
        'ip_address' => request()->ip(),
        'user_agent' => request()->userAgent(),
      ]);
    }
  }
}
