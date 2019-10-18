const fs = require("fs");

module.exports = {
  addCategoryPage: (req, res) => {
    res.render("add-category.ejs", {
      title: "Welcome to Socka | Add a new player",
      message: ""
    });
  },
  addCategory: (req, res) => {
    //if (!req.files) {
    //return res.status(400).send("No files were uploaded.");

    let message = "";
    let catname = req.body.catname;
    let catid = req.body.catid;
    let catlocation = req.body.catlocation;
    let catnameQuery =
      "SELECT * FROM `category` WHERE catname = '" + catname + "'";

    db.query(catnameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        message = "Username already exists";
        res.render("add-category.ejs", {
          message,
          title: "Welcome to Socka | Add a new player"
        });
      } else {
        // check the filetype before uploading it

        // send the player's details to the database
        let query =
          "INSERT INTO `category` (catid,catname,catlocation) VALUES ('" +
          catid +
          "','" +
          catname +
          "','" +
          catlocation +
          "')";
        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect("/");
        });
      }
    });
  },

  editCategoryPage: (req, res) => {
    let catid = req.params.catid;
    let query = "SELECT * FROM `category` WHERE catid = '" + catid + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-category.ejs", {
        title: "Edit  Player",
        category: result[0],
        message: ""
      });
    });
  },
  editCategory: (req, res) => {
    let catid = req.params.catid;
    let catname = req.body.catname;
    let catlocation = req.body.catlocation;
    let query =
      "UPDATE `category` SET `catname` = '" +
      catname +
      "', `catlocation` = '" +
      catlocation +
      "' WHERE `category`.`catid` = '" +
      catid +
      "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  },
  deleteCategory: (req, res) => {
    let catid = req.params.catid;

    let deleteUserQuery = 'DELETE FROM category WHERE catid = "' + catid + '"';

    db.query(deleteUserQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  }
};
