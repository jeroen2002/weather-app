import { SETTINGS_SAVE, SETTINGS_ERROR, SET_LOCATION } from '../actions/settings';

const initialState = {
    error: null,
    isSaved: false,
    location: ''
}

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SETTINGS_SAVE:
            return {
                ...state,
                isSaved: true,
                location: action.location
            }
        case SETTINGS_ERROR:
            return {
                ...state,
                error: action.error
            }
        case SET_LOCATION:
            return {
                ...state,
                location: action.location
            }
        default:
            return state;
    }

}

export const getError = state => state.error;
export const getIsSaved = state => state.isSaved;
export const getLocation = state => state.location;