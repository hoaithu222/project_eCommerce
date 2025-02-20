import SummaryApi from "../../common/SummaryApi";

export const fetchCart = (token)=>{
    return async (dispatch) =>{
        dispatch({type:"get_cart"});
        try{
            const response = await fetch(`${SummaryApi.getCart.url}`,{
                method:SummaryApi.getCart.method,
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            });
            const result = await response.json();
            if(response.ok){
                dispatch({
                    type:"get_cart_success",payload:{
                        data:result?.data,
                        cart_item:result?.data?.cart_items,
                        count:result?.count,
                    }
                })
            }else{
                throw new Error(result.message|| "Đã xảy ra lỗi");
            }

        }catch(error){
            dispatch({type:"get_cart_failure",error:error.message});
            console.error(error)
        }
    }
}