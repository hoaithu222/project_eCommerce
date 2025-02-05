import SummaryApi from "../../common/SummaryApi";

export const fetchAttribute =({_page,_limit, _sort,
        _order,
        q})=>{
    return async(dispatch) =>{
        dispatch({type:"get_attributes"});
        try{
            const response = await fetch( `${SummaryApi.getAttributes.url}?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}&q=${q}`,{
                method:SummaryApi.getAttributes.method,
            });
            const result = await response.json();
            console.log(result);
            if(response.ok){
                dispatch({type:"fetch_attributes_success",payload:{
                    data:result.data,
                    count:result.count
                }});
            }
            else{
                throw new Error(result.message || "Failed to fetch user data");
            }
        }catch(error){
            dispatch({type:"fetch_attributes_failure",error:error.message});
        }
    }
}