const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
///////////////////////////////////////////////////////////
app.get("/",(req,res)=>{
    res.send("Hello API");
});
app.listen(port, () => {
    console.log(`Forms API app listening at http://localhost:${port}`)
  });
  mongoose.connect(`mongodb://localhost:27017/formsapi`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
      console.log("Connected to DB successfully");
  }).catch((err)=>{
      console.error("Error in connecting to DB",err);
      process.exit();
  });