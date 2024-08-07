import * as ImagePicker from "expo-image-picker"

export const pickImage = async (images: string[], field: string, setImages: (field: string, values: any) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
    });

    if (!result.canceled) {
        const basedImage = `data:image/jpeg;base64,${result.assets[0].base64}`;
        const newImages = [...images];
        newImages.push(basedImage);

        setImages(field, newImages);
    }
};