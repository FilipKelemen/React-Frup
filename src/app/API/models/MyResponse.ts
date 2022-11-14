export interface MyResponse<DataType> {
  timestamp: Date;
  statusCode: number;
  status: string;
  message: string;
  data: DataType;
}