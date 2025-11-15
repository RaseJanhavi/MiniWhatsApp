const express=require("express");
const app=express();
const mongoose=require ("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");
const ExpressError=require("./ExpressError");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:"true"}))
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("Connection succeessFull!");
})
.catch(err=>console.log(err))
async  function main(){
await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp")
}
  //Index Route
  app.get("/chats",async(req,res)=>{
    let chats= await Chat.find();//asyncro function which is used to get data from database//returns promise
    console.log(chats);
    res.render("index.ejs",{chats});
})
//New Route
app.get("/chats/new",(req,res)=>{
    // throw new ExpressError(404,"Page not found!!");
    res.render("new.ejs")
})


//Create Route
try{

app.post("/chats",(req,res)=>{
    let{from,to,msg}=req.body;
    let newChat=new Chat({
        from :from,
        to:to,
        msg :msg,
        created_at:new Date()

    });

   newChat
   .save()
   .then(res=>{
    console.log("chat was saved");
   }).catch(err=>{
    console.log(err)
   });
   
    res.redirect("/chats");
     });
   }catch(err){
    next(err);
     } 

//for async error handling class
//NEW->Show Route 
app.get("/chats/:id",async(req,res,next)=>{
    let{id}=req.params;
    let chat =await Chat.findById(id);
    if(!chat){
        throw next(new ExpressError(404,"Chat not Found!!"));
    }
    res.render("edit.ejs",{chat});

})

//Edit Route
app.get("/chats/:id/edit",async(req,res)=>{
  let{id}=req.params;
  let chat= await Chat.findById(id);
  res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg:newMsg}=req.body;
    let updatedChat= await Chat.findByIdAndUpdate( 
        id,
        {msg:newMsg},
        {runValidators:true, new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");

});

// Destroy Route

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})


app.get("/",(req,res)=>{
    res.send(" Root Working")
})
//Error handling middleware

app.use((err,req,res,next)=>{
    let {status=500,message="Some error"}=err;
    res.status(status).send(message);

});


app.listen(3030,()=>{
    console.log("Listening to port 8080");
})