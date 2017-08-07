# __Technical Guide__

## Getting Started

This is the source code for the Grommet CMS boilerplate.
To run this application, execute the following commands:

  1. Install NPM modules

  ```bash
  $ npm install
  ```

  2. Add .env file. The project comes with a .env.example file which can be renamed to .env. These are your enviroment variables.
  The .env.example file contains most of the setup you will need.  If you need more granular control, you have the ability to add / edit     these values.
  
  Below are the default .env values:
  
  ```
  # Environment variables for database connection.
  DB="grommet-cms-dev" // the name of your mongo databas
  NODE_ENV="development" // the default NODE_ENV
  DB_USER="" // The DB user name
  DB_PW="" // the db password
  BASE_URL="http://localhost:8003" // base url for your front end
  API_URL="http://localhost:8000/api" // base url for your API.
```

  3. Ensure Mongo is running. Upon starting the server the application will automatically build a hello world post and a temporary dashboard user.

  4. To start the server run:

  ```bash
  $ npm run build
  $ npm start
  ```

  5. To start the development server:

  ```bash
  $ npm run dev
  ```

  6. To create the website distribution bundle:

  ```bash
  $ npm run dist
  ```

## Generators
The projects contains built in code generation tools for easy project scaffolding.

### Run the generator

To run the generators with a list of generators, run
```
npm run generator
```

Follow the on screen prompts to select the options you wish to use.

For convenience, you can bypass the initial selection and scaffold out containers, components and pages by running

```
npm run generate:<type_of_component>
```

where <type_of_component> is one of: component, container or page.

### Generator Options

- Container `npm run generate:container`
  - What should it be called? Default: `Dashboard`
  - What directory would you like your container in? (relative path) Default: `./src/js/containers`
  - Do you want actions/constants/reducer for this container? (Y/n)
  - Do you want to use reselect? (Y/n)
    - Adds a `selectors` file that allows you to create [memoized selectors](https://github.com/reactjs/reselect). See [here](https://medium.com/front-end-hacking/performance-optimizing-a-react-single-page-app-part-2-92a0f0c83202#.1zw1ibyrw) for why this can help your app's performance.
  - Should the container have FlowTypes instead of PropTypes? (Y/n)
  - Should the component have an accompanying jest test file? (y/N)

- Component `npm run generate:component`
  - Select the type of component: Stateless functional components (recommended) / ES6 Class
  - What directory would you like your component in? (relative), defaults to `./src/js/components`
  - What is the name of the component?, i.e. `Post`
  - Would you like to import any commonly used grommet components? Multiple choice list of commonly used components.
  - Should the component have regular React PropTypes? Defaults to Yes.
  - Should the component have Flow Types instead of or along with PropTypes? Defaults to Yes.
  - Test: Should the component have an accompanying jest test file? Defaults to No.

### **Gotchas**
In order to get the import / export to work, the generator does some pattern matching of the comments in the files to place the new imports.  Just don't delete any comment that is prefixed with `GENERATOR` and things will work great.
