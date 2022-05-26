import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
//import S_botton from './assets/S_botton.js';
import DefaultImage from './assets/starting_page.png';
import S_botton from './components/S_botton.js';

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

export default App = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: DEFAULT_IMAGE }} style={styles.image}/>
             
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        toppadding: 10,
        backgroundColor: '#EBECF0',
        alignItems: 'center',
       justifyContent: 'flex-start'
    }, image: {
                width: 500,
        height: 800,
        justifyContent: "flex-start"
    },
       button: {

    }
    
});

