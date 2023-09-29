import { View, Text } from 'react-native'
import NavButton from '../../../components/NavButton'
import { useLocalSearchParams } from 'expo-router'

export default function MessageSignatureScreen() {
    const { signature } = useLocalSearchParams();

    return (
        <View className="flex-1 justify-between items-center m-10">
            <Text className='text-center font-bold text-lg p-4'>Message Signed Successfully!</Text>
            <View>
                <Text selectable={true} >
                    <Text className='font-bold'>Signature: </Text>
                    {`0x${signature}`}
                </Text>
            </View>

            <View>
                <NavButton title="Go Home" href="/" />
            </View>

        </View>
    )
}