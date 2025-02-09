import SummaryApi from "../../common/SummaryApi";
import api from "../../utils/api";

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: "get_user" });
    
    try {
      const response = await api.get(SummaryApi.getProfile.url);
      
      
      if (response.data?.data?.id) {
        sessionStorage.setItem("isLogin", true);
        dispatch({ type: "fetch_user_success", payload: {
          data:response.data.data,
          follower_shop:response.data.data.ShopFollower,
        } });
        
        dispatch({ type: "get_shop", payload: response.data.data.Shop });
      }
    } catch (error) {
      dispatch({ type: "fetch_user_failure", error: error.message });
    }
  };
};