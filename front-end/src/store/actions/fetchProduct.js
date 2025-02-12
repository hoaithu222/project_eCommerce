import SummaryApi from "../../common/SummaryApi";

export const fetchProduct = ({_page=1,_limit=8,_sort='id',_order='asc',q='',is_active = true})=>{
    return async(dispatch)=>{
        dispatch({type:"get_product"});
        try{
            const  response = await fetch(`${SummaryApi.getProduct.url}?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}&q=${q}&${is_active}`,{
                method:SummaryApi.getProduct.method,
            })
            const result = await response.json();
             if(response.ok){
                dispatch({type:"fetch_product_success",payload:{
                    data:result.data,
                    count:result.count
                }});
            }
            else{
                throw new Error(result.message || "Failed to fetch user data");
            }
        }
        catch(error){
            dispatch({type:"fetch_product_failure",error:error.message});
        }
    }
}