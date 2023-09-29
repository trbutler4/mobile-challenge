import { View, Text, Button } from "react-native"
import NavButton from "../../../components/NavButton"
import { useEffect, useState } from "react";
import { loadWallet } from "../../utils/storage";
import { signTransaction } from "../../utils/crypto";
import { router } from "expo-router";

export default function SignTransactionScreen() {
    const [sender, setSender] = useState<string>()
    const [privateKey, setPrivateKey] = useState<string>()

    useEffect(() => {
        loadWallet().then((wallet) => {
            setSender(wallet.address)
            setPrivateKey(wallet.private_key)
        })
        .catch((e) => {
            alert('Error loading wallet')
        })
    })

    // just an example transaction
    const transaction: Transaction = {
        from: sender,
        recipient: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
        gasLimit: 21000,
        maxFeePerGas: 300,
        maxPriorityFeePerGas: 10,
        nonce: 0,
        value: 1000000000000
    }

    function handleSignTransaction() {
        const result = signTransaction(privateKey, transaction)
        if (result) {
            router.replace({pathname: "/screens/transaction_signature/[param]", params: {signature: result.txDER, rlp: result.raw}})
        } else {
            console.error("Error signing transaction")
            alert("Error signing transaction")
        }
    }

    return (
        <View className="flex-1 justify-between items-center m-10">
            <View>
                <Text className="font-bold text-lg p-4">Signing Transaction Below</Text>
            </View>
            <View>
                <Text className="text-center font-bold p-2">Transaction</Text>
                <Text><Text className="font-bold">From: </Text>{transaction.from}</Text>
                <Text><Text className="font-bold">To: </Text>{transaction.recipient}</Text>
                <Text><Text className="font-bold">Gas Limit: </Text>{transaction.gasLimit}</Text>
                <Text><Text className="font-bold">Max Gas Fee: </Text>{transaction.maxFeePerGas}</Text>
                <Text><Text className="font-bold">Max Priority Gas Fee: </Text>{transaction.maxPriorityFeePerGas}</Text>
                <Text><Text className="font-bold">Nonce: </Text>{transaction.nonce}</Text>
                <Text><Text className="font-bold">Value: </Text>{transaction.value}</Text>
            </View>
            <View className="flex justify-center items-center">
                <View className="m-2 w-64">
                    <Button title="Sign" onPress={handleSignTransaction} />
                </View>
                <NavButton href="/" title="Go Home" />
            </View>
        </View>
    )
}