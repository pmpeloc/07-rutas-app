/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {
  const { hasLocation, initialPosition } = useLocation();

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
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
        iconName="star-outline"
        onPress={() => {}}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
    </>
  );
};
