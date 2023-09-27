import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import EC from 'elliptic-expo/lib/elliptic/ec';
import { keccak256 } from 'js-sha3';
import * as SecureStore from 'expo-secure-store'

export default function WalletPage() {
    const [publicKey, setPublicKey] = useState<string | undefined>()
    const [privateKey, setPrivateKey] = useState<string | undefined>()

    useEffect(() => {
        createWallet()
    }, [])

    function createWallet() {
        const ec = new EC('secp256k1')

        //Generate a new key pair
        const keyPair = ec.genKeyPair()

        // get private key
        const priv = keyPair.getPrivate('hex')

        // Get a public key
        const pubPoint = keyPair.getPublic()
        const pub = pubPoint.encode('hex')

        // take keccak hash of public key
        const pubNoPrefix = pub.slice(2) // dropping the '04' prefix 
        const keccak = keccak256(Buffer.from(pub, 'hex').toString('base64'))

        // address is 0x + last 20 bytes of public key 
        let address = keccak.slice(-40)

        // compute checksum for address
        address = address.toLowerCase().replace('0x', '');
        const hash = keccak256(address).toString();
        let result = '0x';
        for (let i = 0; i < address.length; i++) {
          if (parseInt(hash[i], 16) >= 8) {
            result += address[i].toUpperCase();
          } else {
            result += address[i];
          }
        }
        const checksum_address = `0x${address}`

        // save wallet info to secure storage
        saveWallet(priv, pub, checksum_address as `0x${string}`)
      
        setPublicKey(pub)
        setPrivateKey(priv)
    }

    async function saveWallet(privateKey: string, publicKey: string, address: `0x${string}`) {
        const wallet_data = {
            private_key: privateKey,
            public_ket: publicKey,
            address: address
        }
        await SecureStore.setItemAsync('WALLET', JSON.stringify(wallet_data))
    }

    return (
        <View className="flex-1 justify-between items-center m-10">
            <View>
                <Text className='text-center text-lg font-bold m-2'>Wallet Created</Text>
                {publicKey && <Text>Public Key: {publicKey}</Text>}
                {privateKey && <Text>Private Key: {privateKey}</Text>}
            </View>
            <View>
                <NavButton href='/' title='Go Home' />
            </View>
        </View>
    )
}

