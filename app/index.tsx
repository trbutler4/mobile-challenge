import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import { useEffect, useState } from "react";
import { loadWallet, deleteWallet } from "./utils/storage";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

export default function App() {
  const [walletExists, setWalletExists] = useState<boolean>(false);
  const [address, setAddress] = useState<`0x${string}` | undefined>();

  useEffect(() => {
    loadWallet()
      .then((wallet) => {
        if (wallet) {
          setWalletExists(true);
          setAddress(wallet.address);
        } else {
          setWalletExists(false);
          setAddress(undefined);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  function handleDeleteWallet() {
    deleteWallet().then(() => {
      setWalletExists(false);
      setAddress(undefined);
    });
  }

  return (
    <View className="flex-1 justify-between items-center m-10">
      <StatusBar style="auto" />
      <Text className="text-lg font-bold p-4">Mobile Challenge Submission</Text>
      <View>
        {walletExists ? (
          <>
            <Text selectable={true}>
              <Text className="font-bold">Address: </Text>
              {address}
            </Text>
          </>
        ) : (
          <Text>No wallet found, please create one to continue</Text>
        )}
      </View>
      <View>
        {walletExists ? (
          <>
            <CustomButton 
              title="Sign Message" 
              onPress={() => router.replace("/screens/sign_message")} 
            />
            <CustomButton
              title="Sign Transaction"
              onPress={() => router.replace("/screens/sign_transaction")}
            />
            <CustomButton title="Delete Wallet" onPress={handleDeleteWallet} />
          </>
        ) : (
          <CustomButton title="Create Wallet" onPress={() => router.replace("/screens/create_wallet")} />
        )}
      </View>
    </View>
  );
}
