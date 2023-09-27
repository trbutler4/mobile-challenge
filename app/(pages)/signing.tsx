import { View, Text, TextInput } from "react-native"
import NavButton from "../../components/NavButton"

export default function SigningPage() {
    return (
        <View className="flex-1 justify-between m-10">
            <View className="flex justify-center items-center">
                <Text>Signing Page</Text>
            </View>

            <View className="flex items-center justify-center">
                <Text className="m-2">Enter Message</Text>
                <TextInput 
                    className="border w-4/5 h-32"
                    editable
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    scrollEnabled
                />
                <NavButton title="Sign" href="/signature" />
            </View>
        </View>
    )
}