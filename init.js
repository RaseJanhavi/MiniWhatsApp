const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection Successfull!!");
})
.catch((err)=>{
    console.log(err);
});
async  function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp")
    }


  


let allChats=[{
    from:"Neha",
    to:"Priya",
    msg:"Send me notes ",
    created_at:new Date()
},
{
    from:"Anushree",
    to:"Janhavi",
    msg:"Hello explain me this concept",
    created_at:new Date()
},
{
    from:"Laukik",
    to:"Riya",
    msg:"Hello",
    created_at:new Date()
},
{
    from:"Tony",
    to:"Peter",
    msg:"Love you 3000",
    created_at:new Date()
},
{
    from:"Anita",
    to:"Ramesh",
    msg:"hi",
    created_at:new Date()
}];

Chat.insertMany(allChats);

