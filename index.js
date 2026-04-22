const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
const usersRoutes = require('./routes/users');
//const restaurantsRoutes = require('./routes/restaurants');
//const ordersRoutes = require('./routes/orders');
// shto tjerat gradualisht

app.use('/users', usersRoutes);
//app.use('/restaurants', restaurantsRoutes);
//app.use('/orders', ordersRoutes);
// Roles
const rolesRoutes = require('./routes/roles');
app.use('/roles', rolesRoutes);

// UserRoles
const userRolesRoutes = require('./routes/userroles');
app.use('/userroles', userRolesRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Food Delivery API po punon 🚀');
});

// start server
app.listen(port, () => {
  console.log(`Serveri po punon në portin ${port}`);
});