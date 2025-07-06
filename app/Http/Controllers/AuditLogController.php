<?php

namespace App\Http\Controllers;

use App\Enums\AuditAction;
use App\Models\AuditLog;
use Illuminate\Http\Request;


class AuditLogController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $logs = AuditLog::with(['user', 'auditable'])
      ->latest()
      ->paginate(20);

    return inertia('AuditLog/Index', [
      'logs' => $logs->through(function ($log) {
        return [
          'id' => $log->id,
          'user' => $log->user?->name,
          'action' => AuditAction::from($log->action)->name,
          'auditable_type' => class_basename($log->auditable_type),
          'auditable' => [
            'id' => $log->auditable?->id,
            'label' => method_exists($log->auditable, 'getAuditLabel')
              ? $log->auditable->getAuditLabel()
              : null,
          ],
          'label' => method_exists($log->auditable, 'getAuditLabel')
            ? $log->auditable->getAuditLabel()
            : null,
          'data' => $log->data,
          'created_at' => $log->created_at->toDateTimeString(),
        ];
      }),
      'pagination' => [
        'current_page' => $logs->currentPage(),
        'last_page' => $logs->lastPage(),
        'per_page' => $logs->perPage(),
        'total' => $logs->total(),
      ],
    ]);
  }



  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(AuditLog $auditLog)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(AuditLog $auditLog)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, AuditLog $auditLog)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(AuditLog $auditLog)
  {
    //
  }
}
