import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useGlobalContext } from "../utils/context";
import * as ImageManipulator from "expo-image-manipulator";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import uuid from 'react-native-uuid';
import SwopApi from "../apis/SwopAPI";
import { auth } from "../utils/firebase";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState();
  const [selfie, setSelfie] = useState();
  const user_id = auth.currentUser.uid;
  
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const uploadImage = async(selfie) => {
    const image_name = `${uuid.v4()}.png`
    const response = await fetch(selfie);
    const blob = await response.blob();

    storageRef = ref(getStorage(), `products/${image_name}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    return image_name;
  }

  useEffect(() => {
    if (selfie) {
      //   What to do after taking photo     
      uploadImage(selfie)
        .then((image_name) => {
          console.log("Great Sucess.");

          return SwopApi.addUserProduct(user_id, image_name, image_name, "12345.00");
        })
        .then((data) => {
          console.log("uploaded to database");
        })
        .catch((error) => {
          console.log("Error")
        });
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
          ], {compress: 0.1})
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
