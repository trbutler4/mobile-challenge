import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import CopyableText from "../../../components/CopyableText";

export default function MessageSignatureScreen() {
  const { signature } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-between items-center m-10">
      <Text className="text-center font-bold text-lg p-4">
        Message Signed Successfully!
      </Text>
      <View>
        <View className="flex flex-row">
          <Text className="font-bold">Signature: </Text>
          <CopyableText textToCopy={`0x${signature}`} textToDisplay={`0x${signature.slice(0,8)} ... ${signature.slice(-8)}`} />
        </View>
      </View>

      <View>
        <CustomButton title="Go Home" onPress={() => router.replace("/")} />
      </View>
    </View>
  );
}
