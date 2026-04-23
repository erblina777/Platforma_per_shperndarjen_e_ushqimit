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

app.use('/users', usersRoutes);
//app.use('/restaurants', restaurantsRoutes);
//app.use('/orders', ordersRoutes);

// Roles
const rolesRoutes = require('./routes/roles');
app.use('/roles', rolesRoutes);

// UserRoles
const userRolesRoutes = require('./routes/userroles');
app.use('/userroles', userRolesRoutes);

const reviewsRoutes = require('./routes/reviews');

app.use('/reviews', reviewsRoutes);
app.use('/reviews', reviewsRoutes);

// START SERVER
app.listen(port, () => {
  console.log(`Serveri po punon në portin ${port}`);
});
const addressesRoutes = require('./routes/addresses');

app.use('/addresses', addressesRoutes);

const promotionsRoutes = require('./routes/promotions');

app.use('/promotions', promotionsRoutes);