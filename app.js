const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findAll({ where: { currentUser: true } })
    .then((users) => {
      req.user = users[0];
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/user", userRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findAll();
    // console.log(result);
  })
  .then((users) => {
    if (users.length <= 0) {
      User.create({
        name: "Max",
        email: "test@test.com",
        isAdmin: true,
        currentUser: false,
        password: "ZAQ12wsx",
      }).then((user) => {
        // console.log(user);
        return user.createCart();
      });
      User.create({
        name: "guest",
        email: "guest@guest.com",
        isAdmin: false,
        currentUser: true,
        password: "guest",
      }).then((user) => {
        // console.log(user);
        return user.createCart();
      });
    }
    return users;
  })
  .then((cart) => {
    app.listen(8000, function () {});
  })
  .catch((err) => {
    console.log(err);
  });
