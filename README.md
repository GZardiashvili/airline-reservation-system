# airline-reservation-system

{
"airline": {
"id": "1234567890",
"name": "",
"createdDate": "",
"updatedDate": ""
},
"user": {
"id": "1234567890",
"firstName": "",
"lastName": "",
"email": "",
"password": "",
"role": "",
"gender": "",
"phone": "",
"country": "",
"state": "",
"city": "",
"zip": "",
"birthDate": "",
"createdDate": "",
"updatedDate": ""
},
"flights": {
"id": "1234567890",
"flightNumber": "",
"departureAirport": "",
"arrivalAirport": "",
"departureDate": "",
"arrivalDate": "",
"type": "",
"price": "",
"airline": "",
"createdDate": "",
"updatedDate": ""
},

"ticket": {
"id": "1234567890",
"flightId": "",
"userId": "",
"createdDate": "",
"updatedDate": ""
},

"plane": {
"id": "1234567890",
"name": "",
"rows": "",
"columns": "",
"createdDate": "",
"updatedDate": ""
},
"airlineBooking": {
"id": "1234567890",
"userId": "",
"flightId": "",
"createdDate": "",
"updatedDate": ""
},

"passengerMethods": {
"addPassenger": "",
"getPassenger": "",
"updatePassenger": "",
"deletePassenger": "",
"getPassengerByFlight": "",
"getPassengerByUser": ""
},
"ticketMethods": {
"addTicket": "",
"getTicket": "",
"getAllTickets": "",
"getTicketByUserId": "",
"getTicketByFlightId": "",
"updateTicket": "",
"deleteTicket": ""
},
"flightMethods": {
"addFlight": "",
"getFlight": "",
"getAllFlights": "",
"getFlightByUserId": "",
"getFlightByAirlineId": "",
"updateFlight": "",
"deleteFlight": ""
},
"airlineMethods": {
"addAirline": "",
"getAirline": "",
"getAllAirlines": "",
"getAirlineByUserId": "",
"updateAirline": "",
"deleteAirline": ""
},
"userMethods": {
"addUser": "",
"getUser": "",
"getAllUsers": "",
"getUserByAirlineId": "",
"updateUser": "",
"deleteUser": ""
},
"planeMethods": {
"addPlane": "",
"getPlane": "",
"getAllPlanes": "",
"getPlaneByAirlineId": "",
"updatePlane": "",
"deletePlane": ""
},
"adminMethods": {
"getAllUsers": "",
"getAllFlights": "",
"getAllAirlines": "",
"getAllPlanes": "",
"getAllTickets": "",
"manageRole": "",
"manageReservation": "",
"manageAirline": "",
"managePlane": "",
"manageFlight": "",
"manageUser": "",
"manageTicket": ""
}
}
