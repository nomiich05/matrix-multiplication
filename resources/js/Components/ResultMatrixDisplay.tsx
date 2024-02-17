import React from "react";
import { ResultMatrix } from "@/types/matrix.type";

interface ResultMatrixDisplayProps {
  resultMatrix: ResultMatrix | null;
}

const ResultMatrixDisplay: React.FC<ResultMatrixDisplayProps> = ({ resultMatrix }) => {
  return (
    resultMatrix && (
      <div className="mt-4 result-holder">
        <h2 className="text-xl font-bold mb-2">Result Matrix</h2>
        <div className="result-matrix">
          {resultMatrix.map((row, i) => (
            <div key={i} className="flex">
              {row.map((value, j) => (
                <input
                  key={j}
                  type="text"
                  value={value}
                  className="w-16 text-center border p-1"
                  readOnly
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ResultMatrixDisplay;
