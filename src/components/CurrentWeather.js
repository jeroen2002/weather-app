import React, { useEffect } from 'react';
import {
    View,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Text,
    Platform,
    StatusBar,
} from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Appbar } from 'react-native-paper';
import TimeAgo from 'react-timeago';
import dutchStrings from '../languages/nl'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { fetchWeather, fetchWeatherRefresh } from '../redux/actions/weather';
import { getWeather, getWeatherIsLoading, getWeatherError, getUpdatedAt, getIsRefreshing } from '../redux/reducers/weatherReducer';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Carousel from 'react-native-snap-carousel';

const formatter = buildFormatter(dutchStrings)

function CurrentWeather(props) {
    const isLoading = useSelector(state => state.weatherReducer.isLoading)
    const weather = useSelector(state => state.weatherReducer.weather)
    const updatedAt = useSelector(state => state.weatherReducer.updatedAt);
    const isRefreshing = useSelector(state => state.weatherReducer.isRefreshing);
    const location = useSelector(state => state.settingsReducer.location)

    useEffect(() => {
        const { fetchWeather } = props;
        fetchWeather();
    }, []);


    function refreshWeather() {
        const { fetchWeatherRefresh } = props;
        fetchWeatherRefresh();
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // _renderItem = ({ item, index }) => {
    //     return (
    //         <View style={styles.slide}>
    //             <Text style={styles.title}>{item.title}</Text>
    //         </View>
    //     );
    // }

    return (
        <>
            <StatusBar
                hidden={true}
                translucent={true}
            />
            <Appbar.Header>
                <Appbar.Content title={`Weer in ${location}`} subtitle={updatedAt ? <TimeAgo date={updatedAt} formatter={formatter} live="true" component={Text} /> : 'laden...'} />
            </Appbar.Header>

            <SafeAreaView style={{ alignSelf: "center", width: '100%', height: '100%' }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={refreshWeather} />
                    }
                    style={{ height: '100%', width: '100%' }}
                >
                    <Card style={{ width: '90%', alignSelf: "center", backgroundColor: 'rgb(43, 133, 198)', marginTop: 10 }}>
                        <Card.Content>
                            <Title style={{ color: 'white', textAlign: "center" }}>{Math.round(weather.main.temp)}ºC</Title>
                            <Paragraph style={{ color: 'white', textAlign: "center" }}>{weather.weather[0].description} {Math.round(weather.main.temp_max)} / {Math.round(weather.main.temp_min)}ºC</Paragraph>
                        </Card.Content>
                        <Card.Cover style={{ backgroundColor: 'rgb(43, 133, 198)', height: 100, width: 100, alignSelf: "center" }} source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }} />
                    </Card>
                    {/* <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={weather}
                        renderItem={this._renderItem}
                    /> */}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const mapStateToProps = state => ({
    error: getWeatherError(state),
    weather: getWeather(state),
    isLoading: getWeatherIsLoading(state),
    updatedAt: getUpdatedAt(state),
    isRefreshing: getIsRefreshing(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWeather,
    fetchWeatherRefresh
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentWeather);