import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'

export default function SignaturePage() {
    return (
        <View className="flex-1 justify-between m-10">

            <View className="flex justify-center items-center">
                <Text>Show Signature Page</Text>
            </View>

            <View className="flex items-center justify-center">
                <NavButton title="Go Home" href="/" />
            </View>

        </View>
    )
}