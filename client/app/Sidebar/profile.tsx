import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView, Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { List, Divider, RadioButton, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import AdditionalDetailsScreen from './additionaldetails';


const Profile = () => {
  const [profileImage, setProfileImage] = useState<string>('https://via.placeholder.com/100');
  const [username, setUsername] = useState<string>('komal 123');
  const [email, setEmail] = useState<string>('komal123e@example.com');
  const [mobile, setMobile] = useState<string>('1234567890');
  const [idNumber, setIdNumber] = useState<string>('A12345678');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<string>('');
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [showAddressInput, setShowAddressInput] = useState<boolean>(false);
  const router = useRouter();
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  
  const countryCodes = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+91 (India)', value: '+91' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+61 (Australia)', value: '+61' },
    { label: '+81 (Japan)', value: '+81' },
    // Add more as needed
  ]; 

  const handleFinalSave = async (): Promise<void> => {
    if (loading) return;
  
    setLoading(true);
    try {
      // Perform API call or save logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Profile updated successfully!');
      router.push('/front'); // Redirect to the front page
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const saveAddress = (): void => {
    if (!newAddress.trim()) {
      Alert.alert('Error', 'Address cannot be empty!');
      return;
    }
    setSavedAddresses((prev) => [...prev, newAddress.trim()]);
    setNewAddress('');
    setShowAddressInput(false);
    Alert.alert('Success', 'Address saved successfully!');
  };
  const deleteAddress = (index: number): void => {
    setSavedAddresses((prev) => prev.filter((_, idx) => idx !== index));
    Alert.alert('Success', 'Address deleted successfully!');
  };
  

  const pickImage = async (): Promise<void> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const newProfileImage = result.assets[0].uri;
      setProfileImage(newProfileImage);
    }
  };

  
    // States for personal information
    const [gender, setGender] = useState('Female');
    const [age, setAge] = useState('19');
    const [maritalStatus, setMaritalStatus] = useState('Single');
    const [education, setEducation] = useState('');
  
    // States for family members
    const [familyMembers, setFamilyMembers] = useState('Parents / In-laws');
  
    // States for preferences
    const [domesticTravel, setDomesticTravel] = useState('I do not travel');
    const [internationalTravel, setInternationalTravel] = useState('I do not travel internationally');
    const [personalInterests, setPersonalInterests] = useState('Others');
    const [movies, setMovies] = useState('I do not watch movies in theatres');
  
    const [hasChanges, setHasChanges] = useState(false);
  
    // Track changes
    useEffect(() => {
      setHasChanges(true);
    }, [gender, age, maritalStatus, education, familyMembers, domesticTravel, internationalTravel, personalInterests, movies]);
  
    const handleSaveChanges = () => {
      const parsedAge = parseInt(age, 10);
  
      if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        Alert.alert('Error', 'Please enter a valid age.');
        return;
      }
  
      if (!education.trim()) {
        Alert.alert('Error', 'Please enter your education qualification.');
        return;
      }
  
      console.log('Saved Data:', {
        gender,
        age: parsedAge,
        maritalStatus,
        education,
        familyMembers,
        preferences: {
          domesticTravel,
          internationalTravel,
          personalInterests,
          movies,
        },
      });
  
      Alert.alert('Success', 'Your changes have been saved!', [
        {
          text: 'OK',
          onPress: () => router.push('/profile'),
        },
      ]);
  
      setHasChanges(false);
    };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      )}

      <View style={styles.header}>
  <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
        </View> 
        <TouchableOpacity onPress={handleFinalSave} style={styles.finalSaveButton}>
          <Text style={styles.finalSaveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Basic Information</Text>
  {isEditing ? (
    <>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email ID"
        keyboardType="email-address"
      />
      <View style={styles.inputContainer}>
        <RNPickerSelect
          onValueChange={(value) => setCountryCode(value)}
          items={countryCodes}
          placeholder={{ label: 'Select Country Code', value: null }}
          value={countryCode}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
            inputWeb:styles.pickerInput,
          }}
        />
        <TextInput
          style={[styles.input, styles.flexInput]}
          value={mobile}
          onChangeText={(text) => {
            if (text.length <= 10) {
              setMobile(text.replace(/[^0-9]/g, '')); // Allows only numbers
            }}}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />
      </View>
      <TextInput
        style={styles.input}
        value={idNumber}
        onChangeText={setIdNumber}
        placeholder="Enter ID number"
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setIsEditing(false)}
      >
        <Text style={styles.saveButtonText}>Done</Text>
      </TouchableOpacity>
    </>
  ) : (
    <>
      <Text style={styles.detailText}>Username: {username}</Text>
      <Text style={styles.detailText}>Email: {email}</Text>
      <Text style={styles.detailText}>
        Mobile: {countryCode} {mobile}
      </Text>
      <Text style={styles.detailText}>ID Number: {idNumber}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(true)}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </>
  )}
</View>

      {/* Personal Information Section */}
      <List.Section>
        <List.Subheader style={styles.subheaderTitle}>Personal Information</List.Subheader>
        <Divider />

        <List.Item
          title="Gender"
          description={gender}
          right={() => (
            <Pressable onPress={() => setGender(gender === 'Male' ? 'Female' : 'Male')}>
              <List.Icon icon="chevron-right" />
            </Pressable>
          )}
        />
        <Divider />
        <List.Item
          title="Age"
          description={age}
          right={() => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
              placeholder="Age"
            />
          )}
        />
        <Divider />
        <List.Item
          title="Marital Status"
          description={maritalStatus}
          right={() => (
            <Pressable onPress={() => setMaritalStatus(maritalStatus === 'Single' ? 'Married' : 'Single')}>
              <List.Icon icon="chevron-right" />
            </Pressable>
          )}
        />
        <Divider />
        <List.Item
          title="Education Qualification"
          description={education || 'Please tell us your education qualification'}
          right={() => (
            <TextInput
              style={styles.input}
              value={education}
              onChangeText={setEducation}
              placeholder="Education Qualification"
            />
          )}
        />
        <Divider />
        <List.Item
          title="Family Members"
          description={familyMembers}
          right={() => (
            <Pressable onPress={() => setFamilyMembers(familyMembers === 'Parents / In-laws' ? 'Friends' : 'Parents / In-laws')}>
              <List.Icon icon="chevron-right" />
            </Pressable>
          )}
        />
        <Divider />
      </List.Section>

      {/* Preferences Section */}
      <List.Section>
        <List.Subheader style={styles.subheaderTitle}>Preferences</List.Subheader>
        <Divider />

        <List.Item
          title="Domestic Travel"
          description={domesticTravel}
          right={() => (
            <Pressable onPress={() => setDomesticTravel(domesticTravel === 'I do not travel' ? 'Travel often' : 'I do not travel')}>
              <List.Icon icon="chevron-right" />
            </Pressable>
          )}
        />
        <Divider />
        <List.Item
          title="International Travel"
          description={internationalTravel}
          right={() => (
            <Pressable
              onPress={() =>
                setInternationalTravel(
                  internationalTravel === 'I do not travel internationally'
                    ? 'Travel frequently internationally'
                    : 'I do not travel internationally'
                )
              }
            >
              <List.Icon icon="chevron-right" />
            </Pressable>
          )}
        />
        <Divider />
        <List.Item
          title="Personal Interests"
          description={personalInterests}
          right={() => (
            <TextInput
              style={styles.input}
              value={personalInterests}
              onChangeText={setPersonalInterests}
              placeholder="Enter interests"
            />
          )}
        />
        <Divider />
        <List.Item
          title="Movies"
          description={movies}
          right={() => (
            <Pressable onPress={() => setMovies(movies === 'I do not watch movies in theatres' ? 'Watch movies in theatres' : 'I do not watch movies in theatres')}>
              <List.Icon icon="chevron-right" />
            </Pressable>
          )}
        />
        <Divider />
      </List.Section>

      {/* Save Changes Button */}
      <Button
        mode="contained"
        style={styles.saveButton}
        onPress={handleSaveChanges}
        disabled={!hasChanges}
      >
        Save 
      </Button>
   

      <View style={styles.section}>
  <Text style={styles.sectionTitle}>Saved Addresses</Text>
  {savedAddresses.map((address, index) => (
    <View key={index} style={styles.addressItem}>
      <Text style={styles.detailText}>
        {index + 1}. {address}
      </Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteAddress(index)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  ))}
  {showAddressInput ? (
    <View style={styles.addressInputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter new address"
        value={newAddress}
        onChangeText={setNewAddress}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveAddress}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowAddressInput(false)}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity
      style={styles.addAddressBox}
      onPress={() => setShowAddressInput(true)}
    >
      <Text style={styles.addAddressText}>+ Add New</Text>
    </TouchableOpacity>
  )}
</View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },

  profileContainer: {
    alignItems: 'center', // Centers the content horizontally
    justifyContent: 'center', // Centers the content vertically if needed
    marginBottom: 16, // Adds spacing below the profile section
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#6200ee',
    marginBottom: 8, // Adds spacing between the image and the text
  },
  changePictureText: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center', // Ensures the text is aligned with the image
  },
  
  finalSaveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#28a745',
    position: 'absolute',
    right: 10, // Align save button to the right
    top: '50%',
    
  },
  finalSaveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#7a7a7a',
    marginBottom: 8,
  }, 
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  pickerInput: {
    width: 100, // Fixed width for picker
    borderColor: '#ddd',
    height:50,
    padding: 10, // Increased padding for better touch area
    borderRadius: 5,
    flex: 0.5, // Adjusted flex to make the picker take more space
    marginRight: 10,
    backgroundColor: '#fff', // Optional: Add background for better visibility
   
  },
  flexInput: {
    flex: 0.5,

    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  
  editButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#6200ee',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }, subheader: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16,
  },
  subheaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  
  saveButton: {
    backgroundColor: '#28a745',
    padding: 7,
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addAddressBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addAddressText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  addressInputContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red color for delete
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
});

export default Profile;
