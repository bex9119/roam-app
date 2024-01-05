import { Text } from "react-native";

export default function Landmarks({ route }) {
  const { id } = route.params;
  return (
    <>
      <Text>{`Showing Landmark ${id}`}</Text>
    </>
  );
}
