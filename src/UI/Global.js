import {createSlice ,configureStore} from '@reduxjs/toolkit';

const uiChanges = createSlice({
    name: 'uiChanges',
    initialState: {
        turnOnGameboy: false,
        BkeyPressed: false,
        AkeyPressed: false,
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
        },
        BkeyPress: (state) => {
            state.BkeyPressed = true;
        },
        AkeyPress: (state) => {
            state.AkeyPressed = true;
        },
        BkeyRelease: (state) => {
            state.BkeyPressed = false;
        },
        AkeyRelease: (state) => {
            state.AkeyPressed = false;
        }
    }
});

export const {turnOnGameboy, turnOffGameboy, loadGame, BkeyPress, BkeyRelease, AkeyPress, AkeyRelease} = uiChanges.actions;

export const store = configureStore({reducer: uiChanges.reducer, devTools: true, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});