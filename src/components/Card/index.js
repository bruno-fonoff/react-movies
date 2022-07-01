import "./style.css";

export function Card({ props }) {
  return (
    <>
      <div id="cardMovie">
        <div className="card" style={{ width: "350px" }}>
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
            alt="imagecard"
          />
          <div className="card-body">
            <h4 id="titleMovie">{props.original_title}</h4>
            <hr></hr>
            <p className="card-text">{props.overview}</p>
            <div id="footer">
              <p className="card-average">{props.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
