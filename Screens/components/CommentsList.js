import { collection, getDocs, query, where } from "@firebase/firestore"
import { db } from "../../config"
import { View } from "react-native-animatable"
import { useEffect, useState } from "react"
import Comment from "./Comment"
import { Text } from "react-native"
import CommentsAdder from "./CommentsAdder";


export default function CommentsList(){
    const [comments, setComments] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
      const q = query(collection(db, 'comments'), where('landmarkId', '==', 1))
      getDocs(q)
      .then((snapshot)=> {
        const comments = snapshot._snapshot.docChanges
        const commentData = comments.map((comment) => {
          return [comment.doc.data.value.mapValue.fields.body.stringValue, comment.doc.data.value.mapValue.fields.username.stringValue]
        })
        console.log(commentData)
        setComments(commentData)
        setIsLoading(false)

      })
    }, [])
      
    if (isLoading) {
      return <View>
        <Text>Loading...</Text>
          </View>
    }
    return (
        <View>
          <CommentsAdder setComments={setComments}/>
          {comments.map((comment, index) => {
            return <Comment key={index} comment={comment}/>
          })}
        </View>
    )
}