import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface User {
    id: string;
    nombre: string;
    email: string;
    rol: string;
}

interface AuthState{
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: User, token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            if(typeof window !== 'undefined' ){
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            if(typeof window !== 'undefined'){
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        },
        restoreSesion: (state) => {
            if(typeof window !== 'undefined'){
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('token');
    
                state.user = storedUser ? JSON.parse(storedUser): null;
                state.token = storedToken;
                state.isAuthenticated = !!storedToken;
            }
        }
    }
})

export const { loginSuccess, logout, restoreSesion } = authSlice.actions;
export default authSlice.reducer;

