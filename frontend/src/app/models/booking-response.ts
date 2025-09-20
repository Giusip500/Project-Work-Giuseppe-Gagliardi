export interface BookingResponse {
  id: number;
  room: number;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}
