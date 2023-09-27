import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import NavButton from '../components/NavButton';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'

export default function App() {
  const [walletExists, setWalletExists] = useState<boolean>(false)
  const [address, setAddress] = useState<`0x${string}` | undefined>()

  async function loadWallet() {
    const result = await SecureStore.getItemAsync('WALLET')
    const parsed_result = JSON.parse(result)
    if (result) {
      setWalletExists(true)
      setAddress(parsed_result.address)
    } else {
      setWalletExists(false)
      setAddress(undefined)
    }
  }

  useEffect(() => {
    loadWallet()
  }, [])

  return (
    <View className="flex-1 justify-between items-center m-10">
      <StatusBar style="auto" />
      <Text>Welcome to the Tholos Mobile Challenge!</Text>
      <View>
        {walletExists ? 
          <>
          <Text className='text-center'>Wallet Found</Text> 
          <Text>{address}</Text>
          </>
          : <Text>No wallet found, please create one to continue</Text>}
      </View>
      <View>
        {walletExists ? <NavButton title="Sign Message" href="/signing" /> : <NavButton title="Create Wallet" href="/wallet" />}
      </View>
    </View>
  );
}

