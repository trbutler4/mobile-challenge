import { TouchableOpacity, Text, SafeAreaView, Clipboard, Image} from "react-native" // clip board is depracted but is still the thing to use for expo

interface CopyableTextProps {
    textToCopy: string,
    textToDisplay: string,
}

export default function CopyableText(props: CopyableTextProps) {

    function handleCopy() {
        Clipboard.setString(props.textToCopy)
        alert(`Copied: ${props.textToCopy}`)
    }
    return (
        <SafeAreaView className="bg-slate-200 rounded-md">
        <TouchableOpacity onPress={handleCopy} className="flex flex-row">
            <Text>{props.textToDisplay} </Text>
            <Image source={require("../assets/copy.png")} className="w-3 h-3 mt-[3px]"/>
        </TouchableOpacity>
        </SafeAreaView>
    )
}