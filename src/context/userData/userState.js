import React, {useReducer} from 'react';
import UserReducer from './userReducer';
import userContext from './userContext';
import axios from 'axios';

const UserState = (props) =>{
    const initialState ={
        users: [],
        selectedUser: null
    }

    const[state, dispatch] = useReducer(UserReducer,initialState)

    const getUsers = async() => {}
    const getProfile = () => {}

    return(

        <userContext.Provider value={{
                users: state.users,
                selectedUser: state.selectedUser
                getUsers,
                getProfile
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;