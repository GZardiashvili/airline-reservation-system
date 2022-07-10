export interface Flight {
  _id?: string;
  flightNumber?: string;
  description?: string;
  airlineId?: string;
  planeId?: string;
  ticketId?: string;
  departureCity?: string;
  arrivalCity?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureTime?: Date;
  arrivalTime?: Date;
}

export interface CreateFlight {
  departureTimeArr?: Date[];
  arrivalTimeArr?: Date[];
}
