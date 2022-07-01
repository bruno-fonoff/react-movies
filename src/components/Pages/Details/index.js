import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../../Card/";
import home from "../../../assets/images/home.png";
import "./style.css";

export function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [info, setInfo] = useState({ movies: [] });

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/bruno-testproject/${id}`
        );
        setInfo(response.data.movies);

        setInfo(response.data);
      } catch (err) {
        console.log(err);
        navigate("/error");
      }
    }

    fetchDetails();
  }, [id]);

  async function handleDelete() {
    try {
      await axios.delete(
        `https://ironrest.herokuapp.com/bruno-testproject/${id}`
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
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
            <div id="cardDetails">
              <Card props={currentMovie}></Card>}
            </div>
          </>
        );
      })}
      <button onClick={handleDelete} className="btn btn-danger">
        Apagar Playlist
      </button>
      <Link to={`/edit/${id}`} className="btn btn-primary">
        Editar Playlist
      </Link>
    </>
  );
}
