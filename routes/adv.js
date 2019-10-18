const fs = require("fs");

module.exports = {
  addAdvPage: (req, res) => {
    res.render("add-adv.ejs", {
      title: "Vedita Tours",
      message: ""
    });
  },
  addAdv: (req, res) => {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    let message = "";
    let company = req.body.company;
    let aid = req.body.aid;
    let title = req.body.title;
    //let pic = req.body.pic;
    let details = req.body.details;
    let uploadedFile = req.files.pic;
    // let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = aid + "." + fileExtension;

    let usernameQuery = "SELECT * FROM `adv` WHERE aid = '" + aid + "'";

    db.query(usernameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        message = "Username already exists";
        res.render("add-adv.ejs", {
          message,
          title: "Welcome to Socka | Add a new player"
        });
      } else {
        // check the filetype before uploading it
        if (
          uploadedFile.mimetype === "image/png" ||
          uploadedFile.mimetype === "image/jpeg" ||
          uploadedFile.mimetype === "image/gif"
        ) {
          // upload the file to the /public/assets/img directory
          uploadedFile.mv(`public/assets/img/${image_name}`, err => {
            if (err) {
              return res.status(500).send(err);
            }
            // send the player's details to the database
            let query =
              "INSERT INTO `adv` (aid,title,pic,company,details) VALUES ('" +
              aid +
              "','" +
              title +
              "','" +
              image_name +
              "','" +
              company +
              "','" +
              details +
              "')";
            db.query(query, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.redirect("/");
            });
          });
        } else {
          message =
            "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
          res.render("add-player.ejs", {
            message,
            title: "Welcome to Socka | Add a new player"
          });
        }
      }
    });
  },
  editAdvPage: (req, res) => {
    let aid = req.params.aid;
    let query = "SELECT * FROM `adv` WHERE aid = '" + aid + "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("edit-adv.ejs", {
        title: "Edit  Player",
        adv: result[0],
        message: ""
      });
    });
  },
  editAdv: (req, res) => {
    let aid = req.params.aid;
    let title = req.body.title;
    let company = req.body.company;
    let details = req.body.details;
    let query =
      "UPDATE `adv` SET `title` = '" +
      title +
      "', `company` = '" +
      company +
      "',`details` = '" +
      details +
      "' WHERE `adv`.`aid` = '" +
      aid +
      "'";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  },
  deleteAdv: (req, res) => {
    let aid = req.params.aid;

    let deleteUserQuery = 'DELETE FROM adv WHERE aid = "' + aid + '"';

    db.query(deleteUserQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect("/");
    });
  }
};
/*
let message = "";
    let company = req.body.company;
    let aid = req.body.aid;
    let title = req.body.title;
    let pic = req.body.pic;
    let details = req.body.details;
    let uploadedFile = req.files.pic;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split("/")[1];
    image_name = title + "." + fileExtension;
    let catnameQuery = "SELECT * FROM `adv` WHERE aid = '" + aid + "'";



let query =
              "INSERT INTO `adv` (aid,title,pic,company,details) VALUES ('" +
              aid +
              "','" +
              title +
              "','" +
              image_name +
              "','" +
              company +
              "','" +
              details +
              "')";*/
