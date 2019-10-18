module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM `category` ORDER BY catid,catlocation ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("index.ejs", {
        title: "VEDITA TOURS",
        category: result
      });
    });
  }
};

