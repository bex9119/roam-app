import { View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function Comment({comment}) {
    const commentBody = comment[0]
    const username = comment[1]
    return (
        <View>
            <Card style={{marginBottom: 20, marginHorizontal: 16}}>
                <Card.Content>
                    <Text variant="titleMedium">{username}</Text>
                    <Text variant="bodyLarge">{commentBody}</Text>
                </Card.Content>
            </Card>
        </View>
    )
} 