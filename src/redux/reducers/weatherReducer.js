import { FETCH_CURRENT_WEATHER_IS_LOADING, FETCH_CURRENT_WEATHER_SUCCESS, FETCH_CURRENT_WEATHER_ERROR, FETCH_CURRENT_WEATHER_REFRESH, FETCH_CURRENT_WEATHER_REFRESH_SUCCESS } from '../actions/weather';

const initialState = {
    isLoading: true,
    weather: null,
    updatedAt: null,
    error: null,
    isRefreshing: false
}

export default function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CURRENT_WEATHER_IS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_CURRENT_WEATHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                weather: action.weather,
                updatedAt: new Date(),
            }
        case FETCH_CURRENT_WEATHER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case FETCH_CURRENT_WEATHER_REFRESH:
            return {
                ...state,
                isRefreshing: true,
            }
        case FETCH_CURRENT_WEATHER_REFRESH_SUCCESS:
            return {
                ...state,
                isRefreshing: false,
                updatedAt: new Date(),
                weather: action.weather
            }
        default:
            return state;
    }
}

export const getWeather = state => state.weather;
export const getWeatherIsLoading = state => state.isLoading;
export const getWeatherError = state => state.error;
export const getUpdatedAt = state => state.updatedAt;
export const getIsRefreshing = state => state.isRefreshing;
