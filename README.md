# sports4u

## Project setup
### Installing
```
npm install
```
### Setting up environment variables
- Get a Mapbox API key from here: https://www.mapbox.com/
- Create a file named `.env` in the root directory with this content:
```
VUE_APP_MAPBOX_API_KEY=<insert mapbox API key here>
VUE_APP_API_URL=http://localhost:3000
```

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
