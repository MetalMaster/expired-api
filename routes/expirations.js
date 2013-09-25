var mongo = require("mongodb");

var Server = mongo.Server,
  dB = mongo.Db,
  BSON = mongo.BSONPure;
  
var server = new Server("localhost", 27017, {auto_reconnect:true});
db = new dB("expired", server);

db.open(function(err,db){
  if(!err){
    console.log("Connected to expired db");
  }
});



sendResponse = function(req, res, data){
  res.type("application/json");  
  
  if(req.query.callback)
    //JSONP
    res.send(req.query.callback + "("+JSON.stringify(data)+")");
  else
    res.send(data);
};


exports.findByUserId = function(req, res){
	var userId = req.params.userId;
	var filter = {userId:userId};
	
	db.collection("expirations", function(err, collection){
		collection.find(filter).toArray(function(err, items){
			    sendResponse(req, res, items);
		});
	});
};

exports.add = function(req, res){
	var expiration = req.body;
	db.collection("expirations", function(err, collection){
		collection.insert(expiration, {safe:true}, function(err, result){
			if(err){
				res.send({"error":"An error occured - " + err});
			}else{
				res.send(result[0]);
			}
		});
	});
};

exports.remove = function(req, res){
	var id = req.params._id;
	db.collection("expirations", function(err, collection){
		collection.remove({_id:new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({"error":"An error occured - " + err});
			}else{
				res.send(req.body);
			}
		});
	});
};





