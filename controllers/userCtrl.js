const Users = require('../models/userModel')
const argon2 = require('argon2')
require('dotenv').config()
const jwt = require("jsonwebtoken");
let sendEmail = require('./sendMail');
const {google} = require('googleapis')
const {OAuth2} = google.auth
const fetch = require('node-fetch');
const { findById } = require('../models/userModel');
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)
const userCtrl = {
    register : async (req,res)=>{
        try {
            const {nameRg,emailRg,passwordRg,cf_password} = req.body;
            
            //Check body:
            if(!nameRg || !emailRg || !passwordRg)
            return res.status(400).json({msg: "Có vẻ bạn chưa nhập đầy đủ thông tin ?"})

            //Check email :
            if(!validateEmail(emailRg))
            return res.status(400).json({msg: "Email chưa chính xác"})

            //Find User:
            const user = await Users.findOne({emailRg})
            if(user)
            return res.status(400).json({msg: "Email này đã được đăng kí"})
            
            //Check password :
            if(passwordRg.length < 6)
            return res.status(400).json({msg: "Mật khẩu phải lớn hơn 6 kí tự"})

            if(passwordRg != cf_password)
            return res.status(400).json({msg: 'Mật khẩu chưa khớp nhau'})
            
            // All Good:
            const hashedPassword = await argon2.hash(passwordRg)
            
            const newUser = {
                name: nameRg,
                email: emailRg,
                password : hashedPassword
            }
            
            const activation_token = createActivationToken(newUser)

            const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`
            const txt = 'Bấm vào đây để xác minh email của bạn'
            //Node mailer:
             await sendEmail(emailRg,url,txt)



            res.json({msg: 'Đăng kí thành công. Vui lòng kiểm tra email và kích hoạt nó !'})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    activateEmail : async (req,res)=>{
        try {
        const {activation_token} = req.body

        const user = jwt.verify(activation_token,process.env.ACTIVATION_TOKEN_SECRET)

        const {name,email,password} = user
        
        const checkEmail = await Users.findOne({email})

        if(checkEmail) return res.status(400).json({msg: "Email này đã được đăng kí"})

        const newUser = new Users({
            name,email,password
        })
        await newUser.save()

        res.json({msg: "Tài khoản đã được kích hoạt"})

        console.log(user)
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
        
    },
    login : async (req,res)=>{
        try {
            const {email,password} = req.body;
            //Check login:
            if(!email || !password) return res.status(400).json({msg: "Vui lòng nhập đầy đủ thông tin"})

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "Tài khoản chưa được đăng kí"})

            const passwordValid = await argon2.verify(user.password,password)

            if(!passwordValid) return res.status(400).json({msg: "Tài khoản hoặc mật khẩu chưa chính xác"})

            const refresh_token = createRefreshToken({id: user._id})

            res.cookie('refreshtoken',refresh_token,{
                httpOnly : true,
                path : '/user/refresh_token',
                maxAge : 7 * 24 * 60 * 60 * 1000 //7d
            })


              res.json({msg: "Đăng nhập thành công"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
        


    },
    getAccessToken : async (req,res)=>{
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Bạn chưa đăng nhập, vui lòng đăng nhập"})

            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(400).json({msg: "Bạn chưa đăng nhập, vui lòng đăng nhập"})
                
                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    forgotPassword: async (req,res)=>{
        try {
            const {email} = req.body
            // Check email:
            const user = await Users.findOne({email})

            if(!user) res.status(400).json({msg: "Email này chưa được đăng kí"})

            const access_token = createAccessToken({id: user._id})

            const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`
            const txt = 'Bấm vào đây để kích hoạt mật khẩu mới'
            sendEmail(email,url,txt)


            res.json({msg: "Vui lòng kiểm tra email của bạn để kích hoạt mật khẩu mới"})
        } catch (error) {
            // res.status(500).json({msg: error.message})
        }
    },
    resetPassword: async (req,res)=>{
        try {
            const {password,cf_password} = req.body
            if(password.length < 6)
            return res.status(400).json({msg: 'Mật khẩu phải lớn hơn 6 kí tự'})

            if(password != cf_password)
            return res.status(400).json({msg: 'Mật khẩu chưa khớp nhau'})

            const hashedPassword = await argon2.hash(password)
            console.log(req.user)
            await Users.findOneAndUpdate({_id: req.user.id},{
                password : hashedPassword
            })
            res.json({msg: "Thay đổi mật khẩu thành công"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getUserInfo : async (req,res)=>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.json(user)
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getAllUsersInfo : async (req,res) =>{
         try {
             const user = await Users.find().select("-password")
             
             res.json(user)
         } catch (error) {
             res.status(500).json({msg: error.message})
         }
    },
    logout : async (req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
            return res.json({msg: "Đăng xuất"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updateUser : async (req,res)=>{
        try {
            const {name,avatar} = req.body
            
            await Users.findOneAndUpdate({_id : req.user.id},{
                name,avatar
            })
            res.json({msg: "Cập nhật thành công"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updateUsersRole : async (req,res)=>{
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id},{
                role
            })
            res.json({msg: "Cập nhật thành công"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    deleteUser : async (req,res)=>{
        try {
            await Users.findByIdAndDelete(req.params.id)
            res.json({msg: "Xóa ok"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    // ----------------Socical----------------

    // 1. GOOGLE LOGIN :
    googleLogin : async (req,res) =>{
           try {
               const {tokenId} = req.body

               const verify = await client.verifyIdToken({idToken : tokenId,audience : process.env.MAILING_SERVICE_CLIENT_ID})

               const {email,email_verified,name,picture} = verify.payload

               const password = email + process.env.GOOGLE_SECRET

               const hashedPassword = await argon2.hash(password)

               if(!email_verified)
               return res.status(400).json({msg : 'Email chưa được xác minh'})

               const user = await Users.findOne({email})
               
               if(user){
                   const verifyPassword = await argon2.verify(user.password,password)
                   
                   if(!verifyPassword) return res.status(400).json({msg : 'Thông tin tài khoản chưa chính xác'})

                  const refresh_token = createRefreshToken({id : user._id})

                  res.cookie('refreshtoken',refresh_token,{
                      httpOnly : true,
                      path : '/user/refresh_token',
                      maxAge : 7* 24 * 60 * 60 * 1000 //7d
                  })
                     res.json({msg : 'Đăng nhập thành công'})
               }else{
                  const newUser = new Users({
                      name,email,password : hashedPassword,avatar : picture
                  })
                  newUser.save()

                  const refresh_token = createRefreshToken({id : newUser._id})

                  res.cookie('refreshtoken',refresh_token,{
                      httpOnly : true,
                      path : '/user/refresh_token',
                      maxAge : 7 * 24 * 60 * 60 * 1000 //7d
                  })

                  res.json({msg : 'Đăng nhập thành công'})
               }
           } catch (error) {
               res.status(500).json({msg : error.message})
           }
    },
    facebookLogin : async (req,res) =>{
        try {
            const {accessToken,userID} = req.body

            const URL = `https://graph.facebook.com/${userID}?fields=name,email,picture&access_token=${accessToken}`
            
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})
             console.log(data)

            const {name,picture,email} = data
            

            const password =  email + process.env.FACEBOOK_SECRET

            const hashedPassword = await argon2.hash(password)
            
            const user = await Users.findOne({email})

            if(user){
               const verifyPassword = await argon2.verify(user.password,password)
               if(!verifyPassword) return res.status(400).json({msg: 'Thông tin tài khoản chưa chính xác'})

               const refresh_token = createRefreshToken({id : user._id})

                  res.cookie('refreshtoken',refresh_token,{
                      httpOnly : true,
                      path : '/user/refresh_token',
                      maxAge : 7* 24 * 60 * 60 * 1000 //7d
                  })
                     res.json({msg : 'Đăng nhập thành công'})
            }else{
                const newUser = new Users({
                    name,email,password : hashedPassword,avatar : picture.data.url
                })
                newUser.save()

                const refresh_token = createRefreshToken({id : newUser._id})

                  res.cookie('refreshtoken',refresh_token,{
                      httpOnly : true,
                      path : '/user/refresh_token',
                      maxAge : 7* 24 * 60 * 60 * 1000 //7d
                  })
                     res.json({msg : 'Đăng nhập thành công'})
            }

            
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    },
    addCart : async (req,res)=>{
       try {
           const {detail} = req.body
    
           const user = await Users.findById(req.user.id)
           if(!user) return res.status(400).json({msg : 'Bạn chưa đăng nhập'})
          
           await Users.findOneAndUpdate({_id : req.user.id},{
             $push : {cart : detail}
           })
           return res.json({msg : 'Thêm thành công'})

       } catch (error) {
            res.status(500).json({msg : error.message})
       }
    },
    deleteCart : async (req,res)=>{
        try {
            const {id} = req.body
            
            console.log(id)
            
            const user = await Users.findById(req.user.id)

            if(!user) return res.status(400).json({msg : 'Bạn chưa đăng nhập'})

            await Users.updateOne({_id : req.user.id},
                {$pull : {cart : {id : id}}
            })

            res.json({msg : 'Xóa thành công'})
        } catch (error) {
            res.status(500).json({msg : error.message})
        }
    }
}













//Check email JS : 
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//CREATE ACTIVATION TOKEN :
const createActivationToken = (payload) =>{
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET,{expiresIn : "5m"})
}
// CREATE ACCESS TOKEN :
const createAccessToken = payload =>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn : "15m"})
}
// CREATE REFRESH TOKEN :
const createRefreshToken = payload =>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn : "2d"})
}



module.exports = userCtrl