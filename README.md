# tikeets

A booking/reservation and event management platform

Copy .env.example file to .env

To Set up application base data run the application seed with:
run => npm run seed

To run test suite
run => npm test

To start application:
run => npm start

Note Admin account is already seed with email: admin@tikeets.com and password: tikeet_password

link to github repo: https://github.com/nedu10/tikeets

project live url = https://tikeets-api.herokuapp.com

link to postman documentation: https://cloudy-resonance-946673.postman.co/collections/5258371-a673cbe6-5fde-4310-9399-1bf47f113b6c?workspace=8b1bd3ff-bf35-4631-8afa-1add81f8c9ef

# PROJECT DOCUMENTATION

project live url = https://tikeets-api.herokuapp.com

Registration
POST /signup
payload: {
"email": "cifediorah3@gmail.com",
"password": "john12345",
"first_name": "Chinedu",
"last_name": "Ifediorah"
}

Roles -- Get all roles in the system
GET /admin/roles

Admin Creation
POST /signup
payload: {
"email": "admin2@tikeets.com",
"password": "john12345",
"first_name": "Second",
"last_name": "Admin",
"role_id": <admin role>
}

Login
POST /login
payload: {
"email": "cifediorah3@gmail.com",
"password": "john12345",
}

Admin Create Event
POST /events
payload: {
"name": "Google Conference",
"details": "2020 Google conference limited to 500 guest",
"location": "12, Saka Tinibu Street, Victoria Island, Lagos, Nigeria",
"event_date": "2021-10-05T14:48:00.000Z",
"reservation_limit": 500
}
Set autorization to token in the header

View all upcoming events
GET /events
Set autorization to token in the header

Admin Update Event
PATCH /events/:event_id
payload: {
"name": "Google Conference"
}
Set autorization to token in the header

Admin Delete Event
DELETE /events/:event_id
Set autorization to token in the header

User Book a ticket
POST /events/:event_id/ticket
Set autorization to token in the header

User cancel a ticket booking
PATCH /events/:event_id/:ticket_id
Set autorization to token in the header

User view all his reservations
GET /user/tickets
Set autorization to token in the header

Admin view a user reservations
GET /:user_id/tickets
Set autorization to token in the header
