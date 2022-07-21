export default function MarkerInput({
  markerInput,
  handleMarkerInput,
  handleAddMarker,
}) {
  return (
    <div
      style={{
        width: 700,
        margin: "0 auto",
      }}
    >
      <textarea
        style={{
          width: 700,
        }}
        value={markerInput}
        onChange={handleMarkerInput}
      />
      <button
        onClick={handleAddMarker}
        style={{
          margin: "10px 0",
        }}
      >
        Add marker
      </button>
    </div>
  );
}
