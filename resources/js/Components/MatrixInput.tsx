import React from "react";
import MatrixBox from "@/Components/MatrixBox";
import { Matrix as MatrixType } from "@/types/matrix.type";

interface MatrixInputProps {
  heading: string;
  matrix: MatrixType;
  onValueChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => void;
  onSizeChange: (rows: number, columns: number) => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  heading,
  matrix,
  onValueChange,
  onSizeChange,
}) => {
  return (
    <MatrixBox
      heading={heading}
      matrix={matrix}
      handleMatrixValueChange={onValueChange}
      handleMatrixSizeChange={onSizeChange}
    />
  );
};

export default MatrixInput;
