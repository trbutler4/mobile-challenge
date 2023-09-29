import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}
export default function CustomButton(props: CustomButtonProps) {
  return (
    <TouchableOpacity
      className="bg-blue-500 p-2 m-2 w-64 rounded"
      onPress={props.onPress}
    >
      <Text className="text-white font-bold text-center">{props.title}</Text>
    </TouchableOpacity>
  );
}
