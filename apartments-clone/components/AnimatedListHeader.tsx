import { Animated, LayoutChangeEvent, Platform, TouchableOpacity, View, FlatList, StyleSheet } from "react-native"
import { useState } from "react";
import { HEADERHEIGHT, LISTMARGIN } from "@/constants"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";
import { Button, Text, Divider } from "@ui-kitten/components";
import { Row } from "./Row";
import { HeaderInput } from "./HeaderInput";
import { HeaderFilterButtons } from "./HeaderFilterButtons";
import { HeaderLogistics } from "./HeaderLogistics";

export const AnimatedListHeader = ({ 
    scrollAnimation,
    mapShown,
    setMapShown,
    location,
    availableProperties,
}: { 
    scrollAnimation: Animated.Value;
    mapShown: boolean;
    setMapShown: (bool: boolean) => void;
    location: string;
    availableProperties?: number;
}) => {
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
        inputRange: availableProperties && availableProperties > 1 && !mapShown ? [0, HEADERHEIGHT] : [0, 0],
        outputRange: availableProperties && availableProperties > 1 && !mapShown ? [0, -HEADERHEIGHT] : [0, 0],
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

   

    return (<Animated.View
        style={[
            styles.container,
            {
                transform: [{ translateY: navbarTranslate }],
            }
        ]}
        onLayout={onLayout}
    >
        <View style={[
            styles.defaultMarginHorizontal,
            {
                marginTop: 10,
            }
        ]}>
            <HeaderInput location={location}/>
            <HeaderFilterButtons />
        </View>
        <Divider style={styles.divider} />
        <HeaderLogistics setMapShown={setMapShown} mapShown={mapShown} availableProperties={availableProperties}/>

    </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        height: HEADERHEIGHT,
        backgroundColor: "#fff",
    },
    defaultMarginHorizontal:{
        marginHorizontal: LISTMARGIN,
    },
    divider: {
        backgroundColor: theme["color-gray"]
    }
})