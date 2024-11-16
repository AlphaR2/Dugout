import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  deleteDataFromLocalStorage,
} from "../../utils/localStorage";

// Define the structure of the authentication state
interface AuthState {
  isAuth: boolean;
  accessToken: string | null;
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
}

// Define the structure of the payload for setIsAuth
interface AuthPayload {
  isAuth: boolean;
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Define the initial state based on the AuthState interface
const initialState: AuthState = {
  isAuth: checkAuthStatus(),
  accessToken: getDataFromLocalStorage("accessToken"),
  user: {
    id: getDataFromLocalStorage("id"),
    email: getDataFromLocalStorage("email"),
    name: getDataFromLocalStorage("name"),
  },
};

// Function to check authentication status based on the presence of access and refresh tokens
function checkAuthStatus(): boolean {
  return !!getDataFromLocalStorage("accessToken");
}

// Create the slice with TypeScript support
export const isAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<AuthPayload>) => {
      const { accessToken, user } = action.payload;
      state.isAuth = true;
      state.accessToken = accessToken;
      state.user = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      // Save data in local storage if it exists
      saveDataToLocalStorage("accessToken", accessToken);
      saveDataToLocalStorage("id", user.id);
      saveDataToLocalStorage("email", user.email);
      saveDataToLocalStorage("name", user.name);
    },
    logOut: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.user = {
        id: null,
        email: null,
        name: null,
      };

      // Clear local storage
      deleteDataFromLocalStorage("accessToken");
      deleteDataFromLocalStorage("id");
      deleteDataFromLocalStorage("name");
      deleteDataFromLocalStorage("email");
    },
  },
});

// Export the actions for use in components
export const { setIsAuth, logOut } = isAuthSlice.actions;

// Export the reducer to be included in the store
export default isAuthSlice.reducer;


