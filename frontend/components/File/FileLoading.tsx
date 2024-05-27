export default function FileLoading() {
  return (
    <div className="file-loading">
      <div className="file-type-loading"></div>
      <div className="file-name">
        <p>File name</p>
      </div>
      <hr className="delimiter"></hr>
      <div className="file-details">
        <p>Extension</p>
      </div>
      <span className="delimiter" />
      <div className="file-details">
        <p>File size</p>
      </div>
      <span className="delimiter" />
      <div className="file-details">
        <p>Date uploaded</p>
      </div>
    </div>
  );
}
