const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
require('dotenv').config();

const userRoutes = require('../route/user.route');
const roleRoutes = require('../route/role.route');
const allRoutes = require('../route/route.route');

app.use('/',express.static(path.join(__dirname, '../client/build')));
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/routes',allRoutes);
app.get('*', function (req, res) {
     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

module.exports = app;


