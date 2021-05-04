import axios from 'axios'

export const  fetchAllUser = async (token)=>{
   const res = await axios.get('/user/all_infor',{
       headers : {Authorization: token}
   })
   return res
}

export const getAllUser = (res)=>{
   return{
       type: 'GET_ALL_USER',
       payload: res.data
        
   }
}