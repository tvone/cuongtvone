import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const initialState = {
        email : '',
        error : '',
        success : ''
}
const ForgotPassword = () => {
    
    const [email_user, setEmail] = useState(initialState)
    
    const {email,error,success} = email_user
    const onChangeEmail = (e) => {
        const { name, value } = e.target
        setEmail({...email_user,[name]: value ,error : '', success : ''})
    }

    const ForgotPassword = async () => {
        try {
            const res = await axios.post('/user/forgot',{email})
            return setEmail({...email_user,error : '',success: res.data.msg})
        } catch (error) {
            error.response.data.msg &&
            setEmail({...email_user,error : error.response.data.msg,success : ''})
        }

    }
    return (
        <div className="forgot_password">
            <div className="container">
                <div className="form-forgot">
                    <h1>Quên mật khẩu ?</h1>
                    <div style={{ color: 'red', textAlign: "center", fontSize: '17px', fontWeight: 'bold' }}>
                        {error}
                    </div>
                    <div style={{ color: 'green', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                        {success}
                    </div>
                    <p style={{ fontSize: '20px', marginTop: '10px' }}>Nhập email của bạn bên dưới để lấy lại mật khẩu :</p>
                    <div className="input-forgot">
                        <input onChange={onChangeEmail} name='email' type="email" placeholder="Nhập email" required/>
                    </div>

                    <button onClick={ForgotPassword} type="button" class=" btn-forgot btn btn-success">Xác minh Email</button>


                </div>
            </div>
        </div>
    )
}
export default ForgotPassword