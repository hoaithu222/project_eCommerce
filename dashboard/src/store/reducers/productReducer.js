const initialState = {
    data:[],
    loading:false,
    error:null,
    count:0,
}
const productReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'get_product':{
            return {
                ...state,
                loading:true,
                error:null,
            }
        }
        case 'get_product_success':{
            return {
                ...state,
                data:action.payload.data,
                count:action.payload.count,
                loading:false,
                error:null,
            }
        }
          case 'get_product_error':{
            return {
                ...state,
                loading:false,
                error:action.error,
            }
        }
        case 'update_product':
            return {
                ...state,
                data:state.data.map(product=>product.id === action.payload.id ? {...product,...action.payload}:product)
            }
        default:
            return state; 
    }
}
export default productReducer;