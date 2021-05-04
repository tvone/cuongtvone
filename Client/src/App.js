import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Home from './components/Home/Home';
import MovieDetail from './components/movieDetail/MovieDetail';
import Header from './components/Header/Header';
import SignIn from './components/Register/SignIn';
import ActivationEmail from './components/Register/ActivationEmail';
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios'
import {fetchUser,GetInfoUser} from './redux/actions/authAction'
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import {fetchAllUser,getAllUser} from './redux/actions/userAction'
import Action from './components/Movies/Action';
import Cartoon from './components/Movies/Cartoon';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import Like from './components/Like/Like';
import CollectionFilm from './components/NotFound/CollectionFilm';
import SuccessCollection from './components/NotFound/SuccessCollection';
import Fiction from './components/Movies/Fiction';
import Science from './components/Movies/Science';
import Aventure from './components/Movies/Adventure'
import Funny from './components/Movies/Funny'
import Thriller from './components/Movies/Thriller'
import Documentary from './components/Movies/Documentary'
import Drama from './components/Movies/Drama'
import Horror from './components/Movies/Horror'
import Family from './components/Movies/Family'
import History from './components/Movies/History'
import Provocative from './components/Movies/Provocative'
import Privary from './components/Privacy/Privacy';

function App() {
   const dispatch = useDispatch()
   const token = useSelector(state => state.tokenReducer)
   const auth = useSelector(state => state.authReducer)

   const {isAdmin} = auth
//Get Token: 
   useEffect( ()=>{
     const firstLogin = localStorage.getItem('firstLogin')
     if(firstLogin) {
      const getToken = async ()=>{
         const res = await axios.post('/user/refresh_token',null)

         dispatch({type: "GET_TOKEN",payload: res.data.access_token})
      }
      getToken()
     }
   },[auth.isLogged,dispatch])
    
   
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
   },[token,dispatch])

   useEffect(()=>{
    if(isAdmin){
      const getInfoUser = async ()=>{
          await fetchAllUser(token).then(res=>{
            dispatch(getAllUser(res))
            
          })
      }
      getInfoUser()
    }
  },[isAdmin,token,dispatch])
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route exact path ='/' component={Home}/>
          <Route exact path ='/Phim Hành Động/:genre_id' component ={Action} />
          <Route exact path ='/Phim Hoạt Hình/:genre_id' component = {Cartoon}/>
          <Route exact path ='/Phim Giả Tượng/:genre_id' component = {Fiction}/>
          <Route exact path ='/Phim Khoa Học Viễn Tưởng/:genre_id' component = {Science}/>
          <Route exact path ='/Phim Phiêu Lưu/:genre_id' component = {Aventure}/>
          <Route exact path ='/Phim Hài/:genre_id' component = {Funny}/>
          <Route exact path ='/Phim Hình Sự/:genre_id' component = {Thriller}/>
          <Route exact path ='/Phim Tài Liệu/:genre_id' component = {Documentary}/>
          <Route exact path ='/Phim Chính Kịch/:genre_id' component = {Drama}/>
          <Route exact path ='/Phim Kinh Dị/:genre_id' component = {Horror}/>
          <Route exact path ='/Phim Gia Đình/:genre_id' component = {Family}/>
          <Route exact path ='/Phim Lịch Sử/:genre_id' component = {History}/>
          <Route exact path ='/Phim Gây Cấn/:genre_id' component = {Provocative}/>
          <Route exact path ='/phim-yeu-thich' component ={Like}/>
          <Route exact path='/movie/:id' component={MovieDetail}/>
          <Route exact path ='/user/activate/:activation_token' component={ActivationEmail}></Route>
          <Route exact path ='/forgot-password' component={ForgotPassword} />
          <Route exact path='/user/reset/:token_reset' component={ResetPassword}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path ='/update/:id' component ={EditProfile}/>
          <Route exact path ='/privacy' component ={Privary}/>
          <Route exact path ='/search/movie/:query' component={Search} />
        </Switch>
        <SuccessCollection/>
        <CollectionFilm/>
        <SignIn/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
