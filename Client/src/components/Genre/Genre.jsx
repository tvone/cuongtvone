import React from 'react'
import {useState,useEffect} from 'react'
import { fetchGenre } from '../../service/service'
import img from '../Genre/film.jpg'

function Genre (){
    const[genre,setGenre] = useState([])
    useEffect(()=>{
        const fetchApiGenre = async ()=>{
            setGenre( await fetchGenre())
        }
        fetchApiGenre()
    },[])
    const genres = genre.slice(0,10).map((item,index)=>{
        return(
          <div key={index} className="swiper-slide">
                    <img src={img} alt=""/>
                    <p className='text'>{item.genre}</p>
            </div>
        )
    })
    return(
<div>
        <div className="container">
        <h3 className='phim-h3'>
          <a style={{textDecoration:'none'}} href="#">Thể loại
            <span></span>
          </a>
        </h3>
   
        </div>
        
                 <div className="netflix">
                 <div className="swiper-container">
                  <div className="swiper-wrapper">
                     
                     {genres}

                
                   </div>
                   <div className="swiper-button-next swiper-button-white"></div>
                   <div className="swiper-button-prev swiper-button-white"></div>
                  </div>
             
             
                 </div>
      

</div>
        
    )
}

export default Genre