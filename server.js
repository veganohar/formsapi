const express = require('express');
const app = express();
const port = 3000;
const db = require('./app/models');
const dbconfig = require('./app/config/db.config');
const bodyParser = require("body-parser");


// parse requests of content-type - application/json
app.use(bodyParser.json({limit:'50mb'}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));

app.get("/", (req, res) => {
    res.send("Hello API");
});

app.listen(port, () => {
    console.log(`Forms API app listening at http://localhost:${port}`)
});
db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.port}/${dbconfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB successfully");
}).catch((err) => {
    console.error("Error in connecting to DB", err);
    process.exit();
});
require('./app/routes/customer.routes')(app);