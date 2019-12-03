import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, ScrollView, Dimensions, Share, ImageBackground } from 'react-native';
import { Header, Image, SearchBar, Text, SocialIcon, Avatar, Icon, Button } from "react-native-elements";
import { NavigationContext, withNavigation } from "react-navigation";
import { Linking } from "expo";
import BackgroundPattern from "../assets/bck_grey.png";

const DetailsScreen = () => {
    let initialState = {
        isloading: true,
        gifObj: {}
    };

    const navigation = useContext(NavigationContext);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        try {
            const data = navigation.getParam("params");
            setState({ ...state, isloading: false, gifObj: data });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: state.gifObj.url
            });

        } catch (err) {
            alert(err.message)
        }
    };

    return (

            <View style={styles.container}>
            <ImageBackground source={BackgroundPattern}
            style={{width: "100%", height: "100%", flex: 1}}>
                {state.isloading ?
                    <ActivityIndicator />
                    :
                    <View style={styles.objspe}>
                        <View style={{ backgroundColor: "black", width: 50, position: "absolute", right: 0, top: 0, zIndex: 2 }}>
                            <Icon
                                name='clear'
                                color="white"
                                size={50}
                                onPress={() => { navigation.navigate("Home") }
                                } />
                        </View>
                        <Image
                            style={{ width: null, height: 350, resizeMode: "contain" }}
                            source={{
                                uri: state.gifObj.images.downsized_medium.url
                            }}
                        />
                        <Button
                            containerStyle={{ marginTop: 50 }}
                            buttonStyle={{ backgroundColor: "#ea168e" }}
                            title="Share"
                            type="solid"
                            titleStyle={{ fontSize: 30 }}
                            icon={
                                <Icon
                                    name="share"
                                    size={35}
                                    color="white"
                                    containerStyle={{ marginRight: 15 }}
                                />
                            }
                            onPress={onShare}
                        />

                    </View>
                }
                </ImageBackground>
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3c4245", flexDirection: "column",

    },
    objspe: {
        justifyContent: "space-evenly",
        marginTop: 100,
        position: "relative"
    }
});

export default withNavigation(DetailsScreen) 