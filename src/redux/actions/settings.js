import AsyncStorage from '@react-native-async-storage/async-storage';
export const SETTINGS_SAVE = "SETTINGS_SAVE";
export const SETTINGS_ERROR = "SETTINGS_ERROR";
export const SET_LOCATION = "SET_LOCATION";

function settingsSave() {
    return {
        type: SETTINGS_SAVE,
    }
}

function settingsError(error) {
    return {
        type: SETTINGS_ERROR,
        error: error
    }
}

function setLocation(location) {
    return {
        type: SET_LOCATION,
        location: location
    }
}

export function saveSettings(location) {
    return async dispatch => {
        try {
            alert(location + ' save')
            await AsyncStorage.setItem('plaats', JSON.stringify(location)).then((res) => {
                dispatch(setLocation(JSON.parse(res)))
            });
        } catch (e) {
            dispatch(settingsError(e))
        }
    }

}

// fetch settings from storage
export function fetchSettings() {
    return async dispatch => {
        try {
            await AsyncStorage.getItem('plaats').then((res) => {
                alert(res + ' get')
                dispatch(setLocation(JSON.parse(res)))
                return res;
            });
        } catch (e) {
            dispatch(settingsError(e))
        }
    }

}