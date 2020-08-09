import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Clipboard,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Root, Toast } from "native-base";
import { useDispatch } from "react-redux";
import { addColor } from "../store/actions/user";
import { makeColor } from "../utils/color";
import invert from "invert-color";
import { ColorWheel } from "react-native-color-wheel";
import colorsys from "colorsys";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomView: {
    width: "100%",
    height: 70,
    backgroundColor: "#EE5407",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
  },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default HomeScreen = (props) => {
  const [copiedColor, setCopiedColor] = useState("#00ee00");

  useEffect(() => {}, []);

  const { navigation } = props;

  const dispatch = useDispatch();

  return (
    <Root>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <SafeAreaView style={styles.container}>
          <ColorWheel
            initialColor={copiedColor}
            onColorChange={(hsv) => console.log({ hsv })}
            onColorChangeComplete={(hsv) =>
              setCopiedColor(colorsys.hsvToHex(hsv))
            }
            style={{ width: Dimensions.get("window").width }}
            thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
          />
        </SafeAreaView>
        <View style={styles.bottomView}>
          <View style={styles.leftContainer} />
          <View style={styles.centerContainer}>
            <TouchableOpacity
              onPress={() =>
                Toast.show({
                  text: `${copiedColor} Copied!`,
                  textStyle: {
                    color: invert(copiedColor),
                  },
                  type: "success",
                  position: "top",
                  style: {
                    backgroundColor: copiedColor,
                  },
                }) ||
                Clipboard.setString(copiedColor) ||
                dispatch(addColor({ color: makeColor(copiedColor) }))
              }
            >
              <FontAwesome name="circle" size={50} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.rightContainer}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => navigation.navigate("History")}>
                <FontAwesome name="history" size={50} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Root>
  );
};
