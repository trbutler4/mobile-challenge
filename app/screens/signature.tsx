import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'

export default function SignaturePage() {
    return (
        <View className="flex-1 justify-between m-10">

            <View>
                <Text>Show Signature Page</Text>
            </View>

            <View>
                <NavButton title="Go Home" href="/" />
            </View>

        </View>
    )
}