import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../../Card/";
import home from "../../../assets/images/home.png";
import "./style.css";
import { Toaster, toast } from "react-hot-toast";

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
      // toast.error("Playlist Deletada!");

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

      <div id="voltarHomeDetails">
        <Link to="/">
          <img className="img" src={home} alt="home" />
        </Link>
      </div>

      <div id="infoPlaylist">
        <div id="textoDetails">
          <p id="infoOwner">
            By : <b>{info.owner}</b>
          </p>

          <p id="infoCategory">
            Category : <b>{info.category}</b>
          </p>
          <p id="infoDate">
            Created :<b>{info.date}</b>
          </p>
        </div>
      </div>
      <div id="buttonsDetails">
        <button
          id="buttonApagarDetails"
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Apagar Playlist
        </button>
        <Link
          id="buttonEditarDetails"
          to={`/edit/${id}`}
          className="btn btn-primary"
        >
          Editar Playlist
        </Link>
      </div>
      <div id="bodyDetails">
        {info.movies.map((currentMovie) => {
          return (
            <>
              <div id="cardDetails">
                <Card props={currentMovie}></Card>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
