import { View, Text } from 'react-native'
import NavButton from '../../../components/NavButton'
import { useEffect, useState } from 'react';
import { createWallet } from '../../utils/crypto';
import { saveWallet } from '../../utils/storage';

export default function CreateWalletScreen() {
    const [publicKey, setPublicKey] = useState<string | undefined>()
    const [privateKey, setPrivateKey] = useState<string | undefined>()
    const [created, setCreated] = useState<boolean>(false)

    useEffect(() => {
        setCreated(false)

        // generate a wallet
        const wallet = createWallet()

        setPrivateKey(wallet.private_key)
        setPublicKey(wallet.public_key)

        // save wallet information to secure storage 
        saveWallet(wallet.private_key, wallet.public_key, wallet.address as `0x${string}`)
        .then(() => {
            setCreated(true)
        })
        .catch((e) => {
            alert(`Error saving wallet: ${e}`)
        })
    }, [])

    return (
        <View className="flex-1 justify-between items-center m-10">
            <Text className='text-center text-lg font-bold p-4'>Wallet Created!</Text>
            <View>
                {created ?
                    <>
                    <Text className='mb-4'>
                        <Text className='font-bold'>Public Key: </Text>
                        {publicKey}
                    </Text>
                    <Text>
                        <Text className='font-bold'>Private Key: </Text> 
                        {privateKey}
                    </Text>
                    </> 
                    : <Text>Creating wallet...</Text>
                }
            </View>
            <View>
                <NavButton href='/' title='Go Home' />
            </View>
        </View>
    )
}

