import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { createWallet } from "../../utils/crypto";
import { saveWallet } from "../../utils/storage";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";
import CopyableText from "../../../components/CopyableText";

export default function CreateWalletScreen() {
  const [publicKey, setPublicKey] = useState<string | undefined>();
  const [privateKey, setPrivateKey] = useState<string | undefined>();
  const [created, setCreated] = useState<boolean>(false);

  useEffect(() => {
    setCreated(false);

    // generate a wallet
    const wallet = createWallet();

    setPrivateKey(wallet.private_key);
    setPublicKey(wallet.public_key);

    // save wallet information to secure storage
    saveWallet(
      wallet.private_key,
      wallet.public_key,
      wallet.address as `0x${string}`,
    )
      .then(() => {
        setCreated(true);
      })
      .catch((e) => {
        alert(`Error saving wallet: ${e}`);
      });
  }, []);

  return (
    <View className="flex-1 justify-between items-center m-10">
      <Text className="text-center text-lg font-bold p-4">Wallet Created!</Text>
      <View>
        {created ? (
          <>
            <View className="flex flex-row mb-6">
              <Text className="font-bold">Public Key: </Text>
              <CopyableText
                textToCopy={publicKey}
                textToDisplay={`${publicKey.slice(0, 8)} ... ${publicKey.slice(
                  -8,
                )}`}
              />
            </View>
            <View className="flex flex-row">
              <Text className="font-bold">Private Key: </Text>
              <CopyableText
                textToCopy={privateKey}
                textToDisplay={`${privateKey.slice(
                  0,
                  8,
                )} ... ${privateKey.slice(-8)}`}
              />
            </View>
          </>
        ) : (
          <Text>Creating wallet...</Text>
        )}
      </View>
      <View>
        <CustomButton title="Go Home" onPress={() => router.replace("/")} />
      </View>
    </View>
  );
}
