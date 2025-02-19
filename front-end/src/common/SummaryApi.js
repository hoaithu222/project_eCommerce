import { method } from "lodash";

export const baseURL = import.meta.env.VITE_SERVER_API;


const SummaryApi= {
    register:{
        url:`${baseURL}/users/register`,
        method:"post",
    },
    verifyEmail: {
        url: `${baseURL}/users/verify-email`,
        method: "get",
    },
    resendVerifyEmail:{
        url: `${baseURL}/users/resend-verification`,
        method:"post"
    },
    forgotPassword:{
        url:`${baseURL}/auth/forgot-password`,
        method:"post",
    },
    verifyPasswordOtp:{
        url:`${baseURL}/auth/verify-otp`,
        method:"post",
    },
    resetPassword:{
        url:`${baseURL}/auth/reset-password`,
        method:"post",
    },
    login:{
        url:`/auth/login`,
        method:"post",
    },
    logout:{
        url:`${baseURL}/auth/logout`,
        method:"post",
    },
    refreshToken:{
        url:`/auth/refresh-token`,
        method:"post",
    },
    getProfile:{
        url:`/auth/profile`,
        method:`get`,
    },
    uploadImage:{
        url:`${baseURL}/upload/image`,
        method:'post',
    },
    updateProfile:{
        url:`${baseURL}/users/update`,
        method:'patch',
    },
    addAddress:{
        url:`${baseURL}/address/create`,
        method:"post",
    },
    getAddress:{
        url:`${baseURL}/address`,
        method:"get"
    },
    getMyOrder:{
       url:`${baseURL}/order/my-order`,
       method:"post"
    },
    deleteAddress:{
        url:`${baseURL}/address`,
        method:"delete"
    },
    updateAddress:{
        url:`${baseURL}/address`,
        method:"PATCH"
    },
    socialLogin: {
        google: {
          url: `${baseURL}/auth/social/google`,
          method: "GET"
        },
        facebook: {
          url: `${baseURL}/auth/social/facebook`,
          method: "GET"
        },
        github: {
          url: `${baseURL}/auth/social/github`,
          method: "GET"
        },
    },
    registerShop:{
        url:`${baseURL}/shop`,
        method:`POST`,
    },
    checkRegisterShop:{
        url:`${baseURL}/shop/userId`,
        method:'POST',
    },
    getShop:{
        url:`${baseURL}/shop`,
        method:'GET',
    },
    updateShop:{
        url:`${baseURL}/shop`,
        method:"PATCH",
    },
    orderShop:{
        url:`${baseURL}/order/shop`,
        method:"POST"
    },
    // category 
    getAllCategory:{
        url:`${baseURL}/category/all`,
        method:'get',
    },
    getCategoryById:{
        url:`${baseURL}/category`,
        method:'get',
    },
    // subCategory
    getSubCategory:{
        url:`${baseURL}/sub-category/all`,
        method:"get"
    },
    //getAttributeByCategory
    getAttributeByCategory:{
        url:`${baseURL}/attributes`,
        method:"get",
    },
    //product 
    addProduct:{
        url:`${baseURL}/products`,
        method:"post",
    },
    getProduct:{
        url:`${baseURL}/products`,
        method:"get"
    },
    getProductWithShop:{
        url:`${baseURL}/products/shopId`,
        method:"get",
    },
    updateProduct:{
        url:`${baseURL}/products`,
        method:"PATCH",
    },
    getProductWithSubCategory:{
       url:`${baseURL}/products/sub-category`,
       method:"POST",
    },
    //shop-follow
    followerShop:{
        url:`${baseURL}/shop-follower`,
        method:"POST",
    },
    unfollowerShop:{
        url:`${baseURL}/shop-follower/unfollow`,
        method:"POST",
    },
    // cart
    getCart:{
        url:`${baseURL}/cart`,
        method:"GET",
    },
    getCartWithShop:{
        url:`${baseURL}/cart/shop`,
        method:"GET",
    },
    addCart:{
        url:`${baseURL}/cart/items`,
        method:"POST",
    },
    updateCart:{
        url:`${baseURL}/cart/items`,
        method:"PATCH",
    },
    deleteCart:{
        url:`${baseURL}/cart/items`,
        method:"DELETE",
    },
    //order
    getOrder:{
        url:`${baseURL}/order`,
        method:"GET"
    },
    updateOrder:{
        url:`${baseURL}/order`,
        method:"PATCH"
    },
    addOrder:{
        url:`${baseURL}/order/items`,
        method:"POST",
    },
    getReviewWithOrder:{
        url:`${baseURL}/review/order`,
        method:"GET"
    },
    // review 
    addReview:{
        url:`${baseURL}/review`,
        method:"POST",
    },
    updateReview:{
        url:`${baseURL}/review`,
        method:"PATCH",
    },
    getReview:{
        url:`${baseURL}/review`,
        method:"GET",
    },
    // analytic
    getOverview:{
        url:`${baseURL}/shop-statistics`,
        method:"GET"
    },
    getRevenueByMonth:{
        url:`${baseURL}/shop-statistics/revenue-by-month`,
        method:"GET"
    },

}
export default SummaryApi;