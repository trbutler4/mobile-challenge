import { TouchableOpacity, Text, SafeAreaView, Clipboard } from "react-native" // clip board is depracted but is still the thing to use for expo

interface CopyableTextProps {
    textToCopy: string,
    textToDisplay: string,
}

export default function CopyableText(props: CopyableTextProps) {

    function handleCopy() {
        Clipboard.setString(props.textToCopy)
    }
    return (
        <SafeAreaView className="bg-slate-200 rounded-md">
        <TouchableOpacity onPress={handleCopy}>
            <Text>{props.textToDisplay}</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}