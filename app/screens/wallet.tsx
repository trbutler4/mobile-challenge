import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'
import { useEffect, useState } from 'react';
import { createWallet } from '../utils/crypto';
import { saveWallet } from '../utils/storage';

export default function WalletPage() {
    const [publicKey, setPublicKey] = useState<string | undefined>()
    const [privateKey, setPrivateKey] = useState<string | undefined>()

    useEffect(() => {
        // generate a wallet
        const wallet = createWallet()

        setPrivateKey(wallet.private_key)
        setPublicKey(wallet.public_key)

        // save wallet information to secure storage 
        saveWallet(wallet.private_key, wallet.public_key, wallet.address as `0x${string}`)
        .then(() => console.log('wallet generated'))
        .catch((e) => console.error(e))

    }, [])


    return (
        <View className="flex-1 justify-between items-center m-10">
            <View>
                <Text className='text-center text-lg font-bold p-4'>Wallet Created!</Text>
                {publicKey && 
                    <Text>
                        <Text className='font-bold'>Public Key: </Text>
                        {publicKey}
                    </Text>
                }

                {privateKey && 
                    <Text>
                        <Text className='font-bold'>Private Key: </Text> 
                        {privateKey}
                    </Text>
                }
            </View>
            <View>
                <NavButton href='/' title='Go Home' />
            </View>
        </View>
    )
}

