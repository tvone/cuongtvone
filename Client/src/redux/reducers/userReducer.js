const users = []

const userReducer = (state = users,action)=>{
    switch(action.type){
        case 'GET_ALL_USER':
            return action.payload
     
            default: return state
    }
}

export default userReducer