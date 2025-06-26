const mongoose = require("mongoose");
const Chat = require("./models/chat");

main().then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Qivy');

}


let allChats=[
    {
        from:"Sridevi",
        to:"Pranavi",
        msg:"Hey how are you doing",
        created_at: new Date(),
    },
    {
        from:"Sanjay",
        to:"Sanvi",
        msg:"Send me some notes",
        created_at: new Date(),
    },
    {
        from:"Vaibhav",
        to:"Varsha",
        msg:"Did you complete the task?",
        created_at: new Date(),
    },
    {
        from:"Arjun",
        to:"Preeti",
        msg:"I ll explain you bio today",
        created_at: new Date(),
    },
    {
        from:"Tarun",
        to:"Taara",
        msg:"How about a cup of coffee",
        created_at: new Date(),
    }
];

Chat.insertMany(allChats);