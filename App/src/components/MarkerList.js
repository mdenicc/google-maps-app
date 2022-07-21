import Title from "./Title";

export default function MarkersList({ markers, removeMarker }) {
  return (
    <div
      style={{
        width: 700,
        margin: "0 auto",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Title title="Markers List" />
      {markers.length > 0 ? (
        markers.map((marker) => (
          <div
            key={marker.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>
              {marker.latitude}, {marker.longitude}
            </p>
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                removeMarker(marker);
              }}
            >
              Remove marker
            </span>
          </div>
        ))
      ) : (
        <p>No markers added. Click on the map to add a marker</p>
      )}
    </div>
  );
}
