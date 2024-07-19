const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.0fjyio3.mongodb.net/QuickWallet").then(() => {
    console.log("Connection is successful");
}).catch((e:any) => {
    console.log(e);
});