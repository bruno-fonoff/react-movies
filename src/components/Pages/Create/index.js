import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import home from "../../../assets/images/home.png";
import { Card } from "../../Card";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export function Create() {
  const navigate = useNavigate();
  const [movies, setmovies] = useState([]);
  const [form, setForm] = useState({
    owner: "",
    category: "",
    date: "",
    movies: [],
  });
  console.log(form);
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
    setmovies(movies.filter((cElement) => cElement.id !== element.id));

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
        <div id="tituloooooo">
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

            <label htmlFor="category-input">Categoria</label>
            <input
              className="input"
              id="category-input"
              name="category"
              value={form.category}
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

            <button id="btnCriar" className="btn btn-primary" type="submit">
              Criar
            </button>
          </form>
        </div>
        <h1 className="selectMovies">Selecione os Filmes</h1>
        <div id="cards">
          {movies.map((currentMovie) => {
            return (
              <>
                <div id="tadificil">
                  <Card props={currentMovie}></Card>
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
                      toast.success("Filme Adicionado!");
                    }}
                  >
                    Adicionar
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
