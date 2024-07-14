# Weather Report Application
This Node.js application fetches weather data for users' locations using the OpenWeatherMap API, stores user details in a MongoDB database, and sends hourly weather reports via email every 3 hours. Additionally, it uses OpenAI or Gemini APIs to generate text about the weather and includes it in the weather report. It also integrates Google Cloud to get city names from coordinates.

## Features
- Store user details (email, location, weather data)
- Fetch weather data for users' locations
- Update users' locations
- Retrieve users' weather data for a given day
- Send hourly weather reports to users' emails every 3 hours
- Generate descriptive weather text using OpenAI or Gemini APIs
- Convert coordinates to city names using Google Cloud
- Test routes using Postman

## Prerequisites
- Node.js
- MongoDB
- OpenWeatherMap API key
- Nodemailer + Gmail or another email service
- OpenAI or Gemini API key
- Google Cloud API key


### Installation
1. Clone the repository:
```bash
git clone <git url>
```

2. Navigate into the project directory:
```bash
cd weather-report-backend-app
```

3. Install dependencies:
```bash
npm install
```

### Set Up environment Variables

- Please create a .env file with neccesary variables mentioned in .env example file


### Running the Application

1. Start the backend server:
```bash
npm run dev
```

## Sending Weather Reports
The application sends hourly weather reports to users' emails every 3 hours using Nodemailer and Gmail. The weather report includes generated text from OpenAI or Gemini APIs.

## Google Cloud Integration
The application uses Google Cloud to convert coordinates to city names.

## Testing with Postman
Import the provided Postman collection (included in the repository as WeatherReportApp.postman_collection.json) into Postman.
Test the API endpoints using the imported collection.
