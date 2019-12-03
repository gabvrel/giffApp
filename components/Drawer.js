import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, ScrollView, Dimensions, AppRegistry, TouchableOpacity } from 'react-native';
import { Header, Image, SearchBar, Text, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "./Main";
import MainContext from "./Context";

const categoriesGif = ["Action", "Adjetives", "Animals", "Anime",
    "Art & Desing", "Cartoons & Comics", "Celebrities", "Decades",
    "Emotions", "Food & Drinks", "Gaming", "Holiday", "Interests",
    "Memes", "Movies", "Music", "Nature", "News & Politics", "Reactions",
    "Science", "Sports", "Transportation", "TV"];


const CustomDrawerComponent = props => {
    const { cntx, setcntx } = useContext(MainContext);

    const categories = [
        {
            Action: {
                children: [{ "Crying": "" }, { "Dancing": "" }, { "Eating": "" },{ "Falling": "" }, { "Laughing": "" }, { "Sleeping": "" }, { "Smiling": "" }]
            }
        },
        {
            Adjetives: {
                children: [{ "Cold": "" }, { "Cute": "" },{ "Kawaii": "" }, { "Nostalgia": "" }, { "Trippy": "" }, { "Vintage": "" }, { "Weird": "" }]
            }
        },
        {
            Animals: {
                children: [{ "Cat": "" }, { "Dog": "" },{ "Goat": "" }, { "Hedgehog": "" }, { "Monkey": "" }, { "Otter": "" }, { "Panda": "" }, { "Rabbit": "" }, {"Sloth": ""}]
            }
        },
        {
            Anime: {
                children: [{ "DragonBall": "" }, { "FLCL": "" },{ "Hamtario": "" }, { "Naruto": "" }, { "One_Piece": "" }, { "Pokemon": "" }, { "Sailor_ Moon": "" }, { "Spirited_Away": "" }, {"Trigun": ""}]
            }
        },
        {
            ArtandDesign: {
                children: [{ "Architecture": "" }, { "Cinemagraph": "" },{ "Glich": "" }, { "Loop": "" }, { "Mash_Up": "" }, { "Pixel": "" }, { "Sculpture": "" }, { "Timelapse": "" }, {"Typogaphy": ""}]
            },
            
        },
        {
            CartoonsAndComics: {
                children: [{ "Adventure": "" }, { "Archer": "" },{ "BobsBurgers": "" }, { "Futurama": "" }, { "Minions": "" }, { "RickAndMorty": "" }, { "SpongeBob": "" }, { "TheSimpsons": "" }, {"TrueAndTheRainbow": ""}]
            },
            
        },
        {
            Decades: {
                children: [{ "80s": "" }, { "90s": "" },{ "Vintage": "" }]
            },
            
        },
        {
            Memes: {
                children: [{ "CashMeOutside": "" }, { "Crying": "" },{ "DealWithIt": "" },{ "EverythingsFine": "" }, {"JohnTravolta": ""}, {"Kermit": ""}]
            },
            
        },
        {
            Sports: {
                children: [{ "Baseball": "" }, { "Basketball": "" },{ "Gymnastics": "" },{ "NFL": "" }, {"Skateboarding": ""}, {"SnowBoarding": ""}]
            },
            
        },
    ];

    let initialState = {
        title: "Categories",
        togle: false,
        main: [],
    };

    const [state, setState] = useState(initialState)

    useEffect(() => {
        setState({ ...state, main: categories })
    },
        [])

    const togleMenu = (element, index) => {
        let pystr = Object.keys(element)[0];
        if (state.togle) {
            setcntx({ ...cntx, keyword: pystr.toLowerCase() })
        }
        else {
            let pypath = element[pystr].children;

            setState({ ...state, main: pypath, togle: true, title: pystr });
        }
    };

    return (
        <SafeAreaView style={{
            flex: 1, flexDirection: "row", paddingTop: 45, paddingLeft: 15
            , paddingRight: 15, flexDirection: "column", backgroundColor: "#3c4245"
        }}>
            <ScrollView>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text h2 style={{ marginBottom: 15, color: "#ea168e"}}>{state.title}</Text>
                    {state.togle ? <Icon name="undo" size={30}
                        onPress={() => { setState({ ...state, main: categories, togle: false, title: "Categories" }) }} /> : undefined}
                </View>
                {state.main.map((el, i) => (
                    <TouchableOpacity key={i}
                        onPress={() => togleMenu(el, i)}>
                        <View style={{ flex: 1, backgroundColor: "#232b2b", width: "100%", height: 75, marginBottom: 25, justifyContent: "center", alignItems: "center"}}>
                            <Text h4 style={{ color: "#999999" }}>{Object.keys(el)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const AppDrawerNavigator = createDrawerNavigator({
    Home: HomeScreen
}, {
    contentComponent: CustomDrawerComponent
});

const App = createAppContainer(AppDrawerNavigator);



export default App;