import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function Home() {
  const [playlistMovies, setplaylistMovies] = useState([]);

  useEffect(() => {
    async function allMovies() {
      const userPlay = await axios.get(
        "https://ironrest.herokuapp.com/bruno-testproject"
      );
      setplaylistMovies(userPlay.data);
    }
    allMovies();
  }, []);

  return (
    <>
      <div id="tituloCreate">PLAYLIST MOVIES</div>
      <div>
        <Link id="createPlay" to="/create" className="btn btn-primary">
          Crie Sua PlayList
        </Link>
      </div>

      {playlistMovies.map((currentMovie) => {
        return (
          <>
            <div id="cardsHome">
              <Link to={`/details/${currentMovie._id}`}>
                <div
                  className="card text-white bg-info mb-3"
                  style={{ width: "18rem" }}
                >
                  <div class="card-header">
                    <p>
                      <h5>By:</h5> <h4>{currentMovie.owner}</h4>
                    </p>
                  </div>
                  <div className="card-body-home">
                    <h5 className="card-title-home">
                      Category: {currentMovie.category}
                    </h5>
                    <p className="card-text-home">Date: {currentMovie.date}</p>
                  </div>
                </div>
              </Link>
            </div>
          </>
        );
      })}
    </>
  );
}
