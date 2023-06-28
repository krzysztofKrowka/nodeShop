const User = require("../models/user");

exports.postRegisterUser = (req, res, next) => {
  let admin = req.admin === "true";
  User.create({
    name: req.name,
    email: req.email,
    admin: admin,
    currentUser: false,
    password: req.password,
  })
    .then((user) => {
      return user.createCart();
    })
    .then(() => {
      redirect("/user/login", {
        pageTitle: "Login",
        path: "/user/login",
      });
    })
    .catch((err) => console.log(err));
};

exports.getRegisterUser = (req, res, next) => {
  return res.render("user/user-register", {
    pageTitle: "Register",
    path: "/user/register",
  });
};

exports.postLoginUser = (req, res, next) => {};

exports.getLoginUser = (req, res, next) => {
  exports.getRegisterUser = (req, res, next) => {
    return res.render("user/user-login", {
      pageTitle: "Login",
      path: "/user/login",
    });
  };
};
