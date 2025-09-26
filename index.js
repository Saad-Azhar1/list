const express = require("express")
const app = express();
const path = require("path")
const mongoose = require("mongoose")
const list = require("./models/list")
const User=require("./models/user")

const MONGDB_URL="mongodb://127.0.0.1:27017/b-project";

const db=process.env.ATLASDB_URL;

async function main(params) {
    await mongoose.connect('mongodb+srv://saadazhar234_db_user:q35cGUjjLGxVVmZE@cluster0.eq3sgbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

}

// async function main(params) {
//     await mongoose.connect(MONGDB_URL);
// }

main().then(() => {
    console.log("Database connect ")
}).catch(err => {
    console.log(err)
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
// app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")));

// app.post("/register",async(req,res)=>{
//      let{username,password}=req.body;
//      let newuser=new User({
//         adminpass:username,
//         userpass:password,
//      })
//      await newuser.save()
//      console.log("user register")
//      res.send("user login")

// })

app.get("/admin/saad",async (req, res) => {
    const seeData = await list.find({})
    res.render("index", { seeData })
})

app.get("/",(req,res)=>{
    res.render("form")
})



//add 
app.get("/add/saad", (req, res) => {
    res.render("add")
})

app.post("/add", async (req, res) => {
    let { item, color, weight, price } = req.body;
    const newData = new list({
        item: item,
        color: color,
        weight: weight,
        price: price,
    })
    await newData.save()
    res.redirect("/admin/saad")
})

app.get("/user",async(req,res)=>{
    let seeData=await list.find({})
    res.render("user",{seeData})
})

//edit page
app.post("/list/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let data=await list.findById(id)
    res.render("edit",{data})
})

app.post("/list/:id/update",async(req,res)=>{
    let {id}=req.params;
    let {item,color,weight,price}=req.body;
    let data=    await list.findByIdAndUpdate(id, {
        item,
        color,
        weight,
        price
    });
    res.redirect("/admin/saad")
    
})




//delete
app.post("/list/:id/delete",async(req,res)=>{
    let {id}=req.params;
    let deleteData=await list.findByIdAndDelete(id)
    res.redirect("/admin/saad")
})


app.post("/register", async (req, res) => {
    let { username, usertype, password } = req.body;
    let seeData = await list.find({}); // Load the data you need

    if (usertype === "user" && password === "user8050") {
        res.render("user", { seeData }); // Render the user view without changing the URL
    } else if (usertype === "admin" && password === "admin2348050") {
        res.render("index", { seeData }); // Render the admin view
    } else {
        res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log(`port listen 3000`)
})