import SummaryApi from "../../common/SummaryApi";

export const updateUserRole = (userId, role) => {
  return async (dispatch) => {
    dispatch({ type: "update_user_role_start" });

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is missing");

      const response = await fetch(`${SummaryApi.updateUserRole.url}/${userId}`, {
        method: SummaryApi.updateUserRole.method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch({
          type: "update_user_role_success",
          payload: { userId, user: data.data },
        });
        return { success: true, message: data.message };
      } else {
        throw new Error(data.message || "Failed to update user role");
      }
    } catch (error) {
      dispatch({
        type: "update_user_role_failure",
        error: error.message,
      });
      return { success: false, message: error.message };
    }
  };
};

