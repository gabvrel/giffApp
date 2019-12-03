import { React } from "react";
import { Icon, Text } from "react-native-elements";


const LeftComponent = ({navigation}) => {
    const openMenu = () =>{
        navigation.openDrawer();
    };

    return(
      <Icon 
      name='menu'
      color="white"
      onPress={openMenu} />
    )
  };



export default LeftComponent