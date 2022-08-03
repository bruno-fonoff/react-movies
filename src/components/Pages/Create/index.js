import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import home from "../../../assets/images/home.png";
// import { Card } from "../../Card";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { RecipeReviewCard } from "../../NewCard";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { red } from "@mui/material/colors";
import gifJoker from "../../../assets/images/clapsJokerWeb.webp";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export function Create() {
  const navigate = useNavigate();
  const [movies, setmovies] = useState([]);
  const [form, setForm] = useState({
    owner: "",
    category: "",
    date: "",
    movies: [],
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    async function allMovies() {
      const movie = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=ae43382e0090d171e5afa764c1c89bef"
      );
      setmovies(movie.data.results);
    }
    allMovies();
  }, []);

  function noSelectedMovies(element) {
    setmovies(movies.filter((currentMovie) => currentMovie.id !== element.id));

    console.log(element.id);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(
        "https://ironrest.herokuapp.com/bruno-testproject",
        form
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  console.log(form);

  //======================================================================================================================================
  //======================================================================================================================================
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div id="bodyCreate">
        <div id="header">
          <Link to="/">
            <img className="imgHome" src={home} alt="home" />
          </Link>
        </div>
        <div id="titleCreatePage">
          <h1 id="tituloCreate">Crie Sua PlayList</h1>
        </div>

        <div id="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="owner-input">Nome </label>
            <input
              className="input"
              id="owner-input"
              name="owner"
              value={form.owner}
              type="string"
              required
              onChange={handleChange}
            />

            <label htmlFor="date-input">Data </label>
            <input
              className="input"
              id="date-input"
              name="date"
              value={form.date}
              type="date"
              required
              onChange={handleChange}
            />

            <label htmlFor="category-input">Descrição</label>
            <input
              className="input"
              id="category-input"
              name="category"
              value={form.category}
              type="string"
              required
              onChange={handleChange}
            />

            <button id="btnCriar" className="btn btn-primary" type="submit">
              Criar
            </button>
          </form>
          <h1 className="selectMovies">Selecione os Filmes</h1>
        </div>

        <div id="cards">
          {movies.map((currentMovie) => {
            return (
              <>
                <div id="tadificil">
                  {/* <Card props={currentMovie}></Card> */}
                  <RecipeReviewCard props={currentMovie} />
                  <button
                    type="button"
                    id="button"
                    className="btn btn-dark"
                    onClick={() => {
                      setForm({
                        ...form,
                        movies: [...form.movies, currentMovie],
                      });
                      noSelectedMovies(currentMovie);
                      toast(
                        (t) => (
                          <>
                            <img id="imgToast" src={gifJoker} alt="gifjoker" />
                          </>
                        ),

                        {
                          style: {
                            backgroundColor: "black",
                          },
                          iconTheme: {
                            primary: "red",
                            secondary: "#FFFAEE",
                          },
                        }
                      );
                    }}
                  >
                    <AddCircleIcon sx={{ color: "#1e90ff" }} />
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
