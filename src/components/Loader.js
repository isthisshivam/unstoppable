import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Modal, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';
const Loader = props => {
  const {isLoading, fullScrreen} = props;

  return (
    <>
      {isLoading && (
        <Modal visible={isLoading} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 70,
                width: 70,
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 11,
                },
                shadowOpacity: 0.57,
                shadowRadius: 15.19,

                elevation: 23,
              }}>
              <ActivityIndicator
                size="small"
                color={colors.primary}
                justifyContent={'center'}
                // marginTop="100%"
              />
            </View>
          </View>
        </Modal>
      )}
      {isLoading && fullScrreen && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <ActivityIndicator size={34} animating={isLoading} color="#4fde40" />
        </View>
      )}
    </>
  );
};
export default Loader;
