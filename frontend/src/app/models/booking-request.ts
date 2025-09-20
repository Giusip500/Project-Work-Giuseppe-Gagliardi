export interface BookingRequest {
    roomType: string;
    checkInDate: string; 
    checkOutDate: string;
    userId: number;
    totalPrice: number;
    status: string;
}
