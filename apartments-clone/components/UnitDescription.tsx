import { StyleSheet, View } from "react-native";
import { Button, Divider } from "@ui-kitten/components";

import { ModalHeader } from "./ModalHeader";
import { Row } from "./Row";
import { theme } from "@/theme";
import { DescriptionInput } from "./DescriptionInput";



export const UnitDescription = ({
    field,
    description,
    setDescription,
    cancel,
}: {
    field: string;
    description: string;
    setDescription: (field: string, values: any) => void;
    cancel?: () => void;
}) => {
    

    const handleClearPressed = () => {
        setDescription(field, "");
    }

    return (
        <View>
            <ModalHeader
                XShown
                text="Unit Description"
                onPress={cancel ? cancel : undefined}
            />
            <View style={styles.container}>
                <DescriptionInput
                    field={field}
                    setDescription={setDescription}
                    value={description}
                    autoFocus
                />

                <Divider style={[styles.defaultMarginTop, styles.divider]} />

                <Row style={[styles.row, styles.defaultMarginTop]}>
                    <Button
                        style={[styles.button, styles.clearButton]}
                        appearance="ghost"
                        onPress={handleClearPressed}
                    >
                        Clear
                    </Button>
                    <Button
                        style={styles.button}
                        onPress={cancel}
                    >
                        Save
                    </Button>
                </Row>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    defaultMarginTop: {
        marginTop: 10,
    },
    divider: {
        backgroundColor: theme["color-gray"],
    },
    row: {
        justifyContent: "space-between",
    },
    button: {
        width: "45%",
    },
    clearButton: {
        borderColor: theme["color-primary-500"],
    }
});