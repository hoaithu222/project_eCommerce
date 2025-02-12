import SummaryApi from "../../common/SummaryApi";

export const fetchAllProduct = ({_page =1,_limit = 8,_sort = 'id',_order = 'asc',q = '',shop_id = '',is_active = true})=>{
    
    return async(dispatch)=>{
        dispatch({type:"get_product"})
        try{
            const response = await fetch(`${SummaryApi.getProduct.url}?_page=${_page}&_limit=${_limit}
                &_sort=${_sort}&_order=${_order}&q=${q}&shop_id=${shop_id}`,{
                    method:SummaryApi.getProduct.method,
                });
            const result = await response.json();


           if(result.success){
             dispatch({type:"get_product_success",payload:{
                data:result.data,
                count:result.count,
            }},);
           }

        } catch(error){
            dispatch({type:"get_product_error",error:error.message})
        }
    }

}