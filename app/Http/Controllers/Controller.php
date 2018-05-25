<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    const ERROR_MESSAGE = 'errorMessage';
    const SUCCESS_MESSAGE = 'successMessage';

    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    protected function jsonSuccess(array $data = [])
    {
        return response()->json([
            'metadata' => [
                'code' => 200,
                'message' => Response::$statusTexts[200],
            ],
            'data' => $data
        ]);
    }

    /**
     * @param $statusCode
     * @param $errorMessage
     * @return \Illuminate\Http\JsonResponse
     */
    protected function jsonError($statusCode, $errorMessage)
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
