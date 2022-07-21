export default function Title({ title }) {
  return (
    <h1
      style={{
        width: 700,
        margin: "0 auto",
        marginBottom: 20,
        marginTop: 20,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {title}
    </h1>
  );
}
