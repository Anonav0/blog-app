const express    = require("express"),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      app        = express(),
      port       = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    tittle: String,
    image: {type: String, default : "placeholder.jpg"},
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES

app.get("/", (req, res)=> {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})  


app.listen(port, () => {
    console.log('BlogApp Server started.')
})