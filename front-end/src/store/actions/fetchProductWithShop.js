import SummaryApi from "../../common/SummaryApi";

export const fetchProductWithShop = ({_page,_limit,_sort,_order,q,shop_id})=>{
    
    return async(dispatch)=>{
        dispatch({type:"get_product_with_shop"})
        try{
            const response = await fetch(`${SummaryApi.getProductWithShop.url}/${shop_id}?_page=${_page}&_limit=${_limit}
                &_sort=${_sort}&_order=${_order}&q=${q}`,{
                    method:SummaryApi.getProductWithShop.method,
                });
            const result = await response.json();
           if(result.success){
             dispatch({type:"get_product_with_shop_success",payload:{
                data:result.data,
                count:result.count,
            }},);
           }
        } catch(error){
            dispatch({type:"get_product_with_shop_error",error:error.message})
        }
    }

}