const express = require("express");
const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");
//All author's route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

//New Author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create New Author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect("authors");
  } catch {
    // let locals = {
    //   errorMessage: "Error creating author",
    // };
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     //console.log("err");
  //     let locals = {
  //       errorMessage: "Error creatng author",
  //     };
  //     res.render("authors/new", {
  //       author: author,
  //       locals,
  //     });
  //   } else {
  //     //res.redirect(`authors/${newAuthor.id}`)
  //     res.redirect("authors");
  //   }
  // });
  //res.send(req.body.name);
});

module.exports = router;
