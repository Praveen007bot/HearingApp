// BackgroundImage.js
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BackgroundImage = ({ children }: any) => {
  return (
    <ImageBackground
      source={require('./../assets/images/img_background.png')} // Your background image here
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default BackgroundImage;
