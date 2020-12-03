import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import CurrentWeather from './CurrentWeather';
import Settings from './Settings';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Settings />;

const RecentsRoute = () => <Text>Albums</Text>;

const Navigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Vandaag', icon: 'home' },
        { key: 'settings', title: 'Instellingen', icon: 'settings' },
        { key: 'info', title: 'Info', icon: 'information' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: CurrentWeather,
        settings: AlbumsRoute,
        info: RecentsRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Navigation;