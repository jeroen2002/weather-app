import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { AppLoading } from 'expo';
import { setLocation } from '../redux/actions/settings';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { fetchSettings } from '../redux/actions/settings';


async function setStateData(dispatch) {
    const location = await AsyncStorage.getItem('plaats');

    alert(location)

    dispatch(setLocation(location));
}

export default function StorageContentProvider(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        const { fetchSettings } = props;
        dispatch(fetchSettings());
    }, []);

    const location = useSelector((state) => state.settingsReducer.location);

    if (!location) {

        return <AppLoading />
    }

    return props.children;
}