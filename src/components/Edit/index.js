import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../Card/";
import home from "../../assets/images/home.png";
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
        navigate("/error");
      }
    }

    fetchEdit();
  }, [id]);

  function handleDelete(movie) {
    const clone = { ...info };

    const newEdit = clone.movies.filter((currentMovie) => {
      return movie.id !== currentMovie.id;
    });

    setInfo({ ...info, movies: newEdit });
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
      <div id="bodyEdit">
        <Link to="/">
          <img className="img" src={home} alt="home" />
        </Link>

        <h1>{info.owner}</h1>
        <p>{info.category}</p>
        <p>{info.date}</p>
        <p>{info._id}</p>

        {info.movies.map((currentMovie) => {
          return (
            <>
              <div id="cardEdit">
                <Card props={currentMovie}></Card>
                <div id="buttonEdit">
                  {" "}
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
        <div id="buttonSub">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            SALVAR
          </button>
        </div>
      </div>
    </>
  );
}
