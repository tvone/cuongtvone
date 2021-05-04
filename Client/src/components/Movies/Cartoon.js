import React from 'react'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router'
import { fetchMovieByGenre } from '../../service/service'


const Cartoon = () => {
    const [cartoon,setcarToon] = useState([])
    
    const {genre_id} = useParams()
    useEffect(()=>{
        const fetchApi = async ()=>{
             setcarToon(await fetchMovieByGenre(genre_id))
        }
        fetchApi();
    },[])
   
    const cardMovie = cartoon.map((item,index)=>{
        return(
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
    return (
        <div className="container">
            <div className="card-test">
                <h3>PHIM HOẠT HÌNH</h3>
                <div className="row">
                    {cardMovie}
                </div>


            </div>


        </div>

    )
}

export default Cartoon