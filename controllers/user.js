const User = require("../models/user");

exports.postRegisterUser = (req, res, next) => {
  //   User.findAll({ where: { email: req.email } })
  //     .then((users) => {
  //       if (users.length === 1) {
  //         throw new error();
  //       }
  //       return;
  //     })
  //     .then(() => {
  let admin = req.body.admin === "true";
  User.create({
    name: req.body.name,
    email: req.body.email,
    isAdmin: admin,
    currentUser: false,
    password: req.body.password,
  })
    .then((user) => {
      return user.createCart();
    })
    .then(() => {
      res.redirect("/user/login");
    });
};
//).catch((err) => {
// console.log(err);
//   redirect("/user/login-error");
//   });
//};

exports.getLoginUserError = (req, res, next) => {
  res.render("user/user-register-error", {
    name: req.user,
    pageTitle: "Login Error",
    path: "/user/login",
  });
};

exports.getRegisterUser = (req, res, next) => {
  res.render("user/user-register", {
    name: req.user,
    pageTitle: "Register",
    path: "/user/register",
  });
};

exports.postLoginUser = (req, res, next) => {
  User.update({ currentUser: false }, { where: { currentUser: true } })
    .then((result) => {
      return User.findAll({
        where: { password: req.body.password, email: req.body.email },
      });
    })
    .then((users) => {
      if (users.length <= 0) {
        return User.update(
          { currentUser: true },
          {
            where: {
              name: "guest",
              password: "guest",
              email: "guest@guest.com",
            },
          }
        );
      }
      return User.update(
        { currentUser: true },
        {
          where: {
            name: users[0].name,
            password: users[0].password,
            email: users[0].email,
          },
        }
      );
    })
    .then(() => {
      res.redirect("/user/login");
    })
    .error((err) => console.log(err));
};

exports.getLoginUser = (req, res, next) => {
  res.render("user/user-login", {
    name: req.user,
    pageTitle: "Login",
    path: "/user/login",
  });
};
