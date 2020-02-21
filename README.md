# Happy Hour API

A REST API for the [Happy Hour App](https://github.com/quangChe/happy-hour-react-app).

## Getting Started

1. Install all dependencies.
 
```
npm install
```
 
2. Get a Yelp API Key and set up a .env file. In your .env file, add the following variables:

```
YELP_API_KEY=[YOUR_YELP_API_KEY]
HOSTNAME=localhost 
MONGO_URI=mongodb://localhost:PORT_NUMBER/happyHour // Replace "PORT_NUMBER"
```

3. Start up the app.

```
npm start 
```

**Alternatively, use Dockerfile**

```
docker build -t USERNAME/happy-hour .
docker run -p 9000:9000 --name=happy-hour USERNAME/happy-hour
```
*Note:* Dockerfile may not work because I'm still making modifications to the container. It is best to use the alternative steps 1-3 above.
