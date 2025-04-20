import { configureStore } from "@reduxjs/toolkit";
import { loadersSlice } from "./loadersSlice";
import { usersSlice } from "./UsersSlice";

const store=configureStore({
    reducer:{
        loaders:loadersSlice.reducer,
        users:usersSlice.reducer,
    },
});
export default store;           // store should be accesible to all the components so  enclosed all elements in app.js or index.js
