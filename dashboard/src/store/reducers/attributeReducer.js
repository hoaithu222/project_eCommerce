const initialState = {
    data: [],
    loading: false,
    error: null,
    count: 0,
};

const attributesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'get_attributes': {
            return {
                ...state,
                loading: true,
                error: null, 
            };
        }
        case 'fetch_attributes_success': {
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                count: action.payload.count,
                error: null,
            };
        }
        case 'fetch_attributes_failure': {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case 'add_attributes': {
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        }
        case 'update_attributes':{
            return {
                ...state,
                data:state.data.map((attribute)=>
               attribute.id === action.payload.id ?{...attribute,...action.payload}:attribute),
            }
        }
        case 'delete_attributes':{
            return {
                ...state,
                data:state.data.filter((attribute)=>attribute.id !== action.payload),
            }
        }
        default:
            return state; 
    }
};

export default attributesReducer;