<?php

namespace Tests\Unit;

use Tests\TestCase;

class MatrixServiceTest extends TestCase
{
    public function testMultiplyMatrix()
    {
        $matrixA = [
            'rows' => 2,
            'columns' => 2,
            'values' => [
                [1, 2],
                [3, 4],
            ],
        ];

        $matrixB = [
            'rows' => 2,
            'columns' => 2,
            'values' => [
                [5, 6],
                [7, 8],
            ],
        ];

        $result = $this->multiplyMatrices($matrixA, $matrixB);

        $this->assertEquals([[19, 22], [43, 50]], $result);
    }

    private function multiplyMatrices(array $matrixA, array $matrixB): array
    {
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

        return $result;
    }
}
