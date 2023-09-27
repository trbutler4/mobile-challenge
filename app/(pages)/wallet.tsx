import { View, Text } from 'react-native'
import NavButton from '../../components/NavButton'
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import EC from 'elliptic-expo/lib/elliptic/ec';
import { keccak256 } from 'js-sha3';

export default function WalletPage() {
    const [publicKey, setPublicKey] = useState<string | undefined>()
    const [address, setAddress] = useState<`0x${string}` | undefined>()
    const [privateKey, setPrivateKey] = useState<string | undefined>()

    useEffect(() => {
        createWallet()
    }, [])

    function createWallet() {
        console.log("####################################################")
        const ec = new EC('secp256k1')

        //Generate a new key pair
        const keyPair = ec.genKeyPair()
        //const keyPair = ec.keyFromPrivate('1234', 'hex')

        // get private key
        const priv = keyPair.getPrivate('hex')
        console.log(`PRIVATE KEY: \n${priv}`)

        // Get a public key
        const pubPoint = keyPair.getPublic()
        const pub = pubPoint.encode('hex')
        console.log(`PUBLIC KEY: \n${pub}`)

        // take keccak hash of public key
        const pubNoPrefix = pub.slice(2) // dropping the '04' prefix 
        //const keccak = keccak256(Buffer.from(pubNoPrefix, 'hex'))
        const keccak = keccak256(Buffer.from(pub, 'hex').toString('base64'))
        console.log(`KECCAK:\n${keccak}`)

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
        console.log(`WALLET ADDRESS: ${checksum_address}`)
      
        setPublicKey(pub)
        setPrivateKey(priv)
        setAddress(checksum_address as `0x${string}`)
    }

    return (
        <View className="flex-1 justify-between items-center m-10">
            <View>
                <Text>Wallet Page</Text>
                {address && <Text>Address: {address}</Text>}
                {publicKey && <Text>Public Key: {publicKey}</Text>}
                {privateKey && <Text>Private Key: {privateKey}</Text>}
            </View>
            <View>
                <NavButton href='/' title='Go Home' />
            </View>
        </View>
    )
}

