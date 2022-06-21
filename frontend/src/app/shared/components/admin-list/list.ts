export interface List {
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  flightNumber?: string;
  airlineCode?: string;
  status?: string;
  description?: string;
  flightIds?: string[];
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
