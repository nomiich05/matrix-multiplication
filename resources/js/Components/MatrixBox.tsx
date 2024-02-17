import React from "react";
import Matrix from "@/Pages/Matrix";
import { Matrix as MatrixType } from "@/types/matrix.type";

interface MatrixBoxProps {
  heading: string;
  matrix: MatrixType;
  handleMatrixValueChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => void;
  handleMatrixSizeChange: (rows: number, columns: number) => void;
}

const MatrixBox: React.FC<MatrixBoxProps> = ({
  heading,
  matrix,
  handleMatrixValueChange,
  handleMatrixSizeChange,
}) => {
  return (
    <div className="matrix">
      <h2 className="text-xl font-bold text-center mt-4 mb-4">{heading}</h2>
      <Matrix
        matrix={matrix}
        handleMatrixChange={handleMatrixValueChange}
        handleMatrixSizeChange={handleMatrixSizeChange}
      />
    </div>
  );
};

export default MatrixBox;
