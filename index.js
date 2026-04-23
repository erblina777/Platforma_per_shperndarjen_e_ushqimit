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
<<<<<<< HEAD
//const restaurantsRoutes = require('./routes/restaurants');
//const ordersRoutes = require('./routes/orders');

app.use('/users', usersRoutes);
//app.use('/restaurants', restaurantsRoutes);
//app.use('/orders', ordersRoutes);

=======
const restaurantsRoutes = require('./routes/restaurants');
const menuCategoriesRoutes = require('./routes/menucategories');
const ordersRoutes = require('./routes/orders');
const menuItemsRoutes = require('./routes/menuitems');

app.use('/users', usersRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/menucategories', menuCategoriesRoutes);
app.use('/orders', ordersRoutes);
app.use('/menuitems', menuItemsRoutes);
>>>>>>> ade21737afe5f990933fcd5865c155c5e74951f0
// Roles
const rolesRoutes = require('./routes/roles');
app.use('/roles', rolesRoutes);

// UserRoles
const userRolesRoutes = require('./routes/userroles');
app.use('/userroles', userRolesRoutes);

//OrderItems
const orderItemsRoutes = require('./routes/orderitems');
app.use('/orderitems', orderItemsRoutes);

// DeliveryDrivers
const driversRoutes = require('./routes/deliverydrivers');
app.use('/drivers', driversRoutes);

// Deliveries 
const deliveriesRoutes = require('./routes/deliveries');
app.use('/deliveries', deliveriesRoutes);

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