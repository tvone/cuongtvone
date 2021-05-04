import React from 'react'
import {Link,useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { fecthSearchMovie } from '../../service/service'
const Search = ()=>{
    const [search,setSearch] = useState([])
    const {query} = useParams()

    useEffect(()=>{
         const fetchApi = async ()=>{
             setSearch(await fecthSearchMovie(query))
         }
         fetchApi();
    },[])
    
    const cardMovie = search.map((item,index)=>{
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
                                    <span><i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    })
    return(
        <div className="container">
            <div className="row">
                <div className="card-test">
                <h3>KẾT QUẢ TÌM KIẾM : {query}</h3>
                <div className="row">
                    {cardMovie}
                </div>
            </div>
            


            </div>


        </div>
    )
}


export default Search