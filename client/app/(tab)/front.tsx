
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import CurrencyConverter from '../Home/currencyconverter';
import Header from '../Header';
import Sidebar from '../Sidebar/sidebar'
const Home = () => {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleProfilePress = () => {
    setIsSidebarOpen(true); // Open sidebar when profile is pressed
  };
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false); // Close sidebar
  };

  return (
    <ScrollView style={styles.container}>
      <View>
      <Header onProfilePress={handleProfilePress} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <CurrencyConverter />
      </View>
      <Text style={styles.title}>Transfer Money</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconBox}
          activeOpacity={0.7}
        > 
          <Link href="/MoneyTransfer/ToMobileNo">
            <View style={styles.iconTextWrapper}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name="mobile-alt" size={18} color="white" />
              </View>
              <Text style={styles.iconText} numberOfLines={2}>
                To Mobile Number
              </Text>
            </View>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBox}
          activeOpacity={0.7}
        >
          <Link href="/MoneyTransfer/ToBank">
            <View style={styles.iconTextWrapper}>
              <View style={styles.iconBackground}>
                <MaterialIcons name="account-balance" size={18} color="white" />
              </View>
              <Text style={styles.iconText} numberOfLines={2}>
                To Bank/UPI ID
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBox}
          activeOpacity={0.7}
        >
          <Link href="/MoneyTransfer/ToSelf">
            <View style={styles.iconTextWrapper}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name="wallet" size={18} color="white" />
              </View>
              <Text style={styles.iconText} numberOfLines={2}>
                To Self Account
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBox}
          activeOpacity={0.7}
        >
          <Link href="/MoneyTransfer/CheckBalance">
            <View style={styles.iconTextWrapper}>
              <View style={styles.iconBackground}>
                <FontAwesome5 name="hand-holding-usd" size={18} color="white" />
              </View>
              <Text style={styles.iconText} numberOfLines={2}>
                Check Balance
              </Text>
            </View>
          </Link>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  iconBox: {
    width: '22%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconBackground: {
    width: 40,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    marginTop: 8,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  iconTextWrapper: {
    flexDirection: 'column',   // Aligns icon and text side by side
    alignItems: 'center',   // Vertically centers icon and text
    justifyContent: 'flex-start',  // Adjust as needed, 'center' or 'space-between'
  },
});

export default Home;


