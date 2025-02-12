const initialState = {
    data:{},
    loading:false,
    error:null,
    count:0,
}
const cartReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'get_cart':{
            return {
                ...state,
                loading:true,
                error:false,
            }
        }
        case 'get_cart_success':{
            return {
                ...state,
                loading:false,
                data:action.payload.data,
                count:action.payload.count,
            }
        }
        case 'get_cart_failure':{
              return {
                ...state,
              loading:false,
              error:action.error,
              }
        }
        case 'add_cart':{
            return {
                ...state,
                count:state.count +1,
            }
        }
        case 'update_cart':{
            return {
                ...state,
            }
        }
        default:{
            return state;
        }
    }
}
export default cartReducer;