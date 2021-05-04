import axios from 'axios'
import ACTIONS from './index'

export const dispathLogin = ()=>{
    return {
        type : ACTIONS.LOGIN
    }
}

export const fetchUser = async (token)=>{
    const res = await axios.get('/user/infor',{
        headers : {Authorization : token}
    })
    return res
}

export const GetInfoUser = (res)=>{
    return{
        type: "GET_INFO_USER",
        payload: {
            user : res.data,
            isAdmin : res.data.role === 1 ? true : false
        }
    }
}