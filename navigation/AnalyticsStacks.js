<<<<<<< Updated upstream
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Animated, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import A_week from '../screens/A_week.js';
import A_month from '../screens/A_month.js';
import A_year from '../screens/A_year.js';

const Tab = createMaterialTopTabNavigator();

export default function AnalyticsStacks() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 140 },
          tabBarStyle: { backgroundColor: 'yellow' },
        }}
      >
        <Tab.Screen name="Week" component={A_week} />
        <Tab.Screen name="Month" component={A_month}/>
        <Tab.Screen name="Year" component={A_year}/>
      </Tab.Navigator>
  );
}
=======
// JavaScript source code
import React from 'react';
import {Button, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TouchableHighlight} from 'react-native';

import {createNavigator,createNavigationContainer, TabRouter, addNavigationHelpers} from '@react-navigation';


import A_week from '../screens/A_week';
import A_month from '../screens/A_month';
import A_year from '../screens/A_year';

const { width, height } = Dimensions.get('window');


    //set tabs
    const CustomTabBar = ({
        navigation
    }) => {
        console.log('TabBar navigation ============' + navigation.state.index);

        const { routes } = navigation.state;
        let selectedIndex = navigation.state.index;
        let isSelected = false;

        return (

            <View style={styles.tabContainer}>
                {
                    routes.map((route, index) => {

                        //如果当前选中该index的router
                        selectedIndex === index ? isSelected = true : isSelected = false;

                        //显示不同外观
                        let textColor = isSelected ? 'yellow' : 'gray';

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(route.routeName);
                                }}
                                key={route.routeName}
                                style={styles.tab}
                            >
                                <Text style={{ color: textColor, fontSize: 12 }}>{route.routeName}</Text>
                            </TouchableOpacity>
                        )
                    })}
            </View>
        );
    };

    //设置TabBar
    const CustomTabView = ({
        router,
        navigation
    }) => {
        console.log('navigation ============>>>>>' + navigation.state.index);

        const { routes, index } = navigation.state;
        const ActiveScreen = router.getComponentForState(navigation.state);

        return (
            <View style={styles.container}>
                <ActiveScreen
                    navigation={addNavigationHelpers({
                        ...navigation,
                        state: routes[index],
                    })}
                />
                <CustomTabBar navigation={navigation} />

            </View>
        );
    };

    //自定义导航路由
    const CustomTabRouter = TabRouter({

        Week: {
            screen: A_week,
        },
        Month: {
            screen: A_month,
        },
        Year: {
            screen: A_month,
        }
    }, {
        initialRouteName: 'Week'
    });

//创建自定义TabBar
const CustomTabs = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView));
export default Analytics = () => {

    return (
        <View style={{ justifyContent: 'center' }}>
            <CustomTabs/>

        </View>
        
        )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    tabContainer: {
        flexDirection: 'row',
        height: 48,
        borderTopWidth: 1,
        borderColor: 'lightgray'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    }
});

>>>>>>> Stashed changes
