const initialState={
    data:{},
    loading:false,
    error:null,
}

const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'get_user':
            return {...state,loading:true};
        case 'fetch_data_success':
            return {...state,loading:false,data:action.payload};
        case 'fetch_data_failure':
            return {...state,loading:false,error:action.error};
        case 'update_user':
            return {...state,data:{
                ...state.data,
                ...action.payload,
            }}
        case 'logout':
            return {...state,data:{}};
        default:
            return state;
    }
}

export default userReducer;