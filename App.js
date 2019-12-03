import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import  { createAppContainer }  from 'react-navigation';
import  { createStackNavigator } from 'react-navigation-stack';
//import AppDrawerNavigator from './componets/Main';
import DetailsScreen from "./components/Detail";
//import HomeScreen from "./componets/Main";
import App from "./components/Drawer";
import MainContext from "./components/Context";

const initialState = {
  keyword: ""
};

const AppNavigator = createStackNavigator(
  {
    Home: App,
    Details: DetailsScreen
  },
  {
  initialRouteName: "Home",
  headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator)

const MainProvider = () => {
    const [cntx, setcntx] = useState(initialState);
    return(
      <MainContext.Provider value={{cntx, setcntx}}>
        <AppContainer/>
      </MainContext.Provider>
    )
  };

export default MainProvider