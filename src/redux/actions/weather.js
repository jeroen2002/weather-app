import axios from 'axios';

export const FETCH_CURRENT_WEATHER_IS_LOADING = 'FETCH_CURRENT_WEATHER_IS_LOADING';
export const FETCH_CURRENT_WEATHER_SUCCESS = 'FETCH_CURRENT_WEATHER_SUCCESS';
export const FETCH_CURRENT_WEATHER_ERROR = 'FETCH_CURRENT_WEATHER_ERROR';
export const FETCH_CURRENT_WEATHER_REFRESH = 'FETCH_CURRENT_WEATHER_REFRESH';
export const FETCH_CURRENT_WEATHER_REFRESH_SUCCESS = 'FETCH_CURRENT_WEATHER_REFRESH_SUCCESS'


// get weather data
function fetchCurrentWeatherIsLoading() {
    return {
        type: FETCH_CURRENT_WEATHER_IS_LOADING
    }
}

function fetchCurrentWeatherSuccess(weather) {
    return {
        type: FETCH_CURRENT_WEATHER_SUCCESS,
        weather: weather,
    }
}

function fetchCurrentWeatherError(error) {
    return {
        type: FETCH_CURRENT_WEATHER_ERROR,
        error: error
    }
}

// refresh weather page
function fetchCurrentWeatherRefresh() {
    return {
        type: FETCH_CURRENT_WEATHER_REFRESH,
    }
}

function fetchCurrentWeatherRefreshSuccess(weather) {
    return {
        type: FETCH_CURRENT_WEATHER_REFRESH_SUCCESS,
        weather: weather,
    }
}

export function fetchWeather() {
    return dispatch => {
        dispatch(fetchCurrentWeatherIsLoading());
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=zwolle&units=metric&lang=nl&appid=e69b3148096181d62b010780c2e8c701`)
            .then((response) => {
                dispatch(fetchCurrentWeatherSuccess(response.data));
                return response.data;
            })
            .catch((error) => {
                dispatch(fetchCurrentWeatherError(error));
            })
    }
}

export function fetchWeatherRefresh() {
    return dispatch => {
        dispatch(fetchCurrentWeatherRefresh());
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=zwolle&units=metric&lang=nl&appid=e69b3148096181d62b010780c2e8c701`)
            .then((response) => {
                dispatch(fetchCurrentWeatherRefreshSuccess(response.data));
                return response.data;
            })
            .catch((error) => {
                dispatch(fetchCurrentWeatherError(error));
            })
    }
}

