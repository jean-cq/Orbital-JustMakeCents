import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class UserPermissions{
    getCameraPermission = async() => {
        if(Constants.platform.ios){
            const {status} = await Permissions.askAsync(Permissions.CAMERA)
            if (status != 'granted'){
                alert('We need your permission to use your camera roll')
            }
        }else if(Constants.platform.android){
            const {status} = await Permissions.askAsync(Permissions.CAMERA)
            if (status != 'granted'){
                alert('We need your permission to use your camera roll')
            }}
    }
} 
export default new UserPermissions();