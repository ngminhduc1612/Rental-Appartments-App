import { ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Row } from "./Row";
import { theme } from "@/theme";

export const Stars = ({
    score,
    style,
}: {
    score: number;
    style?: ViewStyle | ViewStyle[];
}) => {
    return (
        <Row style={style}>
            {[1, 2, 3, 4, 5].map((item, index) => {
                let demicalValue = score % 1;  //Phan le (vidu: 0,5)
                let compareScore = score | 0;  //Phan chan (vidu: 4)

                if (score / item >= 1) {
                    return (
                        <MaterialCommunityIcons
                            key={item}
                            name="star"
                            size={24}
                            color={theme["color-primary-500"]}
                        />
                    )
                }
                // Trường hợp 3.5 (3.5 / 4 != 1) cần thể hiện 0.5
                else if (demicalValue > 0 && compareScore === index) {
                    if (demicalValue >= 0.5)
                        return (
                            <MaterialCommunityIcons
                                key={item}
                                name="star-half-full"
                                size={24}
                                color={theme["color-primary-500"]}
                            />
                        )
                };

                return (
                    <MaterialCommunityIcons
                        key={item}
                        name="star-outline"
                        size={24}
                        color={theme["color-primary-500"]}
                    />
                )
            })}
        </Row>
    )
};
