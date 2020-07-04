var express        = require("express"),
    app            = express(),
	mongoose       =require("mongoose"),
	bodyParser     =require("body-parser");

mongoose.connect("mongodb://localhost:27017/Blog_App",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var blogSchema = new mongoose.Schema({
	pincode:Number,
	house_number: String,
	colony : String,
	city: String,
	state:String,
	Landmark:String
});

var Blog= mongoose.model("Blog", blogSchema);

/*Blog.create({
	pincode:226008,
	house_number: "sarojaninagar",
	colony : "na",
	city: "luck",
	state: "up",
	Landmark: "tower"
 }); */

app.get("/",function(req,res){
	res.render("new");
});

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
			  if (err){
		console.log(err);
	}else{
		res.render("index",{blogs:blogs});
	}
});
});

app.post("/blogs", function(req,res){
	Blog.create(req.body.blog,function(err, newBlog){
   if (err){
		res.render("new");
		} else {
			res.redirect("/blogs");
		       }
     });
});

app.listen(30005,function(){
	console.log("started");
});
