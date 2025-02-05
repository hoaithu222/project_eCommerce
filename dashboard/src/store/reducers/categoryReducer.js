const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'get_category': {
            return {
                ...state,
                loading: true,
                error: null, 
            };
        }
        case 'fetch_category_success': {
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                count: action.payload.count,
                error: null,
            };
        }
        case 'fetch_category_failure': {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case 'add_category': {
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        }
        case 'update_category':{
            return {
                ...state,
                data:state.data.map((category)=>
                category.id === action.payload.id ?{...category,...action.payload}:category),
            }
        }
        case 'delete_category':{
            return {
                ...state,
                data:state.data.filter((category)=>category.id !== action.payload),
            }
        }
        default:
            return state; 
    }
};

export default categoryReducer;