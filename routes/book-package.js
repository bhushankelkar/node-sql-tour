const fs = require("fs");

module.exports = {
  bookPackagePage: (req, res) => {
    let packid = req.params.packid;
    let query =
      "SELECT details FROM `package` WHERE packid = '" + packid + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("book-package.ejs", {
        title: "Book Package",
        message: "",
        package: result[0]
      });
    });
  },
  bookPackage: (req, res) => {
    /* if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }*/

    let name = req.body.name;
    let phno = req.body.phno;
    let mail = req.body.mail;
    let number = req.body.number;
    let packid = req.params.packid;
    // check the filetype before uploading it

    // send the player's details to the database
    let query =
      "INSERT INTO `customer` (name, phno, email, number,packid) VALUES ('" +
      name +
      "', '" +
      phno +
      "', '" +
      mail +
      "', '" +
      number +
      "','" +
      packid +
      "')";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("booking done");
      res.redirect("/");
    });
  }
};
