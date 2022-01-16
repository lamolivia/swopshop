import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useGlobalContext } from "../utils/context";
import * as ImageManipulator from "expo-image-manipulator";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState();
  const [selfie, setSelfie] = useState();

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (selfie) {
      //   What to do after taking photo
      console.log("Image Taken");
    }
  }, [selfie]);

  const takePic = async () => {
    if (cameraRef) {
      cameraRef.current
        .takePictureAsync()
        .then((photo) =>
          // Might not need
          // Flip photo horizontally so displayed photo in same orientation as preview
          ImageManipulator.manipulateAsync(photo.uri, [
            { flip: ImageManipulator.FlipType.Horizontal },
          ])
        )
        .then((flipPhoto) => {
          setSelfie(flipPhoto.uri);
        })
        .catch((err) => console.error(err));
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      >
        <TouchableOpacity style={styles.button} onPress={takePic}>
          <View style={styles.circle} />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 75,
  },
  circle: {
    height: 75,
    width: 75,
    borderRadius: 75,
    borderColor: "white",
    borderWidth: 5,
  },
});
