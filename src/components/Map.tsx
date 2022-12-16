/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {
  const [showPolilyne, setShowPolilyne] = useState(true);

  const {
    hasLocation,
    initialPosition,
    userLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!following.current) return;
    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({ center: { latitude, longitude } });
  }, [userLocation]);

  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    following.current = true;
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
        onTouchStart={() => (following.current = false)}
      >
        {showPolilyne && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolilyne(!showPolilyne)}
        style={{ position: 'absolute', bottom: 80, right: 20 }}
      />
    </>
  );
};
