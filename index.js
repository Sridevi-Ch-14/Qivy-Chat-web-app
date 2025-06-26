const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

}


//Index Route:

app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

//New Route:

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//Create route

app.post("/chats",(req,res)=>{

    let {from,to,msg} = req.body;

    //Create chat
    let newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date()
    });

    newChat.save()
    .then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    });

    
    res.redirect("/chats");
})


//Edit Route
app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);    
    res.render("edit.ejs",{chat});
})

//Update Route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {msg: newMsg}, 
        {runValidators:true , new:true},
    ); 
    res.redirect("/chats");
});


//Reply Route


app.post("/chats/:id/replies", async (req, res) => {
    const { id } = req.params;
    const { from, msg } = req.body;

    try {
        const chat = await Chat.findById(id);
        if (!chat) return res.status(404).send("Chat not found");

        chat.replies.push({
            from,
            msg,
            created_at: new Date()
        });

        await chat.save();
        res.redirect("/chats");
    } catch (err) {
        console.error("Reply error:", err);
        res.status(500).send("Failed to add reply");
    }
});


//Emojis react
app.post("/chats/:id/react", async (req, res) => {
    const { id } = req.params;
    const { emoji } = req.body;

    try {
        const chat = await Chat.findById(id);
        if (!chat) return res.status(404).send("Chat not found");

        const emojis = ['👍', '😂', '😮', '😢', '😠'];

        // Reset all emoji counts to 0
        for (let emo of emojis) {
            chat.reactions.set(emo, 0);
        }

        // Set selected emoji to 1
        chat.reactions.set(emoji, 1);

        await chat.save();
        res.redirect("/chats");
    } catch (err) {
        console.error("Reaction error:", err);
        res.status(500).send("Failed to react");
    }
});


//Destroy Route:

app.delete("/chats/:chatId/replies/:replyId", async (req, res) => {
    const { chatId, replyId } = req.params;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).send("Chat not found");
        }

        // Filter out the reply to delete
        chat.replies = chat.replies.filter(reply => reply._id.toString() !== replyId);

        await chat.save();
        res.redirect("/chats");
    } catch (err) {
        console.error("Delete reply error:", err);
        res.status(500).send("Failed to delete reply");
    }
});

app.delete("/chats/:id" , async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})


//Home page

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

app.listen(3000,()=>{
    console.log("Listening");
})