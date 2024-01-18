import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../config";
import { View } from "react-native-animatable";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { Text } from "react-native";
import CommentsAdder from "./CommentsAdder";
import { Title } from "react-native-paper";

export default function CommentsList({ landmarkId }) {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("landmarkId", "==", landmarkId)
    );
    getDocs(q).then((snapshot) => {
      const comments = snapshot._snapshot.docChanges;
      const commentData = comments.map((comment) => {
        return [
          comment.doc.data.value.mapValue.fields.body.stringValue,
          comment.doc.data.value.mapValue.fields.username.stringValue,
        ];
      });
      setComments(commentData);
      setIsLoading(false);
    });
  }, [landmarkId]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View>
      <Title style={{marginVertical: 25, marginLeft: 25}}>Community Stories</Title>
      <CommentsAdder setComments={setComments} landmarkId={landmarkId} />
      {comments.map((comment, index) => {
        return <Comment key={index} comment={comment} />;
      })}
    </View>
  );
}
