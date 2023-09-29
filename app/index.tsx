import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import NavButton from '../components/NavButton';
import { useEffect, useState } from 'react';
import { loadWallet, deleteWallet } from './utils/storage';

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

  function handleDeleteWallet() {
    deleteWallet().then(() => {
      setWalletExists(false)
      setAddress(undefined)
    })
  }

  return (
    <View className="flex-1 justify-between items-center m-10">
      <StatusBar style="auto" />
      <Text className='text-lg font-bold p-4'>Mobile Challenge Submission</Text>
      <View>
        {walletExists ? 
          <>
          <Text selectable={true}>
            <Text className='font-bold'>Address: </Text> 
            {address}
          </Text>
          </>
          : <Text>No wallet found, please create one to continue</Text>}
      </View>
      <View>
        {walletExists ? 
          <>
          <NavButton title="Sign Message" href="/screens/sign_message" /> 
          <NavButton title="Sign Transaction" href="/screens/sign_transaction" /> 
          <View className='w-64 m-2'>
            <Button title='Delete Wallet' onPress={handleDeleteWallet} />
          </View>
          </>
          : <NavButton title="Create Wallet" href="/screens/create_wallet" />}
      </View>
    </View>
  );
}

