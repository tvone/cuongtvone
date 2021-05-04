import React from 'react'
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetail, fetchMovieSimilar, fetchVideoMovie } from '../../service/service'
import '../movieDetail/movie-detail.css'
import '../Movies/cardMovie.css'
import { FacebookProvider, Comments} from 'react-facebook'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser, GetInfoUser } from '../../redux/actions/authAction'

function MovieDetail() {
    const youtubeUrl = 'https://www.youtube.com/watch?v='
    const posterURL = "https://image.tmdb.org/t/p/original/"
    const { id } = useParams()

    const dispatch = useDispatch()
    const token = useSelector(state => state.tokenReducer)
    const auth = useSelector(state => state.authReducer)

    const { isLogged } = auth

    const [detail, setDetail] = useState('')
    const [video, setVideo] = useState('')
    const [similar, setSimilar] = useState([])
    //Get the loai 
    let genres = []
    genres = detail.genres

    //Get quoc gia:
    let country = []
    country = detail.production_countries

    useEffect(() => {
        const fetchApi = async () => {
            setDetail(await fetchMovieDetail(id))
            setVideo(await fetchVideoMovie(id))
            setSimilar(await fetchMovieSimilar(id))
        }
        fetchApi();
    }, [])

    //  Phim tuong tu:
    const movieSimilar = similar.slice(0, 10).map((item, index) => {
        return (
            <div className="movie-card">
                <div key={index} className="movie-header">
                    <img src={item.backPoster} />
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
                            <span>{item.date}</span>
                        </div>
                        <div className="info-section">
                            <label>Đánh giá</label>
                            <span><i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i>{item.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    //  Set Like :
    const $ = document.querySelector.bind(document)
    let style = $('.info-video-ul ul .film-like')

    const [callback,setCallback]= useState(false)
    const [cart,setCart] = useState()

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

    const onLike = async (id) => {
        if (!isLogged) {
            alert('Bạn chưa đăng nhập !')
        }
        try {
            const movieList = auth.user.cart.filter(item => item.id === id)
            setCart(movieList)
            console.log(cart)
            if (movieList.length > 0) {
                return(document.getElementById('collection-film').style.display ='block')
            }
            else {
                const res = await axios.patch('/user/add_cart', { detail }, {
                    headers: { Authorization: token }
                })
                console.log(res.data)
                setCallback(!callback)
                return(document.getElementById('success-collection').style.display ='block')
                
            }



        } catch (error) {
            return error
        }





    }
    return (
        <div className="container">
            <div className='player-wrapper'>
                <ReactPlayer
                    controls={true}
                    className='react-player'
                    url={youtubeUrl + video.key}
                    width='100%'
                    height='100%'
                />
            </div>

            <div className="row">
                <div className="movie-detail">
                    <div className="info-video-left">
                        <img src={posterURL + detail.backdrop_path} alt="" />
                    </div>
                    <div className="info-video-right">
                        <div className="info-video-name">
                            <h1>{detail.title}</h1>
                        </div>
                        <div className="info-video-ul">
                            <ul>
                                <li>Thể loại : {genres && genres.map((i, index) => {
                                    return <a key={index} className='genre-detail' href={`/${i.name}/${i.id}`}>{i.name}</a>
                                })} 
                                </li>
                                <li>Quốc gia: {country && country.map((i, index) => {
                                    return <a key={index} className='genre-detail' href=''>{i.name}</a>
                                })}
                                </li>
                                <li>Đánh giá :  {detail.vote_average} <i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i> </li>
                                <li>Năm sản xuất : {detail.release_date} </li>
                                <li onClick={() => onLike(detail.id)} className={cart ?'active-film':'film-like'}><i class="fas fa-save"></i> Lưu vào bộ sưu tập </li>

                            </ul>

                        </div>
                    </div>
                </div>
                {/* View film */}
                <div className="content-detail">
                    <h3>THÔNG TIN PHIM</h3>
                    <div className="view-detail">
                        {detail.overview}
                    </div>
                </div>
                {/* Phim tuong tu */}
                <div className="content-similar">
                    <h3>PHIM TƯƠNG TỰ</h3>
                    <div className="row">
                        {movieSimilar}
                    </div>

                </div>
            </div>
            {/* Comment */}
            <div style={{ backgroundColor: 'whitesmoke' }}>
                <FacebookProvider appId="2144527599092518">
                    <Comments href={`http://localhost:3000/movie/${id}`} num_posts="5" width="100%" />
                </FacebookProvider>
            </div>

        </div>

    )
}

export default MovieDetail