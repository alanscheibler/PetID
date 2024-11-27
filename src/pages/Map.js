import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import PIDHeader from '../components/PIDHeader';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function Map() {
    const { colors, theme } = useTheme();
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [customMarkers, setCustomMarkers] = useState([]);
    const backButtonPress = () => { navigation.navigate('TelaInicialPet') };

    const customMapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": colors.map.backgroundColor,
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": colors.map.roadColor,
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": colors.map.waterColor,
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": colors.map.landColor,
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": colors.map.labelColor,
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": colors.map.labelOutline,
                    "weight": 0,
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ];

    const fixedMarkers = [
        {
            id: 1,
            latitude: -28.267715693441726, 
            longitude: -52.41961974252445,
            title: "Vittal Pet",
            description: "Especializada em animais de pequeno porte."
        },
        {
            id: 2,
            latitude: -28.2614117100525,
            longitude:  -52.4067446825066,
            title: "Certagro Pet Shop",
            description: "Banho e tosa para seu Pet"
        },
        { 
            id: 3,
            latitude: -28.258973086589222, 
            longitude: -52.406803793136454,
            title: "FarPet - Farmácia Veterinária",
            description: "Consultas e vacinação para pets."
        },
        { 
            id: 4,
            latitude: -28.255667732997342,  
            longitude: -52.400940273400764,
            title: "Centro Clinico Veterinário - CCVET - 24 horas",
            description: "Atendimento 24h para emergências."
        },
        { 
            id: 5,
            latitude: -28.25340017881209, 
            longitude: -52.406601255921466, 
            title: "Instituto Médico Veterinário Saúde Animal",
            description: "Hospital veterinário 24 horas."
        },
        { 
            id: 6,
            latitude: -28.26073429384876,  
            longitude: -52.41196002463583,
            title: "Seres Clinica Veterinária",
            description: "Clinica especializada para seu Pet."
        },
        { 
            id: 7,
            latitude: -28.25606562690151, 
            longitude: -52.40039062319686,
            title: "Santa Heena Clínica Veterinária",
            description: "Hospital Veterinário."
        },
        { 
            id: 8,
            latitude: -28.226645231569155,  
            longitude: -52.38193012414024,
            title: "Hospital Veterinário - UPF",
            description: "Hospital Veterinário."
        },
        { 
            id: 9,
            latitude: -28.25129556681234,  
            longitude: -52.4037339048163,
            title: "Afetive Clínica Veterinária Integrativa",
            description: "Garantimos o melhor atendimento para seu Pet!"
        },
        { 
            id: 10,
            latitude: -28.272731858825317, 
            longitude: -52.38717652280109,
            title: "Clínica Veterinária São Cristóvão",
            description: "Veterinário altamente qualificado."
        },
        { 
            id: 11,
            latitude: -28.26138486899502,  
            longitude: -52.42517295347101,  
            title: "Recanto Pet",
            description: "A melhor clínica para seu Pet."
        },
        { 
            id: 12,
            latitude: -28.27357044795229,   
            longitude: -52.38599645347102,
            title: "Pet Help Clínica Veterinária",
            description: "Clínica que seu Pet gosta!"
        },
    ];

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permissão de localização negada');
            return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const initialRegion = location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    } : {
        latitude: -23.55052,
        longitude: -46.633308,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setCustomMarkers((prevMarkers) => [
            ...prevMarkers,
            { latitude, longitude },
        ]);
    };

    if (errorMsg) {
        Alert.alert('Erro', errorMsg);
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar 
                style={theme === 'light' ? 'dark' : 'light'}
                backgroundColor={colors.componentBG} 
            />
            <PIDHeader
                showBackButton
                backButtonPress={backButtonPress}
            />
            <MapView
                style={styles.map}
                region={initialRegion}
                showsUserLocation={true}
                followsUserLocation={true}
                customMapStyle={customMapStyle}
                onPress={handleMapPress}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Você está aqui"
                        pinColor={colors.orange}
                    />
                )}
                {fixedMarkers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.title}
                        description={marker.description}
                        pinColor={colors.green}
                    />
                ))}
                {customMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title="Novo Marcador"
                        pinColor={colors.orange}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    map: {
        flex: 1,
        width: '100%',
    },
});
