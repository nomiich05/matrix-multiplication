import { Matrix, ResultMatrix } from "@/types/matrix.type";
import ApiService from "./AxiosService";

class MatrixService {
  async multiplyMatrices(matrixA: Matrix, matrixB: Matrix): Promise<ResultMatrix | null> {
    try {
      const response = await ApiService.post("/api/multiply-matrices", {
        matrixA,
        matrixB,
      });

      const resultMatrix = response.data.result;

      if (resultMatrix) {
        return this.convertToExcelFormat(resultMatrix);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error multiplying matrices:", error);
      return null;
    }
  }

  private convertToExcelFormat(matrix: number[][]): string[][] {
    return matrix.map(row => row.map(value => this.convertToExcelColumn(value)));
  }

  private convertToExcelColumn(value: number): string {
    let result = "";
    let num = value;

    while (num > 0) {
      const remainder = (num - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      num = Math.floor((num - 1) / 26);
    }

    return result;
  }
}

export default MatrixService;
