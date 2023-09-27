import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import NavButton from '../components/NavButton';
import { useState } from 'react';

export default function App() {
  const [walletExists, setWalletExists] = useState<boolean>(false)

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

