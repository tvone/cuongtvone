import React from 'react'
import {useState,useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'

const EditProfile = ()=>{
    const {id} = useParams()
    const history = useHistory()
    const token = useSelector(state => state.tokenReducer)
    const users = useSelector(state => state.userReducer)

    const auth = useSelector(state => state.authReducer)
    const {user} = auth
     
    //Number role:
    const [number,setNumber] = useState(0)

    const [update,setUpdate] = useState([])
    // Check input:
    const [checkAdmin,setCheckAdmin] = useState(false)
    
    // Error and success:
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    
    // ForEach users:
    useEffect(()=>{
        if(users.length !== 0){
            users.forEach(user=>{
                if(user._id === id){
                    setUpdate(user)
                    setCheckAdmin(user.role === 1 ? true : false )
                }
            })
        }else{
            history.push('/profile')
        }
    },[users,id,history])
      
  

    const onUpdate = async ()=>{
        try {
            if(user._id !== update._id){
                if(number / 2 !== 0){
                const res = await axios.patch(`/user/update_role/${update._id}`,{
                    role: checkAdmin ? 1 : 0
                },{
                    headers: {Authorization : token}
                })
                setSuccess(res.data.msg)
                setNumber(0)
                window.location.reload('/profile')
            }
            }else{
                alert('Bạn đã là Admin')
            }
            
        } catch (error) {
            error.response.data.msg && setError(error.response.data.msg)
        }
    }
     
    const handleChange = () =>{
        setError('')
        setSuccess('')
        setNumber(number + 1)
        setCheckAdmin(!checkAdmin)
    }
    console.log(number)

   
    
    return (
        <div className="edit-profile">
             <div className ='container'>
           <div className="row">
               <div className="text-update">
                   <h1>Cập nhật User</h1>
                   <div style={{ color: 'white', textAlign: "center", fontSize: '17px', fontWeight: 'bold' ,backgroundColor: 'red'}}>
                  {error}
                </div>
                <div style={{ color: 'white', textAlign: 'center', fontSize: '17px', fontWeight: 'bold', backgroundColor: 'green'}}>
                  {success}
                </div>
               </div>
               <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input type="text" placeholder={update.name} name='name' disabled />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder={update.email} disabled />
              </div>
              <div className="form-check">
                  <input type="checkbox" name ='admin' checked={checkAdmin} onChange ={handleChange}/>
                  <label htmlFor="admin">Admin</label>
              </div>
              
           </div>
        
            <button onClick = {onUpdate} type="button" class="btn-update-user btn btn-success">Cập nhật</button>
              
           
        </div>
        </div>
       
    )
}

export default EditProfile