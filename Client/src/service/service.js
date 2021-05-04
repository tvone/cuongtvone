import axios from "axios";

const apiKey ="8bafa23e1bb6832171b76b446a963203";
const url = "https://api.themoviedb.org/3";
const nowPlayingURL = `${url}/movie/now_playing`;
const movieURL = `${url}/movie`;
const topRateURL = `${url}/movie/top_rated`;
const genreURL = `${url}/genre/movie/list`;
const moviesURL = `${url}/discover/movie`;
const personURL = `${url}/trending/person/week`;
const upComingURL =`${url}/movie/upcoming`
const searchURL = `${url}/search/movie`
const posterURL = "https://image.tmdb.org/t/p/original/"

//Xem ngay:
export const fetchMovies = async ()=>{
    try {
        const {data} = await axios.get(nowPlayingURL,{
            params: {
                api_key : apiKey,
                language : 'vi',
                page : 1,
            }
        });
        
        const getData = data['results'].map((i)=>({
            id: i['id'],
            title : i['title'],
            backPoster : posterURL +  i['backdrop_path'],
            poster : posterURL + i['poster_path'],
            popularity : i['popularity'],
            overview: i['overview'],
            rating : i['vote_average'],
        }))
        return getData



    } catch (error) {
        return error
    }
}
//The loai:
export const fetchGenre = async ()=>{
    try {
        const {data} = await axios.get(genreURL,{
            params: {
                api_key: apiKey,
                language : 'vi',
            }
        })
        const getData = data['genres'].map((i)=>({
             id: i['id'],
             genre: i['name']
        }))
        return getData;
    } catch (error) {
        return error
    }
}
//Phim chieu rap sap ra mat:
export const fecthUpcoming = async ()=>{
    try {
        const {data} = await axios.get(upComingURL,{
            params:{
                api_key: apiKey,
                language: 'vi',
                page : 1,
            }
        })
        const getData = data['results'].map((i)=>({
            id : i['id'],
            title : i['title'],
            backPoster: posterURL + i['backdrop_path'],
            poster: posterURL + i['poster_path'],
            popularity : i['popularity'],
            overview : i['overview'],
            date: i['release_date'],
            rating : i['vote_average'],
        }))
        return getData
    } catch (error) {
        return error
    }
}
// Tim phim theo the loai:

export const fetchMovieByGenre = async (genre_id)=>{
    try {
        const {data} = await axios.get(moviesURL,{
            params : {
                api_key : apiKey,
                language : 'vi',
                page : 1,
                with_genres : genre_id
            }
        })
        const getData = data['results'].map((i)=>({
            id : i['id'],
            title : i['title'],
            backPoster : posterURL + i['backdrop_path'],
            poster : posterURL + i['poster_path'],
            overview : i['overview'],
            date: i['release_date'],
            rating : i['vote_average'],


        }))
        return getData
    } catch (error) {
        return error
    }
}

// Thong tin phim:
export const fetchMovieDetail = async (id)=>{
   try {
       const {data} = await axios.get(`${movieURL}/${id}`,{
           params : {
               api_key : apiKey,
               language : 'vi'
           }
       })
       return data
   } catch (error) {
       return error
   }
}
// Play phim:
export const fetchVideoMovie = async (id)=>{
    try {
        const {data} = await axios.get(`${movieURL}/${id}/videos`,{
            params: {
                api_key : apiKey,
            }
        })
        return data['results'][0]
    } catch (error) {
        return error
    }
}
//Search Phim :

export const fecthSearchMovie = async (query) =>{
    try {
        const {data} = await axios.get(searchURL,{
            params : {
                api_key : apiKey,
                language : 'vi',
                query : query
            }
        })
        const getData = data['results'].map(i=>({
            id : i['id'],
            title : i['title'],
            backPoster : posterURL + i['backdrop_path'],
            poster : posterURL + i['poster_path'],
            date : i['release_date'],
            vote_count : i['vote_count'],
            vote_average : i['vote_average']
        }))
        return getData
    } catch (error) {
        return error
    }
}

// Phim tuong tu :

export const fetchMovieSimilar = async (id)=>{
    try {
        const {data} = await axios.get(`${movieURL}/${id}/similar`,{
            params : {
                api_key : apiKey,
                language : 'vi',
                page : 1,
            }
        })
        const getData = data['results'].map(i=>({
            id : i['id'],
            title : i['title'],
            backPoster : posterURL + i['backdrop_path'],
            poster : posterURL + i['poster_path'],
            overview : i['overview'],
            date: i['release_date'],
            rating : i['vote_average'],
        }))
        return getData
    } catch (error) {
        return error
    }
}

// Top Rate :
 export const fetchTopRate = async ()=>{
     try {
         const {data} = await axios.get(topRateURL,{
             params : {
                 api_key : apiKey,
                 language : 'vi',
                 page : 1
             }
         })
         const getData = data['results'].map(i=>({
             id : i['id'],
             title : i['title'],
             backPoster : posterURL + i['backdrop_path'],
             poster : posterURL + i['poster_path'],
             overview : i['overview'],
            date: i['release_date'],
            rating : i['vote_average'],

         }))
         return getData
     } catch (error) {
         return error
     }
     
 }

//  Phim xem nhieu:
   export const fetchMoviePopular = async ()=>{
        try {
            const {data} = await axios.get(`${movieURL}/popular`,{
                params : {
                    api_key : apiKey,
                    language : 'vi',
                    page : 1,
                }
            })
            const getData = data['results'].map(i=>({
                id : i['id'],
                title : i['title'],
                backPoster : posterURL + i['backdrop_path'],
                poster : posterURL + i['poster_path'],
                overview : i['overview'],
               date: i['release_date'],
               rating : i['vote_average'],
            }))
            return getData
        } catch (error) {
            return error
        }
   }
