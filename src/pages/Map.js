import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import React, { useState, useCallback } from 'react';
import * as Location from 'expo-location';
import PIDHeader from '../components/PIDHeader';

export default function Map() {
    const navigation = useNavigation();
    const [customMarkers, setCustomMarkers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const backButtonPress = () => {navigation.navigate('TelaInicialPet')}

    useFocusEffect(
        useCallback(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log("Permissão de localização negada.");
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
            })();
        }, [])
    );

    const handleMapPress = (event) => {
        console.log(event.nativeEvent);
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setCustomMarkers((prevMarkers) => [
            ...prevMarkers,
            { latitude, longitude },
        ]);
    };

    return (
        <View style={styles.container}>
            <PIDHeader 
            showBackButton 
            backButtonPress={backButtonPress}/>
            {userLocation ? (
                <MapView
                    onPress={handleMapPress}
                    provider='google'
                    style={styles.map}
                    initialRegion={userLocation}
                >
                    {customMarkers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker}
                        />
                    ))}
                </MapView>
            ) : (
                <Text>Carregando mapa...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        flex: 1,
        width: '100%',
    },
    callout: {
        width: 150,
        padding: 5,
    },
});
