export interface ICreateRentalDTO {
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  expectedReturnDate: Date;
  total: number;
}