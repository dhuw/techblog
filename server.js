const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const hbs = exphbs.require({ helpers });
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: { maxAge: 36000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
