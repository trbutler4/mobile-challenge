import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import NavButton from '../components/NavButton';
import { useEffect, useState } from 'react';
import { loadWallet } from './utils/storage';

export default function App() {
  const [walletExists, setWalletExists] = useState<boolean>(false)
  const [address, setAddress] = useState<`0x${string}` | undefined>()

  useEffect(() => {
    loadWallet()
    .then((wallet) => {
      if (wallet) {
        setWalletExists(true)
        setAddress(wallet.address)
      } else {
        setWalletExists(false)
        setAddress(undefined)
      }
    })
    .catch((e) => console.error(e))
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
        {walletExists ? <NavButton title="Sign Message" href="/screens/signing" /> : <NavButton title="Create Wallet" href="/screens/wallet" />}
      </View>
    </View>
  );
}

