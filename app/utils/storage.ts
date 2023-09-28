
import * as SecureStore from 'expo-secure-store'

const WALLET = 'WALLET'

export async function saveWallet(privateKey: string, publicKey: string, address: `0x${string}`) {
    // saving all info together to prevent having to recalculate it 
    // maybe better to store each seperately?
    const wallet_data = {
        private_key: privateKey,
        public_key: publicKey,
        address: address
    }
    await SecureStore.setItemAsync(WALLET, JSON.stringify(wallet_data))
}

export async function loadWallet() {
    const result = await SecureStore.getItemAsync(WALLET)
    if (result) {
        const parsed_result = JSON.parse(result)
        return parsed_result
    } else {
        return null
    }
}

export async function deleteWallet() {
    const result = await SecureStore.deleteItemAsync(WALLET)
}