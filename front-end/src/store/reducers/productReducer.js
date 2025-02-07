const initialState = {
    data:[],
    loading:false,
    error:null,
    count:0,
};
const productReducer = (state= initialState ,action)=>{
    switch(action.type){
        case 'get_product':{
            return {
                ...state,
                loading:true,
                error:null,
            };
        }
        case 'fetch_product_success':{
            return {
                ...state,
                loading:false,
                data:action.payload.data,
                count:action.payload.count,
                error:null,
            }
        }
        case 'fetch_product_failure':{
            return {
                ...state,
                loading:false,
                error:action.error,
            }
        }
        default:
            return state; 
    }
}
export default productReducer;