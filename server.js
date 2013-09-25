var express = require('express'),
expirations=require("./routes/expirations"); 

var app = express();

app.configure(function(){
	app.use(express.logger("dev"));
	app.use(express.bodyParser());
});

app.get("/expirations/:userId", expirations.findByUserId);    
app.post("/expirations", expirations.add);   
app.delete("/expirations/:_id", expirations.remove); 
           
app.listen(3000);
console.log('Listening on port 3000...'); 


  
