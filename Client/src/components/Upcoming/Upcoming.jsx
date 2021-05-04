import React from 'react'
import { useState, useEffect } from 'react'
import { fecthUpcoming } from '../../service/service'
import { Link } from 'react-router-dom';

function Upcoming() {
    const [upcoming, setUpcoming] = useState([])
    useEffect(() => {
        const fetchApiUpcoming = async () => {
            setUpcoming(await fecthUpcoming())
        }
        fetchApiUpcoming()
    }, [])
    const upcomings = upcoming.slice(0, 5).map((item, index) => {
        return (

            <div key={index} className="card movie_card">
                <img src={item.poster} className="card-img-top" alt={item.title} />
                <div className="card-body">
                    <Link to={`movie/${item.id}`}>
                        <i className="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Xem Trailer"></i>
                    </Link>
                    <h5 className="card-title">{item.title}</h5>
                    <span className="movie_info">{item.date}</span>
                    <span className="movie_info float-right"><i style={{ color: 'orange', marginRight: '5px' }} className="fas fa-star"></i>{item.rating}</span>
                </div>
            </div>



        )
    })
    return (
        <div>
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
        </div>
    )
}

export default Upcoming