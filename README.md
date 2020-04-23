# sports4u
## Website functionality
  ### Overview
  Users can find sports to play near them by clicking on one of the sports on the homepage. On the map, clicking on map markers will show venue information and allow the user to view events at that location by either clicking on one of the sport buttons or the "Go to venue page" button.
  
  Users can register for an account for the ability to create events, join events, and chat with other users. On the dashboard, logged in users can view their created events, the events they've signed up for, and upcoming events. In addition, they can view updates of events that they've signed up for or are a part of. Users can edit their events and their profile information here as well.
  
  On a venue page, users can see a graph of the days events usually occur at that location. They can also view the events at that location and filter events by sport. If they are signed in, they can add events to the venue, join events, and leave events they have signed up for.
  
  If users would like to find locations without searching for a sport first, they can use the location search field in the navbar.

## Project setup
### Installing
```
npm install
```
### Setting up environment variables
- Get a Mapbox API key from here: https://www.mapbox.com/
- Create a file named `.env` in the root directory with this content:
```
VUE_APP_MAPBOX_API_KEY=insert_mapbox_api_key_here
VUE_APP_API_URL=http://localhost:3000
```
### Running
Run the Vue frontend server:
```
npm run serve
```
Run the API server:
```
npm run api
```
Visit the site at `localhost:8080`.

## Scripts
### Frontend
#### Compiles and hot-reloads for development
```
npm run serve
```
Frontend server runs on port 8080.

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### API
#### Run API server
```
npm run api
```
API server runs on port 3000.
