import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'
import { useLocalSearchParams } from 'expo-router'

export default function SignaturePage() {
    const { signature } = useLocalSearchParams();

    return (
        <View className="flex-1 justify-between items-center m-10">

            <View>
                <Text>Message Signed Successfully</Text>
                <Text>{signature}</Text>
            </View>

            <View>
                <NavButton title="Go Home" href="/" />
            </View>

        </View>
    )
}