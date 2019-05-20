#Happy Hour API

This is the basic API for the Happy Hour App, which can be found in this [repository](https://github.com/quangChe/happy-hour). This API runs on a Node.js server and is meant to be used with the happy-hour app. 

## Getting Started

1. Install all dependencies.
 
```
npm install
```
 
2. Get a Yelp API Key and set up a .env file. In your .env file, add the following variables:

```
YELP_API_KEY=Bearer [YOUR_API_KEY]
HOSTNAME=localhost // when running locally
```

3. Start up the app.

```
npm start // or nodemon
```

## Serving the App from the API (Optional)

Currently, this API is mainly used as REST API to retrieve data for the Happy Hour app. However, this API has also been enabled to serve the development build of the app by following these steps:

1. Clone the app from [here](https://github.com/quangChe/happy-hour) 

2. Navigate into the app, install dependecnies and run build command.

```
cd ./happy-hour
npm install
npm run build
```

3. Ensure the happy-hour and the happy-hour-api are in the same directory and that you rename happy-hour to 'app'.

```
mkdir happy-hour-app
cp -rf happy-hour-api ./happy-hour-app/api
cp -rf happy-hour ./happy-hour-app/app
```

4. Go into the newly-created happy-hour-app directory and navigate to the api directory and start up the server.

```
cd ./happy-hour-app/api
npm start // or nodemon
```

5. You will then be able to view the development build of the app from this API.
