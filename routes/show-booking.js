module.exports = {
  showBooking: (req, res) => {
    let query =
      "SELECT custid,name,phno,email,number,packid FROM `customer` ORDER BY custid"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("show-booking.ejs", {
        title: "VEDITA TOURS",
        customer: result
      });
    });
  }
};
