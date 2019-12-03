import React, {useEffect, useContext} from "react";
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Header, Image, SearchBar, Text } from "react-native-elements";
import { NavigationContext } from "react-navigation";

const ImageGrid = props => {
  
  const navigation = useContext(NavigationContext);

    return(
        <View style={{width: Math.round(Dimensions.get("window").width)/2, height: 145}}>
            <TouchableOpacity
              onPress={()=> navigation.navigate("Details",{
              params: props
             }
             )
            }>
             <Image
              style={{ 
              width: null,
              height: "100%",
              resizeMode: "contain"}}
              source={{
                uri: props.images.fixed_width.url,
              }}
              PlaceholderContent={<ActivityIndicator/>}/>
            </TouchableOpacity>
        </View>
    )
};

export default ImageGrid;