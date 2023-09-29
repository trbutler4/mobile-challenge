import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { router } from "expo-router";
import CopyableText from "../../../components/CopyableText";

export default function TransactionSignatureScreen() {
  const { signature, rlp } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-between items-center m-10">
      <Text className="text-center font-bold text-lg p-4">
        Transaction Signed Successfully!
      </Text>
      <View className="space-y-6">
        <View className="fex flex-row justify-between">
          <Text className="font-bold">Signature: </Text>
          <CopyableText textToCopy={`0x${signature}`} textToDisplay={`0x${signature.slice(0,8)} ... ${signature.slice(-8)}`} />
        </View>
        <View className="flex flex-row justify-between">
          <Text className="font-bold">RLP Encoded: </Text>
          <CopyableText textToCopy={`${rlp}`} textToDisplay={`${rlp.slice(0,10)} ... ${rlp.slice(-8)}`} />
        </View>
      </View>

      <View>
        <CustomButton title="Go Home" onPress={() => router.replace("/")} />
      </View>
    </View>
  );
}
