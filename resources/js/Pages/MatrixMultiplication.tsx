import React, { useState, useCallback } from "react";
import Header from "@/Components/Header";
import MatrixService from "@/services/MatrixServices";
import {
  Matrix as MatrixType,
  ResultMatrix,
  MatrixTypeStatic,
} from "@/types/matrix.type";
import MatrixInput from "@/Components/MatrixInput";
import ErrorMessage from "@/Components/ErrorMessage";
import ResultMatrixDisplay from "@/Components/ResultMatrixDisplay";

const initializeMatrix = (rows: number, columns: number): MatrixType => {
  const values: number[][] = Array.from({ length: rows }, () =>
    Array(columns).fill(null)
  );

  return {
    rows,
    columns,
    values,
  };
};

const MatrixMultiplication: React.FC = () => {
  const [matrixA, setMatrixA] = useState<MatrixType>(initializeMatrix(3, 3));
  const [matrixB, setMatrixB] = useState<MatrixType>(initializeMatrix(3, 3));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultMatrix, setResultMatrix] = useState<ResultMatrix | null>(null);

  const handleMatrixValueChange = useCallback(
    (
      matrix: MatrixType,
      setMatrix: React.Dispatch<React.SetStateAction<MatrixType>>
    ) => (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number) => {
      const newValue = parseFloat(event.target.value);
      const newValues = matrix.values.map((row, i) =>
        i === rowIndex ? [...row.slice(0, colIndex), newValue, ...row.slice(colIndex + 1)] : row
      );
      setMatrix({ ...matrix, values: newValues });
      setErrorMessage(null);
      setResultMatrix(null);
    },
    [setErrorMessage, setResultMatrix]
  );

  const handleMatrixSizeChange = useCallback(
    (
      matrix: MatrixType,
      setMatrix: React.Dispatch<React.SetStateAction<MatrixType>>
    ) => (rows: number, columns: number) => {
      const newRows = Math.max(1, rows);
      const newColumns = Math.max(1, columns);
      setMatrix(initializeMatrix(newRows, newColumns));
      setErrorMessage(null);
      setResultMatrix(null);
    },
    [setErrorMessage, setResultMatrix]
  );

  const multiplyMatrices = useCallback(async () => {
    if (hasEmptyOrInvalidValues(matrixA) || hasEmptyOrInvalidValues(matrixB)) {
      setErrorMessage("Matrices cannot have empty or invalid values.");
      setResultMatrix(null);
      return;
    }
    try {
      const result = await new MatrixService().multiplyMatrices(matrixA, matrixB);

      console.log("result->", result);
      
      if (result) {
        setErrorMessage(null);
        setResultMatrix(result);
      } else {
        setErrorMessage(
          "Matrices are not equal for multiplication. Please make sure that the number of columns in Matrix A is equal to the number of rows in Matrix B."
        );
      }
    } catch (error) {
      console.error("Error multiplying matrices:", error);
      setErrorMessage(
        "An error occurred while multiplying matrices. Please check your matrices and try again."
      );
    }
  }, [matrixA, matrixB]);

  const hasEmptyOrInvalidValues = (matrix: MatrixTypeStatic): boolean => {
    return matrix.values.some((row) => row.some((value) => value === null || isNaN(value)));
  };

  return (
    <div className="MatrixMultiplication">
      <Header />
      <div className="content">
        <div className="matrix-holder">
        <MatrixInput
            heading={"Matrix A"}
            matrix={matrixA}
            onValueChange={handleMatrixValueChange(matrixA, setMatrixA)}
            onSizeChange={handleMatrixSizeChange(matrixA, setMatrixA)}
          />
          <MatrixInput
            heading={"Matrix B"}
            matrix={matrixB}
            onValueChange={handleMatrixValueChange(matrixB, setMatrixB)}
            onSizeChange={handleMatrixSizeChange(matrixB, setMatrixB)}
          />
        </div>
        <ErrorMessage message={errorMessage} />

        <div className="multiply-btn mt-4">
          <button
            onClick={multiplyMatrices}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Multiply
          </button>
        </div>

        <ResultMatrixDisplay resultMatrix={resultMatrix} />

      </div>
    </div>
  );
};

export default MatrixMultiplication;
