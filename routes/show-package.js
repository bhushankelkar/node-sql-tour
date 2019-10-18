module.exports = {
  showPackage: (req, res) => {
    let query = "SELECT * FROM `package` ORDER BY packid ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("show-package.ejs", {
        title: "VEDITA TOURS",
        package: result
      });
    });
  }
};
