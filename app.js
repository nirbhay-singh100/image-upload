const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const { log } = require("console");
const postUploadModel = require(__dirname+"/uploadDatabaseModel.js")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"./public/images")
  },

  filename: (req, file, cb) =>{
    console.log(file);
    cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const imageUploader = multer({storage});

app.get("/", function(req, res){
  postUploadModel.find({}).then(
    (postsData) => {
      res.render("index", {posts: postsData});
    }
  );
});

app.post("/", imageUploader.single("uploadedImage"), function(req,res){
  
  
    let imageFile = req.file.filename;
    //console.log(req.file.filename);
    const postDetails = new postUploadModel({
    caption: req.body.caption,
    imageName: imageFile
   });
    postDetails.save();
    postUploadModel.find({}).then(
    (posts) => {
      // console.log(posts);
    }
  );
  res.redirect("/");
  

});

app.get("/:postId", function(req, res){
  console.log(req.params.postId);
  postUploadModel.findById(req.params.postId).exec().then(
    (postData) => {
      res.render("singlePost.ejs", {post: postData});
    }
  );
});

app.post("/delete", function(req, res){
  postUploadModel.deleteOne({_id: req.body.remove}).then(
    () => {
      console.log("successfully deleted");
    }
  );
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
