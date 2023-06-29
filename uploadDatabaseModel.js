const mongoose = require("mongoose");
main().catch(err => console.log(err));
async function main(){
  const conn = mongoose.connect('mongodb+srv://nirbhaymahan12:7k66833k96@cluster0.5ttr5oq.mongodb.net/ImageDemoDB', { useNewUrlParser: true});
  console.log("database has been created");

  var uploadSchema = new mongoose.Schema({
    caption: String,
    imageName: String
  });

  var uploadModel = mongoose.model("uploadimage", uploadSchema);
  module.exports = uploadModel;

}
