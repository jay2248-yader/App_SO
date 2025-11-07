import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// ขนาด responsive
const isSmallDevice = width < 450;
const ICON_SIZE = isSmallDevice ? 24 : 35;
const FONT_SIZE = isSmallDevice ? 10 : width < 400 ? 12 : 25;
const BUTTON_SIZE = isSmallDevice ? 55 : width < 400 ? 60 : 80;
const BORDER_WIDTH = isSmallDevice ? 6 : 8;
const CONTAINER_HEIGHT = isSmallDevice ? 80 : width < 400 ? 90 : 120;
const TRANSLATE_Y = isSmallDevice ? -10 : -15;

export default function BottomNavigationBar({ tabs, activeTab, onTabPress }) {
  // Animated values สำหรับแต่ละ tab
  const animatedValues = useRef(
    tabs.reduce((acc, tab) => {
      acc[tab.name] = {
        scale: new Animated.Value(tab.name === activeTab ? 1 : 0.85),
        translateY: new Animated.Value(tab.name === activeTab ? TRANSLATE_Y : 0),
        opacity: new Animated.Value(tab.name === activeTab ? 1 : 0.6),
      };
      return acc;
    }, {})
  ).current;

  // Animation เมื่อ activeTab เปลี่ยน
  useEffect(() => {
    tabs.forEach((tab) => {
      const isActive = tab.name === activeTab;

      Animated.parallel([
        Animated.spring(animatedValues[tab.name].scale, {
          toValue: isActive ? 1 : 0.85,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(animatedValues[tab.name].translateY, {
          toValue: isActive ? TRANSLATE_Y : 0,
          friction: 8,
          tension: 50,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValues[tab.name].opacity, {
          toValue: isActive ? 1 : 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [activeTab, tabs]);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => onTabPress(tab.name)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                alignItems: "center",
                transform: [
                  { scale: animatedValues[tab.name].scale },
                  { translateY: animatedValues[tab.name].translateY },
                ],
                opacity: animatedValues[tab.name].opacity,
              }}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.activeIconWrapper,
                ]}
              >
                <Ionicons
                  name={tab.icon}
                  size={ICON_SIZE}
                  color={isActive ? "#fff" : "#e0e0e0"}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#fff" : "#e0e0e0" },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {tab.name}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#2C4E9D",
    height: CONTAINER_HEIGHT,
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingHorizontal: isSmallDevice ? 4 : 8,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: isSmallDevice ? 50 : 60,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
activeIconWrapper: {
  width: BUTTON_SIZE,           // กำหนด width
  height: BUTTON_SIZE,          // กำหนด height เท่ากับ width
  borderRadius: BUTTON_SIZE / 2,// วงกลมเต็ม
  backgroundColor: "#3A5BC7",
  justifyContent: "center",     
  alignItems: "center",         
  borderWidth: BORDER_WIDTH,
  borderColor: "#FFFFFF",
  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 6,
},

  label: {
    fontSize: FONT_SIZE,
    marginTop: 2,
    fontFamily: "NotoSansLao-Regular",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 2,
  },
});
