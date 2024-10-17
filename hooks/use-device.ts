import { Alert, Platform } from "react-native";
import {
	requestCameraPermissionsAsync,
	requestMediaLibraryPermissionsAsync,
	launchImageLibraryAsync,
	MediaTypeOptions,
	launchCameraAsync,
} from "expo-image-picker";

type ImageResult = {
	base64: string | undefined | null;
	uri: string;
};

export const useDevice = () => {
	const requestPermission = async () => {
		if (Platform.OS !== "web") {
			const { status: cameraStatus } = await requestCameraPermissionsAsync();
			const { status: mediaStatus } =
				await requestMediaLibraryPermissionsAsync();

			if (cameraStatus !== "granted" || mediaStatus !== "granted") {
				Alert.alert("Veuillez approuver l'accès");
			}
		}
	};

	const pickImage = async (): Promise<ImageResult | undefined> => {
		await requestPermission();

		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 0.5,
			base64: true,
		});

		if (!result.canceled) {
			return { base64: result.assets[0].base64, uri: result.assets[0].uri };
		}
	};

	const takePicture = async (): Promise<ImageResult | undefined> => {
		await requestPermission();

		const result = await launchCameraAsync({
			mediaTypes: MediaTypeOptions.All,
			aspect: [4, 3],
			quality: 0.5,
			base64: true,
		});

		if (!result.canceled) {
			return { base64: result.assets[0].base64, uri: result.assets[0].uri };
		}
	};

	return { pickImage, takePicture };
};
