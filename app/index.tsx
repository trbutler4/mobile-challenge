import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity,  } from "react-native";
import { useEffect, useState } from "react";
import { loadWallet, deleteWallet } from "./utils/storage";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";
import CopyableText from "../components/CopyableText";

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
      <View>
        <Text className="text-lg font-bold p-4 text-center">Mobile Challenge Submission</Text>
        <Text className="text-xs text-center">Created By Thomas Butler</Text>
      </View>
      <View>
        {walletExists ? (
          <View className="flex flex-row">
              <Text className="font-bold">Address: </Text>
              <CopyableText textToCopy={address} textToDisplay={`${address?.slice(0,8)}...${address?.slice(-8)}`}/>
          </View>
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
          <CustomButton
            title="Create Wallet"
            onPress={() => router.replace("/screens/create_wallet")}
          />
        )}
      </View>
    </View>
  );
}
