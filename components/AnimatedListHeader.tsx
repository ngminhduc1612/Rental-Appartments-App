import { Animated, LayoutChangeEvent, Platform, TouchableOpacity, View, FlatList, StyleSheet } from "react-native"
import { useState } from "react";
import { HEADERHEIGHT, LISTMARGIN } from "@/constants"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { Button, Text } from "@ui-kitten/components";
import { Row } from "./Row";

export const AnimatedListHeader = ({ scrollAnimation }: { scrollAnimation: Animated.Value }) => {
    const [offsetAnimation] = useState(new Animated.Value(0));
    const [clampedScroll, setClampedScroll] = useState(
        Animated.diffClamp(
            Animated.add(
                scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp"
                }),
                offsetAnimation
            ),
            0,
            1
        )
    );

    const navbarTranslate = clampedScroll.interpolate({
        inputRange: [0, HEADERHEIGHT],
        outputRange: [0, -HEADERHEIGHT],
        extrapolate: "clamp",
    });

    const onLayout = (event: LayoutChangeEvent) => {
        let { height } = event.nativeEvent.layout
        setClampedScroll(
            Animated.diffClamp(
                Animated.add(
                    scrollAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnimation
                ),
                0,
                height
            )
        )
    }

    const filterButtons = [
        {
            iconName: "filter-variant",
            onPress: () => console.log("filter all")
        },
        {
            label: "Price",
            onPress: () => console.log("price")
        },
        {
            label: "Move-in Date",
            onPress: () => console.log("move in date")
        },
        {
            label: "Pets",
            onPress: () => console.log("pet")
        }
    ]

    return (<Animated.View
        style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 1000,
            height: HEADERHEIGHT,
            backgroundColor: "#fff",
            transform: [{ translateY: navbarTranslate }],
        }}
        onLayout={onLayout}
    >
        <View style={{
            marginTop: 10, 
            marginHorizontal: LISTMARGIN }}>
            <TouchableOpacity
                style={{
                    marginTop: Platform.OS === "ios" ? 50: 30,
                    borderWidth: 1,
                    borderColor: theme["color-gray"],
                    borderRadius: 30,
                    padding: 10,
                }}
                onPress={() => console.log("navigate to input screen")}
            >
                <Row style={{alignItems: "center"}}>
                    <MaterialCommunityIcons
                        name="magnify"
                        color={theme["color-primary-500"]}
                        size={28} 
                    />
                    <Text style={{marginLeft: 10}}>Find a Location</Text>
                </Row>
            </TouchableOpacity>
            <FlatList 
                data={filterButtons}
                horizontal
                style={{marginTop:10}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                    if (item.iconName) {
                        return <Button 
                            appearance={"ghost"}
                            style={[styles.button, {width: 48}]}
                            onPress={item.onPress}
                            accessoryLeft={
                                <MaterialCommunityIcons name={item.iconName as any} size={20} color={theme["color-primary-500"]}/>
                            }>

                        </Button>
                    }
                    return (
                        <Button 
                            appearance="ghost" 
                            style={styles.button} 
                            onPress={item.onPress}
                        >
                            {item.label}
                        </Button>
                    )
                }}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    </Animated.View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        borderColor: theme["color-gray"],
        marginHorizontal: 3,
    }
})