import { collection, where } from "@firebase/firestore"
import { db } from "../../config"


export default function Comments(){
    const commentsRef = db.collection('comments')
    const queryRef = commentsRef.where
    return (
        <View>

            
        </View>
    )
}