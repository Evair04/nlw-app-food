import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

export function Loding() {
    return (
        <View className="flex-1 justify-center items-center bg-slate-900">
            <ActivityIndicator size="large" color={colors.white} />
        </View>
    )
}