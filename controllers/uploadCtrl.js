const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
})
const removeTmp = (path)=>{
    fs.unlink(path,err=>{
        if(err) throw err
    })
}
const uploadCtrl = {
    uploadAvatar : (req,res) =>{
     try {
         const file = req.files.file;

         cloudinary.uploader.upload(file.tempFilePath,{
             folder : "Avatar",width : 150, height: 150, crop: 'fill'
         }, async (err,response)=>{
             if(err) throw err
             removeTmp(file.tempFilePath)

             console.log({response})

             res.json({url : response.secure_url})
         })

        
     } catch (error) {
         
     }
     
    }
    
}

module.exports = uploadCtrl