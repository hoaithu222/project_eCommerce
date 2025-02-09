const initialState={
    data:{},
    user_follower:[],
    loading:false,
    error:null,
}

const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'get_user':
            return {...state,loading:true};
        case 'fetch_user_success':
            return {...state,loading:false,data:action.payload.data,
                user_follower:action.payload.follower_shop,
            };
        case 'fetch_user_failure':
            return {...state,loading:false,error:action.error};
        case 'update_user':
            return {...state,data:{
                ...state.data,
                ...action.payload,
            }}
        case 'update_follower':
            return {
                ...state,
                user_follower:[
                    ...state.user_follower,
                    action.payload,
                ]
            }
        case 'update_unfollower':
            return {
                ...state,
                user_follower:state.user_follower.filter((item)=>item.shop_id !== action.payload)
            }
        case 'logout':
             return { ...initialState };
        default:
            return state;
    }
}

export default userReducer;