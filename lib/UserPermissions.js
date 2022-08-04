import Constants from 'expo-constants';
import{Camera} from 'expo-camera';


class UserPermissions{
    getCameraPermission = async() => {
        if(Constants.platform.ios){
            const {status} = await Camera.getCameraPermissionsAsync();
            if (status != 'granted'){
                alert('We need your permission to use your camera roll')
            }
        }else if(Constants.platform.android){
            const {status} = await Camera.getCameraPermissionsAsync();
            if (status != 'granted'){
                alert('We need your permission to use your camera roll')
            }}
    }
} 
export default new UserPermissions();