<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    const ERROR_MESSAGE = 'errorMessage';
    const SUCCESS_MESSAGE = 'successMessage';

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function jsonSuccess(array $data = []): JsonResponse
    {
        return response()->json([
            'metadata' => [
                'code' => 200,
                'message' => Response::$statusTexts[200],
            ],
            'data' => $data
        ]);
    }

    protected function jsonError($statusCode, $errorMessage): JsonResponse
    {
        return response()->json([
            'metadata' => [
                'code' => $statusCode,
                'message' => Response::$statusTexts[$statusCode],
            ],
            'error' => [
                'message' => $errorMessage,
            ],
        ], $statusCode);
    }
}
