import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common/SummaryApi";

export const fetchUser = (navigate) => {
  
  return async (dispatch) => {
    dispatch({ type: "get_user" });

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is missing");

      const response = await fetch(SummaryApi.getProfile.url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const refreshToken = localStorage.getItem("refreshToken");
      if(data.error){
        const responseRefreshToken =await fetch(SummaryApi.refreshToken.url,{
          method:SummaryApi.refreshToken.method,
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({refreshToken:refreshToken})
        });
        const result = await responseRefreshToken.json();

        if(result.error){
          localStorage.clear();
          sessionStorage.clear();
          navigate('/login');
          return;
          
        }
      }



       if (response.ok && data?.data?.id) {
      
        sessionStorage.setItem("isLogin", "true");
      
        
        if (data?.data?.role === "Admin" && data?.data?.is_admin) {
          sessionStorage.setItem("isPermission", "true");
        } else {
          sessionStorage.setItem("isPermission", "false");
        }
      }
      if (response.ok) {
        dispatch({ type: "fetch_data_success", payload: data.data});
      } else {
        sessionStorage.clear();
        localStorage.clear();
         
        throw new Error(data.message || "Failed to fetch user data");
        

      }
    } catch (error) {
       navigate("/login");
      dispatch({ type: "fetch_data_failure", error: error.message });
    }
  };
};
