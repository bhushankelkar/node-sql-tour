module.exports = {
  adminHome: (req, res) => {
    res.render("admin-home.ejs", {
      title: "VEDITA TOURS"
    });
  }
};
