import axios from 'axios';
import React from 'react';
import{useDispatch,useSelector} from 'react-redux'
import{useState,useEffect} from 'react'
import { fetchUser, GetInfoUser } from '../../redux/actions/authAction'

const Like = ()=>{
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)
    const token = useSelector(state => state.tokenReducer)
    const posterURL = "https://image.tmdb.org/t/p/original/"

    const [callback,setCallback] = useState(false)

    useEffect(()=>{
        if(token){
            const getUser = async ()=>{
                dispatch({type: "LOGIN"})
                return await fetchUser(token).then(res=>{
                  dispatch(GetInfoUser(res))
                })
            }
            getUser()
          
        }
    },[token,dispatch,callback])

    const onDelete = async (id)=>{
        try {
            const res = await axios.post('/user/delete_cart',{id},{
                headers : {Authorization : token}
            })
            setCallback(!callback)
            console.log(res.data)
        } catch (error) {
            
        }
    }
 
    let cardMovie = auth.user.cart &&  auth.user.cart.map((item,index)=>{
        return(
            <div className="movie-card">
                        <div key={index} className="movie-header">
                            <img src={posterURL + item.backdrop_path} />
                            <div className="header-icon-container header-icon">
                                <a href={`/movie/${item.id}`}>
                                    <i class="fas fa-play "></i>
                                </a>
                            </div>
                        </div>{/*movie-header*/}
                        <div className="movie-content">
                            <div className="movie-content-header">
                                <a href={`/movie/${item.id}`}>
                                    <h4 className="movie-title">{item.title}</h4>
                                </a>
                            </div>
                            <div className="movie-info">
                                <div className="info-section">
                                    <label>Phát hành</label>
                                    <span>{item.release_date}</span>
                                </div>
                                <div className="info-section">
                                    <label>Đánh giá</label>
                                    <span><i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i>{item.vote_average}</span>
                                </div>
                                <div className="info-section">
                                    <span className='film-like-list' onClick ={()=>onDelete(item.id)}>Xóa</span>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    })
    
    return(
        <div className="container">
            <div className="card-test">
                <h3>Danh sách bộ sưu tập : </h3>
                <div className="row">
                   { cardMovie && cardMovie.length !== 0 ? cardMovie : 
                   <div style={{color : 'greenyellow',margin : '0 auto',marginBottom : '200px'}}>
                       <p>Hiện chưa có bộ phim nào được thêm.</p>
                    </div>}
                </div>


            </div>


        </div>
    )
}

export default Like