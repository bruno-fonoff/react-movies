import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../../Card";
import home from "../../../assets/images/home.png";
import { Toaster, toast } from "react-hot-toast";
import "./style.css";

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({ movies: [] });
  console.log(info);
  useEffect(() => {
    async function fetchEdit() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/bruno-testproject/${id}`
        );
        setInfo(response.data);
        console.log(response.data.movies);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEdit();
  }, [id]);
  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }
  function handleDelete(movie) {
    const clone = { ...info };
    const newEdit = clone.movies.filter((currentMovie) => {
      return movie.id !== currentMovie.id;
    });
    setInfo({ ...info, movies: newEdit });
    toast.error("Filme Deletado!");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...info };
      delete clone._id;
      await axios.put(
        `https://ironrest.herokuapp.com/bruno-testproject/${id}`,
        clone
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div id="headerEdit">
        <Link to="/">
          <img className="img" src={home} alt="home" />
        </Link>
      </div>
      <div id="formEdit">
        <form onSubmit={handleSubmit}>
          <label htmlFor="owner-input">Nome </label>
          <input
            className="inputEdit"
            id="owner-input"
            name="owner"
            value={info.owner}
            type="string"
            required
            onChange={handleChange}
          />

          <label htmlFor="category-input">Categoria</label>
          <input
            className="inputEdit"
            id="category-input"
            name="category"
            value={info.category}
            type="string"
            required
            onChange={handleChange}
          />
          <label htmlFor="date-input">Data </label>
          <input
            className="inputEdit"
            id="date-input"
            name="date"
            value={info.date}
            type="date"
            required
            onChange={handleChange}
          />
        </form>
        <button
          id="buttonSub"
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          SALVAR
        </button>
      </div>
      <div></div>

      <div id="bodyEdit">
        {info.movies.map((currentMovie) => {
          return (
            <>
              <div id="cardEdit">
                <Card props={currentMovie}></Card>
                <div id="buttonDelete">
                  <button
                    onClick={() => {
                      handleDelete(currentMovie);
                    }}
                    type="button"
                    className="btn btn-danger"
                  >
                    Remover Filme
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
