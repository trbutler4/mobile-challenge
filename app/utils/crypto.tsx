import { keccak256 } from 'js-sha3';
import { Buffer } from 'buffer';
import EC from 'elliptic-expo/lib/elliptic/ec';

export function createWallet() {
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

    return { public_key: pub, private_key: priv, address: checksum_address }
}