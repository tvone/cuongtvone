const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    try {
        const token = req.header("Authorization")

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg: "Thông tin xác thực chưa đúng"})

            req.user = user

            next()
        })
    } catch (error) {
        
    }
    

}

module.exports = verifyToken