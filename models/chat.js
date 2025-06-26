const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 100,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:100,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    replies: [replySchema],

    reactions: {
    type: Map,
    of: Number,
    default: {
        '👍': 0,
        '😂': 0,
        '😮': 0,
        '😢': 0,
        '😠': 0
    }
}
});

const Chat = mongoose.model("Chat",chatSchema);

module.exports=Chat;