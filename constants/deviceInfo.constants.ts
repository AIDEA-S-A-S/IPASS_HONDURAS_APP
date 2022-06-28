import {Dimensions, StatusBar} from 'react-native';

export const windowsWidth = Dimensions.get('window').width;
export const windowsHeight = Dimensions.get('window').height - (StatusBar.currentHeight || 0);
export const statusBarHeight = StatusBar.currentHeight || 0;
