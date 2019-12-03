import React, { useState, useEffect, lazy, Suspense, useContext,createContext } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView, Dimensions, AppRegistry } from 'react-native';
import { Header, Image, SearchBar, Text, Icon } from "react-native-elements";
import { NavigationContext, withNavigation } from "react-navigation";
const ImageGrid = lazy(() => import("./ImageGrid"));
import MainContext from "./Context";

const api_key = "../APIKEY";
let limit = 30;

const grid_url = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${limit}`;

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 15;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const HomeScreen = () => {
  const  {cntx, setcntx}  = useContext(MainContext);
  
  let initialState = {
    gifArr: [],
    offset: 6,
    search: "",
    title: "Trending",
    isVisible: false,
    categories: []
  };

  const [state, setState] = useState(initialState);
  const navigation = useContext(NavigationContext);

  const getGifDataTrending = async () => {
    try {
      const response_grid = await fetch(grid_url);
      const responseJsonGrid = await response_grid.json();

      setState({ ...state, gifArr: responseJsonGrid.data });
    } catch (err) {
      console.error(err)
    }
  };

  const SearchGif = async () => {
    try { 
      let search_url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${state.search}&limit=${limit}`;    
      const response_grid = await fetch(search_url);
      const responseJsonGrid = await response_grid.json();
      setState({ ...state, gifArr: responseJsonGrid.data, offset: 6, title:state.search})
    } catch (err) {
      console.error(err)
    }
  };

  const updateSearch = search => {
    setState({ ...state, search });
  };

  useEffect(() => {
    getGifDataTrending();
  }, []);

  useEffect(() =>{
    if (cntx.keyword != "" && state.search != cntx.keyword){
      searchfromBar();
    }else if(cntx.keyword != "" && state.search == cntx.keyword){
      navigation.toggleDrawer();
      setcntx({ ...cntx, keyword: "" })
      SearchGif();
      
    }
  });

  const searchfromBar = async() => {
    try{
    setState({...state, search:cntx.keyword, title: cntx.keyword});
    }
    catch(err){
      console.log(err)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setState({ ...state, offset: state.offset + 6 })
          }
        }}>
        <Header
          leftComponent={<Icon 
            name='menu'
            color="white"
            onPress={()=>
              navigation.openDrawer()
            }/>}
          centerComponent={{ text: "Giff App", style: { color: "#fff" } }}
          backgroundColor="#3c4245"
        />
        <View style={{flex: 1}}>
          <Image
            style={{ width: "100%", height: 240 }}
            source={{
              uri: "https://media3.giphy.com/media/xT4uQulxzV39haRFjG/giphy.gif?cid=fd06ff1b9d4c7262536b358a46f011a08d709bba145a8e5e&rid=giphy.gif"
            }}
            PlaceholderContent={<ActivityIndicator />} />
          <Text h2 style={{transform: [{ rotate: "330deg" }], position: "absolute", top:100, right: 30, color: "#ea168e"}}>{state.title}</Text>
        </View>
        <SearchBar
          placeholder="Search for gifs..."
          onChangeText={updateSearch}
          value={state.search}
          onSubmitEditing={SearchGif}
        />
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "stretch",
        }}>
          {
            state.gifArr.slice(0, state.offset).map((el, i) =>
              <Suspense key={el.id} fallback={<View style={{flex: 1, backgroundColor: "blue"}}></View>}>
                <ImageGrid  {...el} />
              </Suspense>
            )
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3c4245"
  },
  image: {
    width: Math.round(Dimensions.get("window").width) / 2,
    borderColor: "white",
    borderWidth: 1
  }
});


export default HomeScreen;