const initialState={
    data:{},
    products:[],
    count:0,
    loading:false,
    error:null,

}

const shopReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'get_shop':
            return {...state,data:action.payload};
        case 'update_shop':
            return {...state,data:{
                ...state.data,
                ...action.payload,
            }}
        case 'get_product_with_shop':
            return {
                ...state,
                loading:true,
                error:null,
            }
        case 'get_product_with_shop_success':
            return {
                ...state,
                loading:false,
                error:null,
                products:action.payload.data,
                count:action.payload.count
                
            }
        case 'get_product_with_shop_error':
            return {
                ...state,
                loading:false,
                error:action.error,
            
            }
        case 'add_product':
            return {
                ...state,
                products:[
                    ...state.products,action.payload,
                ]
            }
         case 'update_product':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? { ...product, ...action.payload } : product
                )
            };

        case 'remove_product':
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            };

        default:
            return state;
    }
}

export default shopReducer;