import React from 'react'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import {GoogleLogin} from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const initialStateLogin = {
    email : '',
    password: '',
    error: '',
    success : ''
}
const initialStateRegister = {
    nameRg: '',
    emailRg : '',
    passwordRg : '',
    cf_password: '',
    error2: '',
    success2 : ''
}

function SignIn(){
    //Login :
    const dispath = useDispatch()
    
    const [user,setUser] = useState(initialStateLogin)
    
    const {email,password,error,success} = user

    const onChangeLogin = (e)=>{
        const {name,value} = e.target
        setUser({...user,[name]:value,error: '',success:''})
    }
    
    const handleSubmit = async (e)=>{
       e.preventDefault();
       try {
           const res = await axios.post('/user/login',{
               email,password
           })
           setUser({...user,error:'',success: res.data.msg})
           localStorage.setItem('firstLogin',true)
           dispath({type: "LOGIN"})
           window.location.reload()
       } catch (error) {
        error.response.data.msg && 
        setUser({...user, error: error.response.data.msg, success: ''})
       }

    }
    // Register:
    const [userRegister,setuserRegister] = useState(initialStateRegister)

    const {nameRg,emailRg,passwordRg,cf_password,error2,success2} = userRegister
    
    const onChangeRegister = (e)=>{
        const {name,value} = e.target
        setuserRegister({...userRegister,[name]:value,error2: '',success2: ''})
    }
    const handleSubmitRegister = async (e)=>{
         e.preventDefault();
         try {
             const res = await axios.post('/user/register',{
                 nameRg,emailRg,passwordRg,cf_password
             })
             setuserRegister({...userRegister,error2: '',success2: res.data.msg})
             console.log(res)
         } catch (error) {
             error.response.data.msg &&
             setuserRegister({...userRegister,error2 : error.response.data.msg,success2: ''})
         }
    }
    //Google Login :
    const responseGoogle = async (response)=>{
        console.log(response)
        try {
            const res = await axios.post('/user/google_login',{tokenId : response.tokenId})
            setUser({...user,error:'',success: res.data.msg})
            localStorage.setItem('firstLogin',true)
            dispath({type: "LOGIN"})
            
        } catch (error) {
            error.response.data.msg &&
            setUser({...user,error : error.response.data.msg,success : ''})
        }
    }
    // Facebook Login:
    const responseFacebook = async (response) => {
        try {
            const {accessToken,userID} = response

            console.log(response)

            const res = await axios.post('/user/facebook_login',{accessToken,userID})

            setUser({...user,error : '',success : res.data.msg})
            dispath({type :'LOGIN'})
            localStorage.setItem('firstLogin',true)
            
           
        } catch (error) {
            error.response.data.msg &&
            setUser({...user,error : error.response.data.msg,success : ''})
        }
      }
    return(
        <div>
            <div id='my-login' className='modal-login'>
                <div className='modal-container'>
                ​<span id="close" title="Đóng">&times;</span>
                    <div className="title-text">
                        <div className="title login">Đăng nhập</div>
                        <div className="title signup">Đăng ký</div>
                    </div>
                    
                    <div className="form-container">
                      <div className="slide-controls">
                          <input type="radio" name="slider" id="login"/>
                          <input type="radio" name="slider" id="signup"/>
                        <label htmlFor='login' className="slide login">Đăng nhập</label>
                        <label htmlFor='signup' className="slide signup">Đăng ký</label>
                        <div className="slide-tab"></div>
                      </div>
                        <div className="form-inner">
                            <form className="login" onSubmit ={handleSubmit}>
                                <div style={{color: 'red',textAlign: "center",fontSize: '14px',fontWeight: 'bold'}}>
                                  {error}
                                </div>
                               <div style={{color: 'green',textAlign: 'center',fontSize: '17px',fontWeight: 'bold'}}>
                                   {success}
                               </div>
                                <div className="field">
                                    <input onChange={onChangeLogin} name='email' type="email" placeholder='Nhập Email' required/>
                                </div>
                                <div className="field">
                                    <input onChange={onChangeLogin} name='password' type="password" placeholder='Nhập mật khẩu' required/>
                                </div>
                                <div className="pass-link"><a href="/forgot-password">Quên mật khẩu?</a></div>
                                <div className="field">
                                    <input  type="submit" value='Đăng nhập'/>
                                </div>
                                <hr/>
                                <p>Hoặc đăng nhập bằng: </p>
                                <div className="socical">
                                     <GoogleLogin
                                        clientId="120501232550-hilf9s3tdqordimoljn73iqjcg46ak29.apps.googleusercontent.com"
                                        buttonText="Đăng nhập bằng Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        />
                                        <FacebookLogin
                                        appId="467882347781033"
                                        autoLoad ={false}
                                        fields="name,email,picture"
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick}>Đăng nhập bằng Facebook</button>
                                          )}
                                        callback={responseFacebook} />
                                </div>
                                    
                                <div className="signup-link">Chưa có tài khoản ?<a> Đăng ký ngay</a></div>
                            </form>
                            <form className="signup" onSubmit={handleSubmitRegister}>
                              <div style={{color: 'red',textAlign: "center",fontSize: '17px',fontWeight: 'bold'}}>
                                  {error2}
                                </div>
                                <div style={{color: 'green',textAlign: 'center',fontSize: '17px',fontWeight: 'bold'}}>
                                   {success2}
                               </div>
                                <div className="field">
                                    <input onChange ={onChangeRegister} type="text" name='nameRg' placeholder='Nhập tên' required/>
                                </div>
                                <div className="field">
                                    <input onChange ={onChangeRegister} type="email" name='emailRg' placeholder='Nhập Email' required/>
                                </div>
                                <div className="field">
                                    <input onChange ={onChangeRegister} type="password" name ='passwordRg' placeholder='Nhập mật khẩu' required/>
                                </div>
                                <div className="field">
                                    <input onChange ={onChangeRegister} type="password" name='cf_password' placeholder='Nhập lại mật khẩu' required/>
                                </div>
                                <div className="field">
                                    <input type="submit" value='Đăng ký'/>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn