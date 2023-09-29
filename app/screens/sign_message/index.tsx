import {
  View,
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { loadWallet } from "../../utils/storage";
import { useState } from "react";
import { signMessage } from "../../utils/crypto";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";

export default function SignMessageScreen() {
  const [message, setMessage] = useState<string>("");

  async function signMessageInput() {
    // early return if message is blank
    if (message.length == 0) {
      alert("please enter a message to sign");
      return;
    }
    // load private key from secure storage
    const wallet = await loadWallet();

    // sign message with private key
    const result = signMessage(message, wallet.private_key);
    if (result) {
      // redirect and pass signature to signature page
      router.replace({
        pathname: "/screens/message_signature/[message_signature]",
        params: { signature: result.signature },
      });
    } else {
      alert("Error trying to sign message");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-between items-center m-10"
      >
        <View>
          <Text className="font-bold text-lg p-4">Enter Message to Sign</Text>
        </View>
        <View className="flex justify-center items-center">
          <TextInput
            className="border rounded-lg w-64 h-32 mb-8 p-2"
            editable
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            scrollEnabled
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            blurOnSubmit
            onChangeText={setMessage}
          />
          <View className="m-2 w-64">
            <Button title="Sign" onPress={signMessageInput} />
          </View>
          <CustomButton title="Go Home" onPress={() => router.replace("/")} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
