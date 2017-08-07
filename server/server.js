// (C) Copyright 2014-2016 Hewlett-Packard Development Company, L.P.

// Base utils
import compression from 'compression';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSanitized from 'express-sanitized';
import path from 'path';
import colors from 'colors/safe';
import isomorphicRender from './isomorphicRender';

const PORT = process.env.PORT || 8000;
const SESSION_KEY = `t~$#z:.aNilzvrlfzEbJeyj*#17s3Ot~$#z:.aNilzvrlfzEbJeyj*#17s3O6.1sjd2o0_n8pR"mAXj27G*=Q-ki["`;

// Database
import mongoose from 'mongoose'; // eslint-disable-line
import * as dbConfig from './db';

// Routes
import api from './routes/api';
import usersApi from './routes/users';
import fileApi from './routes/file';
import postsApi from './routes/posts';
import routesApi from './routes/routes';
import pageTypesApi from './routes/pageTypes';
import settingsApi from './routes/settings';
import searchApi from './routes/search';
import syncApi from './routes/sync';;

// Session store.
import session from 'express-session';
import MongoStore from 'connect-mongo';
const MongoStoreSession = MongoStore(session);

// Base API Prefix
import { apiPrefix } from './utils';

const apiRoutePrefix = apiPrefix(process.env);

// Init Express server.
process.setMaxListeners(0);

const app = express();

app.use(compression());
app.use(morgan('tiny'));
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use('/dashboard/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '250mb'
}));
app.use(bodyParser.json({limit: '20mb'}));
app.use(expressSanitized());
app.use(cookieParser());

// Sessions
const { user, pass } = dbConfig.dbOptions;
const sessionUrl = (user && pass) 
  ? `mongodb://${user}:${pass}@localhost:27017/sessions?authSource=admin&w=1`
  : `mongodb://localhost:27017/sessions?w=1`;
app.use(
  session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStoreSession({
      url: sessionUrl
    }),
    cookie: {
      httpOnly: false,
      maxAge: null
    }
  })
);

// To remove stale sessions from the DB:
// db.sessions.ensureIndex( { "lastAccess": 1 }, { expireAfterSeconds: 3600 } )
// This removes sessions older than an hour every 60 seconds.

// Allow external calls to API for dev purposes.
app.use(function(req, res, next) {
  const origin = req.headers.origin || req.headers.host;
  const allowedOrigins = [process.env.BASE_URL, process.env.FRONT_END_URL];
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("X-Frame-Options", "deny");
  next();
});

// LCN add to simulate sending 200 for the re-direct
app.get('/health_check.html', function (req, res) {
  res.status(200).send('Status: OK');
});

// User Auth
import passport from 'passport';
import User from './models/User';
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Views
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use(apiRoutePrefix, api);
app.use(apiRoutePrefix, usersApi);
app.use(apiRoutePrefix, fileApi);
app.use(apiRoutePrefix, postsApi);
app.use(apiRoutePrefix, routesApi);
app.use(apiRoutePrefix, pageTypesApi);
app.use(apiRoutePrefix, settingsApi);
app.use(apiRoutePrefix, searchApi);
app.use(apiRoutePrefix, syncApi);

// Defining the empty index key hides index.html in the dist folder.
// This provides for a cleaner dev/production environment
// while building isomorphic apps.
app.use('/', express.static(
  path.join(__dirname, '/../dist'),
  { index: '' }
));

// Isomorphic rendering
app.use(isomorphicRender);

// Go time
const server = http.createServer(app);
server.listen(PORT);

console.log(
  colors.green(`HTTP Server started, listening at: http://localhost:${PORT}...`)
);
