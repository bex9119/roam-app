import { Text, View } from "react-native";

export default function Comment({comment}) {
    const commentBody = comment[0]
    const username = comment[1]
    return (
        <View>
        <Text>{username}</Text>
        <Text>{commentBody}</Text>
        </View>
    )
} 