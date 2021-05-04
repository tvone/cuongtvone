import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUser, getAllUser } from '../../redux/actions/userAction'
import { Link } from 'react-router-dom';

const initialState = {
  name: '',
  password: '',
  cf_password: '',
  error: '',
  success: ''
}

const Profile = () => {
   const dispatch = useDispatch()
  const [data, setData] = useState(initialState)

  const [loading,setLoading] = useState(false)

  const users = useSelector(state => state.userReducer)

  
  const [avatar,setAvatar] = useState(false)
  const { name, password, cf_password, error, success } = data
  const auth = useSelector(state => state.authReducer)

  const { user, isAdmin, isLogged } = auth

  const token = useSelector(state => state.tokenReducer)

  const handleInput = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value, error: '', success: '' })
  }

  const onUpdateInfo = async () => {
    try {
      const res = await axios.patch('/user/update', { name: name ? name : user.name,
        avatar : avatar ? avatar : user.avatar
      }, 
        {
        headers: { Authorization: token }

      })
      setData({ ...data, error: '', success: res.data.msg })
    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, error: error.response.data.msg, success: '' })
    }
  }


  const onUpdatePassword = async () => {
    try {
      const res = await axios.post('/user/reset', { password, cf_password }, {
        headers: { Authorization: token }
      })
      setData({ ...data, error: '', success: res.data.msg })
    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, error: error.response.data.msg, success: '' })
    }
  }

  const onUpdate = () => {
    if (name || avatar) return onUpdateInfo()
    if (password) return onUpdatePassword()
  }

  const ChangeAvatar = async (e) =>{
     e.preventDefault();
     try {
       const file = e.target.files[0]
       console.log(file)
       setLoading(true)
       let formData = new FormData()
       formData.append('file',file)
       const res = await axios.post('/api/upload_avatar',formData,{
         headers : {'content-type' : 'mutipart/form-data', Authorization : token,}})
       setLoading(false) 
       setData({...data,error :'',success : ''})           
       setAvatar(res.data.url)
     } catch (error) {
       error.response.data.msg &&
        setData({...data,error : error.response.data.msg,success : ''})
     }
  }

  const [callback, setCallback] = useState(false)
  useEffect(()=>{
    if(isAdmin){
      const getInfoUser = async ()=>{
          await fetchAllUser(token).then(res=>{
            dispatch(getAllUser(res))
            
          })
      }
      getInfoUser()
    }
  },[isAdmin,token,dispatch,callback])
  
  const onDeleteUser = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm(`Bạn có muốn xóa người dùng có id : ${id} ?`)) {
          const res = await axios.delete(`/user/delete/${id}`, {
            headers: { Authorization: token }
          })
          setCallback(!callback)
        }


      }

    } catch (error) {
      error.response.data.msg &&
        setData({ ...data, error: error.response.data.msg, success: '' })
    }
  }
  return (
    <div>
      <div style={{marginBottom : '500px'}} className="profile">
        <div className="container">
          <div className="row">
            <div id="particles-js" className="col-left">
              <div className="text-profile">
                {isAdmin ? <h1 style={{ color: 'skyblue' }}>Admin (~.~)</h1> : <h1>Thành viên</h1>}
                  <p style={{position :'absolute',color: 'greenyellow',marginLeft : '-50px'}}>{loading ? 'Loading...': ''}</p>
              </div>
              
              <div className='img-avatar'>
                <img  src={avatar ? avatar : user.avatar} alt={user.name} />
                
                
                <span class='test12'>
                  <input onChange ={ChangeAvatar} id='file' type="file" />
                </span>
                
             
                <h2>{user.name}</h2>
                <div style={{ color: 'red', textAlign: "center", fontSize: '17px', fontWeight: 'bold' }}>
                  {error}
                </div>
                <div style={{ color: 'green', textAlign: 'center', fontSize: '17px', fontWeight: 'bold' }}>
                  {success}
                </div>
              </div>
              <div className='text-name'>

              </div>
              <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input onChange={handleInput} type="text" placeholder='Tên' name='name' required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" disabled placeholder={user.email} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input onChange={handleInput} type="password" placeholder='Mật khẩu' name='password' required />
              </div>
              <div className="form-group">
                <label htmlFor="cf_password">Nhập lại mật khẩu</label>
                <input onChange={handleInput} type="password" placeholder='Nhập lại mật khẩu' name='cf_password' required />
              </div>

              <button onClick={onUpdate} type="button" className="btn-profile btn btn-info">Cập nhật</button>

            </div>
            {/* TABLE USER */}

            {isAdmin ? <table id='table_profile' className="table-sm">

              <thead>
                <tr>
                  <th>Id</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Chức vụ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody >
                {users.map(user => {
                  return (
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      {user.role === 1 ? <td>
                        <span className="badge badge-danger">admin</span>
                      </td> : <td>
                        <span className="badge badge-info">member</span>
                      </td>}
                      <td>
                        <ul className='edit-user'>
                          <Link to={`update/${user._id}`}>
                            <li><i className="far fa-edit"></i></li>
                          </Link>

                          <li onClick={() => onDeleteUser(user._id)}><i className="far fa-trash-alt"></i></li>
                        </ul>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </table> : 
            
            <table id='table_profile' className="table-sm">

              <thead>
                <tr>
                  <th>Id</th>
                  <th>Tên Phim</th>
                  <th>Đánh giá</th>
                  <th>Lượt xem</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody >

                <tr>
                  <td>1</td>
                  <td>Commingson...</td>
                  <td>Commingson...</td>
                  <td>
                  Commingson...
                  </td>
                  <td>
                   Admin : cuongtvone
                 </td>
                </tr>



              </tbody>
            </table>

            }



          </div>
        </div>
      </div>


    </div>
  )
}
export default Profile