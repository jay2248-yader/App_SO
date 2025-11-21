import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screen/homeScreen';
import CustomerScreen from '../screen/customerScreen';
import QuotationScreen from '../screen/quotationScreen';
import ReportScreen from '../screen/reportScreen';
import SettingsScreen from '../screen/settingsScreen';
import ProductScreen from '../screen/productScreen';


//Icon
import House from '../assets/Icon/house-solid.svg'
import People from '../assets/Icon/user-solid.svg'
import Document from '../assets/Icon/file-invoice-solid.svg'
import Chart from '../assets/Icon/chart-column-solid.svg'
import Gear from '../assets/Icon/gear-sharp.svg'





const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ขนาด responsive
const isSmallDevice = width < 450;
const ICON_SIZE = isSmallDevice ? 24 : 35;
const FONT_SIZE = isSmallDevice ? 10 : width < 400 ? 12 : 25;
const BUTTON_SIZE = isSmallDevice ? 55 : width < 400 ? 60 : 80;
const BORDER_WIDTH = isSmallDevice ? 6 : 8;
const CONTAINER_HEIGHT = isSmallDevice ? 80 : width < 400 ? 90 : 120;
const TRANSLATE_Y = isSmallDevice ? -10 : -15;

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }) {
  const animatedValues = useRef(
    state.routes.reduce((acc, route) => {
      acc[route.key] = {
        scale: new Animated.Value(state.index === state.routes.indexOf(route) ? 1 : 0.85),
        translateY: new Animated.Value(state.index === state.routes.indexOf(route) ? TRANSLATE_Y : 0),
        opacity: new Animated.Value(state.index === state.routes.indexOf(route) ? 1 : 0.6),
      };
      return acc;
    }, {})
  ).current;

  useEffect(() => {
    state.routes.forEach((route, index) => {
      const isActive = state.index === index;
      const key = route.key;

      if (!animatedValues[key]) {
        animatedValues[key] = {
          scale: new Animated.Value(isActive ? 1 : 0.85),
          translateY: new Animated.Value(isActive ? TRANSLATE_Y : 0),
          opacity: new Animated.Value(isActive ? 1 : 0.6),
        };
      }

      Animated.parallel([
        Animated.spring(animatedValues[key].scale, {
          toValue: isActive ? 1 : 0.85,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValues[key].translateY, {
          toValue: isActive ? TRANSLATE_Y : 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[key].opacity, {
          toValue: isActive ? 1 : 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [state.index]);

  const getIconName = (routeName) => {
    switch (routeName) {
      case 'ຫນ້າຫຼັກ':
        return 'house';
      case 'ລູກຄ້າ':
        return 'people';
      case 'ໃບສະເໜີລາຄາ':
        return 'document-text';
      case 'ລາຍງານ':
        return 'stats-chart';
      case 'ການຕັ້ງຄ່າ':
        return 'settings';
      default:
        return 'help-circle';
    }
  };

  const renderIcon = (routeName, isActive) => {
    const color = isActive ? '#fff' : '#e0e0e0';
    
    switch (routeName) {
      case 'ຫນ້າຫຼັກ':
        return <House width={ICON_SIZE} height={ICON_SIZE} fill={color} />;
      case 'ລູກຄ້າ':
        return <People width={ICON_SIZE} height={ICON_SIZE} fill={color} />;
      case 'ໃບສະເໜີລາຄາ':
        return <Document width={ICON_SIZE} height={ICON_SIZE} fill={color} />;
      case 'ລາຍງານ':
        return <Chart width={ICON_SIZE} height={ICON_SIZE} fill={color} />;
      case 'ການຕັ້ງຄ່າ':
        return <Gear width={ICON_SIZE} height={ICON_SIZE} fill={color} />;
      default:
        return <Ionicons name="help-circle" size={ICON_SIZE} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isActive = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                alignItems: 'center',
                transform: [
                  { scale: animatedValues[route.key]?.scale || new Animated.Value(0.85) },
                  { translateY: animatedValues[route.key]?.translateY || new Animated.Value(0) },
                ],
                opacity: animatedValues[route.key]?.opacity || new Animated.Value(0.6),
              }}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.activeIconWrapper,
                ]}
              >
                {renderIcon(route.name, isActive)}
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? '#fff' : '#e0e0e0' },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Stack Navigator สำหรับ Quotation Flow
function QuotationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuotationList" component={QuotationScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="ຫນ້າຫຼັກ" component={HomeScreen} />
      <Tab.Screen name="ລູກຄ້າ" component={CustomerScreen} />
      <Tab.Screen name="ໃບສະເໜີລາຄາ" component={QuotationStack} />
      <Tab.Screen name="ລາຍງານ" component={ReportScreen} />
      <Tab.Screen name="ການຕັ້ງຄ່າ" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2C4E9D',
    height: CONTAINER_HEIGHT,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: isSmallDevice ? 4 : 8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: isSmallDevice ? 50 : 60,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeIconWrapper: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#3A5BC7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: BORDER_WIDTH,
    borderColor: '#fff',
  },
  label: {
    fontSize: FONT_SIZE,
    marginTop: 2,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 2,
    fontFamily: 'NotoSansLao-Regular',
  },
});