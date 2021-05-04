import React from 'react'
import { useState, useEffect } from 'react'
import { fetchMovies, fecthUpcoming, fetchGenre,fetchTopRate ,fetchMoviePopular} from '../../service/service'
import RBCarousel from 'react-bootstrap-carousel'
import img from '../Genre/film.jpg'
import Swiper from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import { Link } from 'react-router-dom'
import 'swiper/swiper-bundle.css';
// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);


function Home() {


 useEffect(() => {
        const fetchApi = async () => {
            setnowPlaying(await fetchMovies()) //Now playing
            setUpcoming(await fecthUpcoming()) //Up coming  
        }
        fetchApi()
    }, [])

    //Now playing:
    const [nowPlaying, setnowPlaying] = useState([])
    
    const movies = nowPlaying.map((item, index) => {
        return (
            <div style={{ height: "90vh", width: "100%" }} key={index}>
                <div className="carousel-center">
                    <img style={{ height: 700, width: "100vw" }} src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-center">
                    <a href={`/movie/${item.id}`}>
                        <i className="far fa-play-circle"
                            style={{ fontSize: 95, color: "#cbd930" }}></i>
                    </a>

                </div>
                <div
                    className="carousel-caption"
                    style={{ textAlign: "center", fontSize: 35 }}>
                    {item.title}
                </div>
            </div>
        );
    });
    //Up comming:
    const [upcoming, setUpcoming] = useState([])

    const upcomings = upcoming.slice(0, 5).map((item, index) => {
        return (

            <div key={index} className="card movie_card">

                <img src={item.poster} className="card-img-top" alt={item.title} />
                <div className="card-body">
                    <a href={`movie/${item.id}`}>
                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Xem Trailer"></i>
                    </a>
                    <h5 className="card-title">{item.title}</h5>
                    <span className="movie_info">{item.date}</span>
                    <span className="movie_info float-right"><i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i>{item.rating}</span>
                </div>
            </div>
        )
    })
    // ---------------------Genre----------------------
    useEffect(()=>{
        const fetchApi = async ()=>{
            setGenre( await fetchGenre ())
        }
        fetchApi();
    },[])
    const [genre, setGenre] = useState([])
   
    const genres = genre.slice(0, 10).map((item, index) => {
        return (
            <div key={index} className="swiper-slide">
                    <a href={`${item.genre}/${item.id}`}>
                        <img src={img} alt={item.title} />
                        
                    </a><p className='text'>{item.genre}</p>
                    
            </div>
        )
    })

// Swiper:
const swiper = new Swiper('.swiper-container', {
   slidesPerView: 5,
   spaceBetween: 10,
   slidesPerGroup: 4,
   // init: false,
   pagination: {
     el: '.swiper-pagination',
     clickable: true,
   },
   navigation: {
     hideOnClick : true,
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
 });


//----------------------------------------  Top Rate ------------------------------
   useEffect(()=>{
        const fetchApi = async ()=>{
           setToprate( await fetchTopRate())
        }
        fetchApi();
   },[])
    const [toprate,setToprate] = useState([])

    const movieTopRate = toprate.map((item,index)=>{
        return(
            <div key={index} className="swiper-slide">
            <a href={`/movie/${item.id}`}>
                <img src={item.poster} alt={item.title} />
            </a>
            
    </div>
        )
    })
// -------------------------------Phim Popular ---------------------------
const [popular,setPopular] = useState([])
useEffect(()=>{
    const fetchApi = async ()=>{
        setPopular(await fetchMoviePopular())
    }
    fetchApi();
},[])
  const moviePopular = popular.map((item,index)=>{
       return(
               <div key={index} className="swiper-slide">
            <a href={`/movie/${item.id}`}>
                <img src={item.poster} alt={item.title} />
            </a>
            
    </div>
       )
  })
    return (
        <div>
            {/* Slide show Film */}
            <RBCarousel autoplay={true} pauseOnVisibility={true} version={4} slidesshowSpeed={7000}>
                {movies}
            </RBCarousel>
            {/* Up coming */}
            <div className="box-film">
                <div className="container">
                    {/* Title: Phim chieu rap */}
                    <h3 className='phim-h3'>
                        <a style={{ textDecoration: 'none' }} href="#">PHIM CHIẾU RẠP
                        <span></span>
                        </a>
                    </h3>
                    {/* Next page */}
                    <div className="row">
                        <div className="col">
                            <div className="next-page">
                                <i className="fas fa-arrow-circle-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {upcomings}
                    </div>
                </div>
            </div>
            {/* -----------------Genre------------------- */}
            <div className="container">
                <h3 className='phim-h3'>
                    <a style={{ textDecoration: 'none' }} href="#">Thể loại
                        <span></span>
                    </a>
                </h3>
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
            
           {/*----------------- Top Rate ------------------ */}
            <div className="container">
                <h3 className='phim-h3'>
                    <a style={{ textDecoration: 'none' }} href="#">Top Phim
                        <span></span>
                    </a>
                </h3>
                <div className="netflix">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {movieTopRate}
                        </div>
                   
                        <div className="swiper-button-next swiper-button-white"></div>
                        <div className="swiper-button-prev swiper-button-white"></div>
                    </div>
                
            </div>
              
            </div>
           {/*----------------- Top popular ------------------ */}
            <div className="container">
                <h3 className='phim-h3'>
                    <a style={{ textDecoration: 'none' }} href="#">Phim xem nhiều
                        <span></span>
                    </a>
                </h3>
                <div className="netflix">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {moviePopular}
                        </div>
                   
                        <div className="swiper-button-next swiper-button-white"></div>
                        <div className="swiper-button-prev swiper-button-white"></div>
                    </div>
                
            </div>
              
            </div>
            
            

    </div>
    )
}

export default Home;