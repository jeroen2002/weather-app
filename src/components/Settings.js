import React, { useState, useEffect } from 'react';
import { TextInput, Switch } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';
import { AsyncStorage, Form } from 'react-native';
import axios from 'axios';
import { saveSettings, fetchSettings } from '../redux/actions/settings';
import { getError, getIsSaved, getLocation } from '../redux/reducers/settingsReducer';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

/*  */





function Settings(props) {
    const location = useSelector(state => state.settingsReducer.location);

    const [preLoc, setPreLoc] = useState('');
    const [isSwitchOn, setSwitchOn] = useState(false)


    useEffect(() => {
        const { fetchSettings } = props;
        fetchSettings();
    }, []);

    useEffect(() => {
        setPreLoc(location)
    }, [location]);



    function saveLocation() {
        const { saveSettings, fetchSettings } = props;
        saveSettings(preLoc);
    }
    const onToggleSwitch = () => {
        setSwitchOn(!isSwitchOn);

        //     if (!isSwitchOn) {
        //         //     Geolocation.getCurrentPosition(info => console.log(info));

        //         navigator.geolocation.getCurrentPosition(
        //             position => {

        //                 let location = position;
        //                 axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=e69b3148096181d62b010780c2e8c701`).then((data) => setLocation(data.data.name)).catch((e) => console.log(e))
        //             },
        //             error => Alert.alert(error.message),
        //             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        //         );


        //     }
    }



    return (<>
        <Appbar.Header>
            <Appbar.Content title="Instellingen" />
        </Appbar.Header>

        <View style={{
            flex: 1,
            flexDirection: "column",
            width: '90%',
            alignSelf: 'center',
            marginTop: 10
        }}>
            <TextInput
                label="Plaats"
                value={preLoc}
                onChangeText={(loc) => setPreLoc(loc)}
            // disabled={disabled}

            />
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingTop: 10 }}>
                <Text style={{ fontSize: 15 }}>Huidige locatie gebruiken</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>

            <Button style={{ marginBottom: 10 }} icon="check" color="lightgreen" mode="contained" onPress={saveLocation}>
                Opslaan
            </Button>
        </View>
    </>
    );
}

const mapStateToProps = state => ({
    location: getLocation(state),
    isSaved: getIsSaved(state),
    error: getError(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    saveSettings,
    fetchSettings
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);