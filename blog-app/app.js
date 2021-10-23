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
    title: String,
    image: {type: String, default : "placeholder.jpg"},
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES


//INDEX ROUTE
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
    });
});

//NEW ROUTE
app.get("/blogs/new", (req,res)=> {
    res.render("new");
});

app.post("/blogs", (req, res) => {
    //create blog
    Blog.create(req.body.blog, (err,newBlog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", (req,res) => {
    Blog.findById(req.params.id, (err, foundBlog)=> {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
    
});


app.listen(port, () => {
    console.log('BlogApp Server started.')
})