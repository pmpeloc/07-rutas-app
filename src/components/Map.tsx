/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {
  const { hasLocation, initialPosition, getCurrentLocation } = useLocation();

  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    mapViewRef.current?.animateCamera({ center: { latitude, longitude } });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{ flex: 1 }}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
    </>
  );
};
