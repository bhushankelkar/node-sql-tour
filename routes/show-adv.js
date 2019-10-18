module.exports = {
  showAdv: (req, res) => {
    let query = "SELECT * FROM `adv` ORDER BY aid"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("show-adv.ejs", {
        title: "VEDITA TOURS",
        adv: result
      });
    });
  }
};
