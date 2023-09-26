import { View, Text } from "react-native"
import NavButton from "../../components/NavButton"

export default function SigningPage() {
    return (
        <View>
            <Text>Signing Page</Text>
            <NavButton title="Sign" href="/signature" />
        </View>
    )
}