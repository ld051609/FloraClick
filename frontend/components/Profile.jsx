import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../services/config';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const flowerImages = [
    require('../assets/flowerImage/1.jpg'),
    require('../assets/flowerImage/2.jpg'),
    require('../assets/flowerImage/3.jpg'),
    require('../assets/flowerImage/4.jpg'),
    require('../assets/flowerImage/5.jpg'),
    require('../assets/flowerImage/6.jpg'),
    require('../assets/flowerImage/7.jpg'),
    require('../assets/flowerImage/8.jpg'),
    require('../assets/flowerImage/9.jpg'),
    require('../assets/flowerImage/10.jpg'),
    require('../assets/flowerImage/11.jpg'),
    require('../assets/flowerImage/12.jpg'),
    require('../assets/flowerImage/13.jpg'),
    require('../assets/flowerImage/14.jpg'),
    require('../assets/flowerImage/15.jpg'),
    require('../assets/flowerImage/16.jpg'),
    require('../assets/flowerImage/17.jpg'),
    require('../assets/flowerImage/18.jpg'),
    require('../assets/flowerImage/19.jpg'),
    require('../assets/flowerImage/20.jpg'),
    require('../assets/flowerImage/21.jpg'),
    require('../assets/flowerImage/22.jpg'),
    require('../assets/flowerImage/23.jpg'),
    require('../assets/flowerImage/24.jpg'),
    require('../assets/flowerImage/25.jpg'),
    require('../assets/flowerImage/26.jpg'),
    require('../assets/flowerImage/27.jpg'),
    require('../assets/flowerImage/28.jpg'),
    require('../assets/flowerImage/29.jpg'),
    require('../assets/flowerImage/30.jpg'),
    require('../assets/flowerImage/31.jpg'),
    require('../assets/flowerImage/32.jpg'),
    require('../assets/flowerImage/33.jpg'),
    require('../assets/flowerImage/34.jpg'),
    require('../assets/flowerImage/35.jpg'),
    require('../assets/flowerImage/36.jpg'),
    require('../assets/flowerImage/37.jpg'),
    require('../assets/flowerImage/38.jpg'),
    require('../assets/flowerImage/39.jpg'),
    require('../assets/flowerImage/40.jpg'),
    require('../assets/flowerImage/41.jpg'),
    require('../assets/flowerImage/42.jpg'),
    require('../assets/flowerImage/43.jpg'),
    require('../assets/flowerImage/44.jpg'),
    require('../assets/flowerImage/45.jpg'),
    require('../assets/flowerImage/46.jpg'),
    require('../assets/flowerImage/47.jpg'),
    require('../assets/flowerImage/48.jpg'),
    require('../assets/flowerImage/49.jpg'),
    require('../assets/flowerImage/50.jpg'),
    require('../assets/flowerImage/51.jpg'),
    require('../assets/flowerImage/52.jpg'),
    require('../assets/flowerImage/53.jpg'),
    require('../assets/flowerImage/54.jpg'),
    require('../assets/flowerImage/55.jpg'),
    require('../assets/flowerImage/56.jpg'),
    require('../assets/flowerImage/57.jpg'),
    require('../assets/flowerImage/58.jpg'),
    require('../assets/flowerImage/59.jpg'),
    require('../assets/flowerImage/60.jpg'),
    require('../assets/flowerImage/61.jpg'),
    require('../assets/flowerImage/62.jpg'),
    require('../assets/flowerImage/63.jpg'),
    require('../assets/flowerImage/64.jpg'),
    require('../assets/flowerImage/65.jpg'),
    require('../assets/flowerImage/66.jpg'),
    require('../assets/flowerImage/67.jpg'),
    require('../assets/flowerImage/68.jpg'),
    require('../assets/flowerImage/69.jpg'),
    require('../assets/flowerImage/70.jpg'),
    require('../assets/flowerImage/71.jpg'),
    require('../assets/flowerImage/72.jpg'),
    require('../assets/flowerImage/73.jpg'),
    require('../assets/flowerImage/74.jpg'),
    require('../assets/flowerImage/75.jpg'),
    require('../assets/flowerImage/76.jpg'),
    require('../assets/flowerImage/77.jpg'),
    require('../assets/flowerImage/78.jpg'),
    require('../assets/flowerImage/79.jpg'),
    require('../assets/flowerImage/80.jpg'),
    require('../assets/flowerImage/81.jpg'),
    require('../assets/flowerImage/82.jpg'),
    require('../assets/flowerImage/83.jpg'),
    require('../assets/flowerImage/84.jpg'),
    require('../assets/flowerImage/85.jpg'),
    require('../assets/flowerImage/86.jpg'),
    require('../assets/flowerImage/87.jpg'),
    require('../assets/flowerImage/88.jpg'),
    require('../assets/flowerImage/89.jpg'),
    require('../assets/flowerImage/90.jpg'),
    require('../assets/flowerImage/91.jpg'),
    require('../assets/flowerImage/92.jpg'),
    require('../assets/flowerImage/93.jpg'),
    require('../assets/flowerImage/94.jpg'),
    require('../assets/flowerImage/95.jpg'),
    require('../assets/flowerImage/96.jpg'),
    require('../assets/flowerImage/97.jpg'),
    require('../assets/flowerImage/98.jpg'),
    require('../assets/flowerImage/99.jpg'),
    require('../assets/flowerImage/100.jpg'),
    require('../assets/flowerImage/101.jpg'),
    require('../assets/flowerImage/102.jpg'),
  ];
  

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    setGalleryImages(flowerImages);
  }, []);

  if (initializing) return null;

  const handleUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
      <View style={styles.overlay} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImgContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.addIcon} onPress={handleUpload}>
            <Icon name="add" size={20} color="#007bff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Welcome back {user.email}</Text>
      </View>
      <Text style={styles.subtitle}>Gallery</Text>
      <FlatList
        data={galleryImages}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gallery}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImgContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  gallery: {
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    margin: 4,
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(130, 130, 130, 0.93)',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  addIcon: {
    position: 'absolute',
    bottom: 10,
    right: 2,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default ProfileScreen;
