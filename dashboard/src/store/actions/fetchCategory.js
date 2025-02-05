import SummaryApi from "../../common/SummaryApi";

export const fetchCategory =({_page,_limit, _sort,
        _order,
        q})=>{
    return async(dispatch) =>{
        dispatch({type:"get_category"});
        try{
            const response = await fetch( `${SummaryApi.getCategory.url}?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}&q=${q}`,{
                method:SummaryApi.getCategory.method,
            });
            const result = await response.json();
            console.log(result);
            if(response.ok){
                dispatch({type:"fetch_category_success",payload:{
                    data:result.data,
                    count:result.count
                }});
            }
            else{
                throw new Error(result.message || "Failed to fetch user data");
            }
        }catch(error){
            dispatch({type:"fetch_category_failure",error:error.message});
        }
    }
}