import React from 'react'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const ActivationEmail = ()=>{
    const {activation_token} = useParams()
    console.log(activation_token)
    const [error,setError] = useState('')
    const [success,setSucces] = useState('')

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async ()=>{
                try {
                    const res = await axios.post('/user/activate',{activation_token})
                    setSucces(res.data.msg)
                    console.log(res)
                } catch (error) {
                    error.response.data.msg &&
                    setError(error.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])
    return(
        
         
         <div className="container">
             <div className="row">
                 <div className= 'activate_email'>
                  <h1>Hiện tại chưa biết viết gì nên viết tạm ở đây</h1>
                  <div className='err-email'>
                      {error}
                  </div>
                   <div className='success-email'>
                      {success} 
                   </div>
                   
                </div>
             </div>
             
             
         </div>
         
        
    )
}

export default ActivationEmail