import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'

export default function WalletPage() {
    return (
        <View className="flex-1 justify-between m-10">

            <View className='flex justify-center items-center'>
                <Text>Wallet Page</Text>
            </View>

            <View className='flex justify-center items-center'>
                <NavButton href='/' title='Go Home' />
            </View>
        </View>
    )
}

