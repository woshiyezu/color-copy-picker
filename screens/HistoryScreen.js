import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Clipboard,
  Alert,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch } from "react-redux";
import { deleteColor } from "../store/actions/user";
import { getColor } from "./utils/color";
import { useSelector } from "react-redux";
import invert from "invert-color";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});

const rowTranslateAnimatedValues = {};

export default SwipeToDelete = () => {
  const user = useSelector((state) => state.user);
  const { colors } = user;

  colors.forEach((item) => {
    rowTranslateAnimatedValues[`${item.key}`] = new Animated.Value(1);
  });

  const [listData, setListData] = useState(colors);

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        console.log("-----------------");
        console.log(key);
        console.log(value);
        console.log("-----------------");
        dispatch(deleteColor({ color: getColor(key, value) }));
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        this.animationIsRunning = false;
      });
    }
  };

  const rowFront = (color) => {
    return {
      alignItems: "flex-start",
      backgroundColor: color,
      borderBottomColor: "black",
      borderBottomWidth: 1,
      justifyContent: "center",
      height: 50,
      paddingLeft: 20,
    };
  };

  const renderItem = (data) => (
    <Animated.View
      style={[
        styles.rowFrontContainer,
        {
          height: rowTranslateAnimatedValues[data.item.key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50],
          }),
        },
      ]}
    >
      <TouchableHighlight
        onPress={() =>
          Alert.alert(`${data.item.code} Copied!`) ||
          Clipboard.setString(data.item.code)
        }
        style={rowFront(data.item.code)}
        underlayColor={"#AAA"}
      >
        <View>
          <Text style={{ color: invert(data.item.code) }}>
            {data.item.code}
          </Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <SwipeListView
        disableRightSwipe
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get("window").width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        keyExtractor={(rowData, index) => {
          return rowData.key.toString();
        }}
      />
    </View>
  );
};
