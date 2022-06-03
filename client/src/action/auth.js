import * as types from "../actionTypes/ActionTypes";
import * as Api from "../api/Api";

export const register = (formData,navigate) => async (dispatch) => {
    try {
        const {data} = await Api.register(formData);
      
         navigate("/login")
        dispatch({ type: types.REGISTER, payload: {result:data}});
    } catch (err) {
        
        dispatch({ type: types.ERRORS, payload: { status: err.response.status, msg: err.response.data.msg } });
    }
}

export const login = (data={},navigate) => async (dispatch) => {
    try {

        
        if (data === {}) {
            console.log("Your Data is empty")
            return;
        }
        const { data: { result, expiresIn, token } } = await Api.login(data);
        
        
        dispatch({ type: types.LOGIN, payload: { result, expiresIn, token } });
        navigate("/");    
    } catch (err) {
        
           dispatch({ type: types.ERRORS, payload: { status: err.response.status, msg: err.response.data.msg } });
    }
}