module.exports = {
  registerController: (req, res) => {
    var users = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    db.query("INSERT INTO user SET ?", users, function(error, results, fields) {
      if (error) {
        res.json({
          status: false,
          message: "there are some error with query"
        });
      } else {
        res.json({
          status: true,
          user: results,
          message: "user registered sucessfully"
        });
      }
    });
    res.render("register-controller.ejs", {
      title: "Welcome ",
      message
    });
  }
};
