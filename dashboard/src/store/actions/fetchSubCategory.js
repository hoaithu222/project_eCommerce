import SummaryApi from "../../common/SummaryApi";

export const fetchSubCategory =({_page,_limit, _sort,
        _order,
        q})=>{
    return async(dispatch) =>{
        dispatch({type:"get_sub_category"});
        try{
            const response = await fetch( `${SummaryApi.getSubCategory.url}?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}&q=${q}`,{
                method:SummaryApi.getSubCategory.method,
            });
            const result = await response.json();

            if(response.ok){
                dispatch({type:"fetch_sub_category_success",payload:{
                    data:result.data,
                    count:result.count
                }});
            }
            else{
                throw new Error(result.message || "Failed to fetch user data");
            }
        }catch(error){
            dispatch({type:"fetch_sub_category_failure",error:error.message});
        }
    }
}