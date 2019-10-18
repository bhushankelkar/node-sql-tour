const fs = require("fs");

module.exports = {
  viewPackagePage: (req, res) => {
    let catId = req.params.catid;
    let query =
      "SELECT packid,price,details FROM `package` WHERE catid = '" +
      catId +
      "' ";
    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render("view-package.ejs", {
        title: "View Package",
        package: result[0],
        message: ""
      });
    });
  }
};
