<?php

namespace App\Http\Controllers;

use App\Http\Requests\MatrixRequest;
use Illuminate\Http\JsonResponse;

class MatrixController extends Controller
{
    public function multiplyMatrices(MatrixRequest $request): JsonResponse
    {
        try {
            $matrixA = $request->input('matrixA');
            $matrixB = $request->input('matrixB');

            if ($matrixA['columns'] !== $matrixB['rows']) {
                throw new \InvalidArgumentException('Error. Number of columns in Matrix A must be equal to the number of rows in Matrix B.');
            }

            $result = [];
            for ($i = 0; $i < $matrixA['rows']; $i++) {
                $result[$i] = [];
                for ($j = 0; $j < $matrixB['columns']; $j++) {
                    $sum = 0;
                    for ($k = 0; $k < $matrixA['columns']; $k++) {
                        $sum += $matrixA['values'][$i][$k] * $matrixB['values'][$k][$j];
                    }
                    $result[$i][$j] = $sum;
                }
            }

            return response()->json([
                'success' => true,
                'result' => $result,
                'message' => 'Matrix multiplication done',
            ], 200);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'success' => false,
                'message' => ['error' => $e->getMessage()],
            ], 409);
        }
    }
}
