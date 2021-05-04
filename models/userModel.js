const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    name: {
        type: String,
        required: ["true","Vui long nhap ten"],
        trim : true
    },
    email : {
        type: String,
        required: ["true","Vui long nhap email"],
        trim : true,
        unique : true
    },
    password : {
        type: String,
        require : ["true","Vui long nhap password"],
        trim : true
    },
    role : {
        type : Number,
        default : 0
    },
    avatar : {
        type : String,
        default: "https://static.yeah1.com/uploads/editors/27/2020/03/21/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg"
    },
    cart : {
        type : Array,
        default : []
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Users",userSchema)