# Grommet CMS
This repo contains the source code for the Grommet CMS.  We are working on open sourcing this right now and would love your help! See [CONTRIBUTING.md](https://github.com/grommet/grommet-cms/blob/master/CONTRIBUTING.md) for details on how to contribute :smile: 

## Getting Started

This is the source code for the Grommet CMS boilerplate.
To run this application, execute the following commands:

  1. Install NPM modules

  ```bash
  $ yarn
  ```

  2. Add .env file. The project comes with a .env.example file which can be renamed to .env. These are your enviroment variables.
  The .env.example file contains most of the setup you will need.  If you need more granular control, you have the ability to add / edit     these values.
  
  Below are the default .env values:
  
  ```
  # Environment variables for database connection.
  DB="grommet-cms-dev" // the name of your mongo database
  NODE_ENV="development" // the default NODE_ENV
  DB_USER="" // The DB user name
  DB_PW="" // the db password
  BASE_URL="http://localhost:8003" // base url for your front end
  API_URL="http://localhost:8000/api" // base url for your API.
  API_PREFIX="dashboard" // Path for urls to your API, routes will look like /dashboard/api/my-route.
```

  3. Ensure Mongo is running. Upon starting the server the application will automatically build a hello world post and a temporary dashboard user.

  4. To start the server run:

  ```bash
  $ npm run api-dev
  ```

  5. To start the development server:

  ```bash
  $ npm run dev
  ```

  6. To create the website production distribution bundle:

  ```bash
  $ npm run build
  ```

  7. To run the distribution bundle using forever:

  ```bash
  $ forever start server ./server/server
  ```

## Generators
See [here](https://github.com/grommet/grommet-cms-boilerplate#generators)
