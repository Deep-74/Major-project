 const express=require('express')
 const app=express();
 app.use(express.json());    // to take  request body from the front end 


 require('dotenv').config()         // .env file need to be present on the same file hierarchy level.
 const dbConfig=require('./config/dbConfig')
 const port=process.env.PORT || 5000;

 const usersRoute=require('./routes/usersRoute');
 const productsRoute=require('./routes/ProductRoute')
 const bidsRoute=require('./routes/bidsRoute')
 const notificationsRoute=require('./routes/notificationsRoute')
 

 app.use('/api/users',usersRoute);          // middle ware  end points with /api/users will get-redirect to userRoute
 app.use('/api/products',productsRoute);
 app.use('/api/bids',bidsRoute)
 app.use('/api/notifications',notificationsRoute)

 // deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

 app.listen(port,()=>console.log(`Port started on the port ${port}`));



