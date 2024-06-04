import { Text, Button } from "@ui-kitten/components";
import { StyleSheet, View, TouchableOpacity, Share } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { theme } from "@/theme";
import { Row } from "../Row";
import { Property } from "@/types/property";
import { callPhoneNumber } from "@/utils/callPhoneNumber";
import { openURL } from "@/utils/openURL";

const formatPhoneNumber = (str: string) => {
    // Bước 1: Làm sạch chuỗi đầu vào bằng cách loại bỏ tất cả các ký tự không phải số
    let cleaned = ("" + str).replace(/\D/g, "");

    // Bước 2: Khớp chuỗi đã làm sạch với một mẫu biểu thức chính quy cho số điện thoại Việt Nam
    let match = cleaned.match(/^(84|0)?(\d{3})(\d{3})(\d{3})$/);

    // Bước 3: Kiểm tra nếu khớp thành công
    if (match) {
        // Loại bỏ mã mở rộng đã khớp và định dạng số điện thoại
        // Bước 4: Xác định mã quốc tế (nếu có)
        let intlCode = match[1] === "84" ? "+84" : (match[1] === "0" ? "0" : "");

        // Bước 5: Tạo chuỗi số điện thoại đã định dạng
        return [intlCode, "(", match[2], ") ", match[3], " ", match[4]].join("");
    }

    // Bước 6: Trả về thông báo mặc định nếu đầu vào không phải là số điện thoại hợp lệ
    return "Give Us A Call";
};


export const ContactSection = ({ property }: { property: Property }) => {
    const navigation = useNavigation();

    return (
        <>
            <Text category={"h5"} style={styles.defaultMarginVertical}>
                Contact
            </Text>
            <TouchableOpacity onPress={() => callPhoneNumber(property.phoneNumber)}>
                <Row style={styles.row}>
                    <MaterialIcons
                        name="smartphone"
                        color={theme["color-info-500"]}
                        size={16}
                    />
                    <Text category={"c1"} status={"info"} style={styles.rowText}>
                        {formatPhoneNumber(property.phoneNumber)}
                    </Text>
                </Row>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    {
                        openURL(property.website)
                    }
                }
            >
                <Row style={styles.row}>
                    <MaterialCommunityIcons name="web" color={theme["color-info-500"]} size={16}/>
                    <Text category={"c1"} status={"info"} style={styles.rowText}>
                        View Property Website
                    </Text>
                </Row>
            </TouchableOpacity>
            <Row style={styles.buttonRow}>
                <Button
                    style={styles.button}
                    appearance="ghost"
                    onPress={() => {
                        navigation.navigate("messageScreen", {
                            propertyID: property.ID,
                            tour: true,
                        });
                    }}
                >
                    Tour
                </Button>
                <Button
                    style={styles.button}
                    appearance="ghost"
                    onPress={() => {
                        navigation.navigate("messageScreen", {
                            propertyID: property.ID,
                        });
                    }}
                >
                    Message
                </Button>
            </Row>
        </>
    );
}

const styles = StyleSheet.create({
    defaultMarginVertical: {
        marginVertical: 10
    },
    row: {
        alignItems: "center",
        paddingVertical: 5,
    },
    rowText: {
        marginLeft: 10,
    },
    buttonRow: {
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    button: {
        borderColor: theme["color-primary-500"],
        borderWidth: 1,
        width: "45%",
    }
})