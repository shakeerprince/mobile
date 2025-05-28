import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Alert, Text, TouchableOpacity } from 'react-native'
import { styles } from '../assets/styles/home.styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../constants/colors'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?",[
      {text: "Cancel", style: "cancel"},
      {text: "Logout", style: "destructive", onPress:signOut}
    ])
  }

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name='log-out-outline' sixe={20} color={COLORS.text}/>
    </TouchableOpacity>
  )
}