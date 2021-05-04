import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useParams} from 'react-router-dom'

const initialState = {
    password : '',
    cf_password : '',
    error : '',
    success : ''
}

const ResetPassword = ()=>{
    const {token_reset} = useParams()
    const [data,setData] = useState(initialState)
    
    const {password,cf_password,error,success} = data
    const onChangeInput = (e) =>{
        const {name,value} = e.target;
        setData({...data,[name]:value,error: '',success : ''})
    }
    
   const resetPassword = async ()=>{
       try {
           const res = await axios.post('/user/reset',{password,cf_password},{
               headers: {Authorization: token_reset}
           })
           setData({...data,error: '',success: res.data.msg})
       } catch (error) {
           error.response.data.msg &&
           setData({...data,error: error.response.data.msg,success : ''})
       }
   }
    return(
        <div className="forgot_password">
            <div className="container">
                <div className="form-forgot">
                    <h1>Thay đổi mật khẩu</h1>
                    <div style={{ color: 'red', textAlign: "center", fontSize: '17px', fontWeight: 'bold' }}>
                        {error}
                    </div>
                    <div style={{ color: 'green', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                        {success}
                    </div>
                    <p style={{ fontSize: '20px', marginTop: '10px' }}>Nhập mật khẩu mới:</p>
                    <div className="input-forgot">
                        <input onChange ={onChangeInput}  name='password' type="password" placeholder="Nhập password" required/>
                    </div>
                    <div className="input-forgot">
                        <input onChange ={onChangeInput} name='cf_password' type="password" placeholder="Nhập lại password" required/>
                    </div>

                    <button onClick ={resetPassword}  type="button" class=" btn-forgot btn btn-success">Khôi phục mật khẩu</button>


                </div>
            </div>
        </div>
    )
}
export default ResetPassword