import React from 'react';
import logo from "../Header/logo.png"
import userImg from "../Header/user.png"
import {useSelector} from 'react-redux'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header (){
    
    // State authReducer:
    const auth = useSelector(state=> state.authReducer)
    //Value Search: 
    const [search,setSearch] = useState('')
   
    
    const {user,isLogged} = auth

    console.log(user)
   
    const handleLogout = async ()=>{
       await axios.get('user/logout')
       localStorage.removeItem('firstLogin')
       window.location.href='/'
    }
    const userLogin = ()=>{
        return(
            <div>
                
                <div className='user_login'>
                  <a className='user_img'>
                      <img src={user.avatar} style={{marginRight: '10px',}} alt="sign in"/>{user.name} <i className="fas fa-caret-down"></i>
                  </a>
                  <ul>
                      <li><Link to ='/profile'>Thông tin cá nhân</Link></li>
                      <li><a href='/phim-yeu-thich'>Bộ sưu tập</a></li>
                      <li><Link onClick={handleLogout} to ='/logout'>Đăng xuất</Link></li>
                      
                  </ul>
              </div>      
            </div>
               
            
        )
    }
    
    return(
        <div id='header'>
           <div className="container">
               <div className="row row-content">
                        <Link to ='/'>
                        <img style={{width: '150px',float:"left"}} className='img-logo'alt='logo-film' src={logo}/>
                        </Link>
                        
               <div className='tab-phim'>
                   <span>
                       <Link className='a active' to='/'>PHIM
                       <div className='sub-menu'>
                           <ul>
                               <li><a href="#">Phim mới</a></li>
                               <li><a href="#">Xem nhiều</a></li>
                               <li><a href="#">Phim lẻ</a></li>
                               <li><a href="#">Phim bộ</a></li>
                               <li><a href="#">Phim chiếu rạp</a></li>
                               <li>
                                   <a href="/the-loai" >Thể loại</a>
                                   <i className="arrow-right fas fa-chevron-right"></i>
                                       <ul className='sub-menu2'>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                       </ul>
                                   
                                </li>
                               <li>
                                   <a href="/quoc-gia">Quốc gia</a>
                                   <i className="arrow-right fas fa-chevron-right"></i>
                                   <ul className='sub-menu2'>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           <li><a href="#">K63MMT</a></li>
                                           
                                   </ul>
                                </li>
                           </ul>
                       </div>
                       </Link>
                       
                       <Link className ='a' to='#'>NHẠC</Link>
                   </span>
                   
               </div>
               {/* defaultValue="Designer By K63MMT" */}
               <p className='search'>
                   <input onChange ={(e)=> setSearch(e.target.value)} className='search-input' placeholder ='Tìm kiếm phim...' type="text" />   
                   <a href={`/search/movie/${search}`}> 
                   <button  className='search-button'><i className="fas fa-search"></i></button>
                   </a>
                   
               </p>
               {isLogged ? userLogin() : <p id='login-btn'>
                   <a id='signin' style={{color: '#ffffff'}}>
                       <img src={userImg} style={{marginRight: '10px',}} alt="sign in"/>
                       Đăng nhập
                   </a>
               </p>}
               
               
               </div>
            
           </div>
           
        </div>
    )
}

export default Header