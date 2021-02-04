const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
///////////////////////////////////////////////////////////
app.get("/",(req,res)=>{
    res.send("Hello API"); 
});
app.get("/test",(req,res)=>{
    res.send("Hello Test");
});
app.get("/array/:prop/:order",(req,res)=>{
    var details = [
        {
            name: "Manohar",
            phone: 9492901901,
            age: 27,
            city: "Hyderabad",
            salary: 25000
        },
        {
            name: "Sayan",
            phone: 7892901901,
            age: 16,
            city: "Mumbai",
            salary: 22000
        },
        {
            name: "Sowmya",
            phone: 9492000901,
            age: 30,
            city: "Hyderabad",
            salary: 35000
        },
        {
            name: "Rakesh",
            phone: 8975601901,
            age: 24,
            city: "Chennai",
            salary: 28000
        },
        {
            name: "Nupur",
            phone: 8992901901,
            age: 28,
            city: "Pune",
            salary: 45000
        },
        {
            name: "Rajat",
            phone: 9400001901,
            age: 29,
            city: "Delhi",
            salary: 29000
        }
    ];
    let p = req.params.prop;
    let o = req.params.order;
    let n = o=="asc"?1:-1;
    details.sort((a,b)=>{
        if(a[p]>b[p]){
            return n;
        }
        if(a[p]<b[p]){ 
            return -n;
        }
        return 0;
    });
    res.send(details);
})
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