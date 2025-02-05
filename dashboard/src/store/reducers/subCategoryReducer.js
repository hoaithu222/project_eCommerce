const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
};

const subCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'get_sub_category': {
            return {
                ...state,
                loading: true,
                error: null, 
            };
        }
        case 'fetch_sub_category_success': {
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                count: action.payload.count,
                error: null,
            };
        }
        case 'fetch_sub_category_failure': {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case 'add_sub_category': {
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        }
        case 'update_sub_category':{
            return {
                ...state,
                data:state.data.map((subCategory)=>
                subCategory.id === action.payload.id ?{...subCategory,...action.payload}:subCategory),
            }
        }
        case 'delete_sub_category':{
            return {
                ...state,
                data:state.data.filter((subCategory)=>subCategory.id !== action.payload),
            }
        }
        default:
            return state; 
    }
};

export default subCategoryReducer;