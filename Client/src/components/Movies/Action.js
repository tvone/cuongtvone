import React from 'react'
import {useState,useEffect} from 'react'
import { fetchMovieByGenre } from '../../service/service'
import {useParams} from 'react-router-dom'

const Action = ()=>{
    const [action,setAction] = useState([])
    const {genre_id} = useParams()

    useEffect(()=>{
        const fetchApi = async ()=>{
            setAction(await fetchMovieByGenre(genre_id))
        }
        fetchApi()
    },[])
    const cardMovie = action.map((item,index)=>{
        return(
            <div key={index} className="card movie_card">
                <img src={item.poster} className="card-img-top" alt={item.title} />
                <div className="card-body">
                    <a href={`/movie/${item.id}`}>
                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Xem Trailer"></i>
                    </a>
                    <h5 className="card-title">{item.title}</h5>
                    <span className="movie_info">{item.date}</span>
                    <span className="movie_info float-right"><i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i>{item.rating}</span>
                </div>
            </div>
        )
    })
    return(
        <div className="container">
           <div className="row">
               <div className="card-test">
                <h3>PHIM HÀNH ĐỘNG</h3>
                <div className="row">
                    {cardMovie}
                </div>
                
            </div>
           </div>
            
           
        </div>
    )
}

export default Action