import Toast from 'react-native-toast-message';
import { t } from '../language-pack/language'

export const showToast = (type: "success" | "error", text: string, time?: number, onPress?: () => void, onHide?: () => void) => {
    Toast.show({
        type: type,
        text1: type === "error" ? t.toastMessage.error.title : t.toastMessage.success.title,
        text2: text,
        visibilityTime: time ?? 4000,
        autoHide: true,
        onPress,
        onHide
    });
}