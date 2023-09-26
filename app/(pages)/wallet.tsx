import { View, Text } from 'react-native'
import { Link } from 'expo-router';

export default function WalletPage() {
    return (
        <View>
            <Text>Wallet Page</Text>
            <Link href="/">Go Home</Link>
        </View>
    )
}