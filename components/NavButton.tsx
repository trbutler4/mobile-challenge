import { View, Button } from "react-native";
import { Link } from "expo-router";

interface NavButtonProps {
  title: string;
  href: string;
}

export default function NavButton(props: NavButtonProps) {
  return (
    <View className="w-64 m-2">
      <Link href={props.href} asChild>
        <Button title={props.title} />
      </Link>
    </View>
  );
}
