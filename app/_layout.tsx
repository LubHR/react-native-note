import { Stack } from "expo-router";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const  HeaderLogout = () =>{
  const {user, logout} = useAuth()

  return user ? (
     <TouchableOpacity style={style.logoutButton} onPress={logout}>
       <Text style={style.logoutText}>Logout</Text>
     </TouchableOpacity>
  ) : null
};


const RootLayout = () => {
  return (
     <AuthProvider>
       <Stack
          screenOptions={{
            headerStyle: { backgroundColor: 'green' },
            headerTintColor: 'orange',
            headerTitleStyle: { fontSize: 20, fontWeight: 'bold' },
            headerRight:() => <HeaderLogout/>,
            contentStyle: { paddingHorizontal: 10, paddingTop: 10, backgroundColor: 'white' },
          }}
       >
         <Stack.Screen name='index' options={{ title: 'Home' }} />
         <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
         <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
       </Stack>
     </AuthProvider>
  );
}

const style = StyleSheet.create({
  logoutButton:{
    marginRight:15,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:'#1bce41',
    borderRadius:8
  },
  logoutText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  },
})

export default RootLayout;
