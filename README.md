EVENT MANAGEMENT SYSTEM

This project is a RESTful API built with Node.js and Express.js for managing events. It uses MongoDB as the database to store event data and includes routes for creating and finding events. Additionally, it utilizes utility functions in the utility folder for handling specific functionalities like formatted dates, fetching distances, and fetching weather data.
Technologies Used
Node.js
Express.js
MongoDB

Getting Started

Clone the repository: git clone <repository-url>

Install dependencies: npm install

Set up MongoDB connection in config.js or .env file

Start the server: npm start

API Endpoints
POST /api/events/create - Create a new event
GET /api/events/find - Find events based on user input (longitude, latitude, date)

Usage

Create a new event:
Send a POST request to /api/events/create with event data (name, date, longitude, latitude)

Find events:
Send a GET request to /api/events/find with user input (longitude, latitude, date)

CSV dataset is directly inserted into mongodb databse


Routes.js->
in Route.js i have made two routes one for inserting data into the database and the other one for getting data from the database using post and get request.

Controller Logic
'createEvent.js'

This controller handles the logic for creating a new event and find events 

createevent function
When a POST request is sent to the /api/events/create endpoint with event data (name, date, longitude, latitude), the createEvent controller is called.
Inside the createEvent controller:
1.The input data is validated to ensure all required fields are provided.
2.If validation passes, the data is formatted and passed to the corresponding model (e.g., Event.js) to create a new event document in the MongoDB database.
3.A success response is sent back to the client with the newly created event data.

findevents function  

This controller handles the logic for finding events based on user input (longitude, latitude, date).

When a GET request is sent to the /api/events/find endpoint with user input parameters, the findEvent controller is called.

Inside the findEvent controller:
1.The user input parameters (longitude, latitude, date) are received and validated.
2.A MongoDB query is constructed to find events that match the given criteria (e.g., within a specific distance from the user's location and within the next 14 days).
3.The fetched event data is then processed further:
    Weather data for each event is fetched using the fetchWeather utility function.
    Distance from the user's location to each upcoming event is calculated using the fetchDistance utility function.
4.The processed data is formatted and sent back to the client in JSON format as a response.


Used mongodb for database 

For getting pagewise data i have used pagenation concept 
The `setFinalData` function is responsible for paginating the events data and organizing it into pages. Here's a breakdown of its logic:

1. Calculate Total Pages**:
   - It calculates the total number of pages required for pagination by dividing the total number of events (`eventsWithData.length`) by the page size (`pageSize`), and then rounding up using `Math.ceil()`.

2. Initialize Final Data Array**:
   - It initializes an empty array `finalData` to store the paginated data.

3. Paginate Events Data**:
   - It iterates over each page, from `0` to `totalPages - 1`.
   - For each page, it calculates the starting and ending indexes based on the page size.
   - It slices the `eventsWithData` array to extract events data for the current page using `Array.slice()`.
   - It constructs an object `sliceData` containing the events data for the current page, along with metadata such as the current page number, page size, total pages, and total number of events.
   - It pushes `sliceData` into the `finalData` array.

4. Return Final Data**:
   - It returns the `finalData` array containing paginated data.

