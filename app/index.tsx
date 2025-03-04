import { Text, View,StyleSheet, Image,TouchableOpacity } from "react-native";
// @ts-ignore
import PostImage from "../assets/images/post-it.png"
import {useRouter} from 'expo-router'

 const HomePage =() => {

  const router = useRouter()

  return (
    <View style={style.page}>
      <Image source={PostImage} style={style.image}/>
      <Text style={style.title}>Welcome to Notes</Text>
      <Text style={style.subtitle}>Create your note</Text>

      <TouchableOpacity style={style.button}
      onPress={()=>router.push('/notes')}
      >
        <Text style={style.buttonText}>Click Notes</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    borderRadius: 10,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  }
})

export default HomePage
