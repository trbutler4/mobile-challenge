import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import NavButton from '../components/NavButton';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'

export default function App() {
  const [walletExists, setWalletExists] = useState<boolean>(false)

  async function loadPrivateKey() {
    let result = await SecureStore.getItemAsync('PRIVATE_KEY')
    if (result) {
      setWalletExists(true)
    } else {
      setWalletExists(false)
    }
  }

  useEffect(() => {
    loadPrivateKey()
  }, [])

  return (
    <View className="flex-1 justify-between items-center m-10">
      <StatusBar style="auto" />
      <Text>Welcome to the Tholos Mobile Challenge!</Text>
      <View>
        {walletExists ? <Text>Wallet Found</Text> : <Text>No wallet found, please create one to continue</Text>}
      </View>
      <View>
        {walletExists ? <NavButton title="Sign Message" href="/signing" /> : <NavButton title="Create Wallet" href="/wallet" />}
      </View>
    </View>
  );
}

