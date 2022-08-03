import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import joker from "../../../assets/images/coringa.jpg";
import batman from "../../../assets/images/batman.jpg";
import harley from "../../../assets/images/harley.jpg";

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

  const arrA = [batman, joker, harley];
  let newArray = [];
  function randomizar(array) {
    newArray = array.sort(() => Math.random() - 0.5).slice(0, 1);
  }

  randomizar(arrA);
  console.log(newArray);
  return (
    <>
      <div id="bodyHome">
        <div id="tituloCreateHome">MOVIES LIST</div>
        <div>
          <Link id="createPlay" to="/create" className="btn btn-primary">
            Crie Sua Lista
          </Link>
        </div>
        <div id="home">
          {playlistMovies.map((currentMovie) => {
            return (
              <>
                <div id="cardsHome">
                  <Link id="linkCard" to={`/details/${currentMovie._id}`}>
                    <div>
                      <img
                        id="fotoperfil"
                        src={arrA.sort(() => Math.random() - 0.5).slice(0, 1)}
                        alt="foto-perfil"
                      />

                      <div>
                        <div className="card-body-home">
                          <h4 className="card-title-home">
                            {currentMovie.owner}
                          </h4>
                          <p className="card-text-home">
                            {currentMovie.date.split("-").reverse().join("-")}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <h5 id="testando">{currentMovie.category}</h5>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
