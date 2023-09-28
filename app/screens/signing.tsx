import { View, Button, KeyboardAvoidingView, Text, TextInput, Platform, Keyboard, TouchableWithoutFeedback } from "react-native"
import NavButton from "../../components/NavButton"
import { loadWallet } from "../utils/storage"
import { useState } from "react"
import { signMessage } from "../utils/crypto"
import { router } from "expo-router"

export default function SigningPage() {
    const [message, setMessage] = useState<string>("")

    async function signMessageInput() {
        // early return if message is blank
        if(message.length == 0) {
            alert("please enter a message to sign")
            return
        }
        // load private key from secure storage 
        const wallet = await loadWallet()

        // sign message with private key 
        const result = signMessage(message, wallet.private_key)
        if (result) {
            // redirect and pass signature to signature page 
            router.replace({pathname: "/screens/[signature]", params: {signature: result.signature}})
        } else {
            alert("Error trying to sign message")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1 justify-between items-center m-10"
            >
                <View>
                    <Text>Signing Page</Text>
                </View>
                <View>
                    <Text className="m-2">Enter Message</Text>
                    <TextInput 
                        className="border w-64 h-32"
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
                </View>
                <View>
                    <View className="m-2 w-64">
                        <Button title="Sign" onPress={signMessageInput} />
                    </View>
                    <NavButton href="/" title="Go Home" />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}