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
    }
}
export default SummaryApi;