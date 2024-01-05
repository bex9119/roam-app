export default function Landmarks({ route }) {
  const { id } = route.params;
  return <>{`Showing Landmark ${id}`}</>;
}
