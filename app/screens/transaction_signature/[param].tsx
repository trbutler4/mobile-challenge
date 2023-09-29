import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import NavButton from '../../../components/NavButton';

export default function TransactionSignatureScreen() {
    const { signature, rlp } = useLocalSearchParams();
    console.log(signature)
    console.log(rlp)

    return (
        <View className="flex-1 justify-between items-center m-10">
            <Text className='text-center font-bold text-lg p-4'>Transaction Signed Successfully!</Text>
            <View>
                <Text>
                    <Text className='font-bold'>Signature: </Text>
                    {`0x${signature}`}
                </Text>
                <Text className='mt-4'>
                    <Text className='font-bold'>RLP Encoded Transaction: </Text>
                    {rlp}
                </Text>
            </View>

            <View>
                <NavButton title="Go Home" href="/" />
            </View>

        </View>
    )
}