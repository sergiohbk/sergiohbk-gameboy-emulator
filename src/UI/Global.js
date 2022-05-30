import {createSlice ,configureStore} from '@reduxjs/toolkit';

const uiChanges = createSlice({
    name: 'uiChanges',
    initialState: {
        turnOnGameboy: false,
        game: null
    },
    reducers: {
        turnOnGameboy: (state) => {
            state.turnOnGameboy = true;
        },
        turnOffGameboy: (state) => {
            state.turnOnGameboy = false;
        },
        loadGame: (state, action) => {
            state.game = action.payload;
        }
    }
});

export const {turnOnGameboy, turnOffGameboy, loadGame} = uiChanges.actions;

export const store = configureStore({reducer: uiChanges.reducer, devTools: true, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});