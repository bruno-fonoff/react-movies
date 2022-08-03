import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../../Card/";
import home from "../../../assets/images/home.png";
import "./style.css";
import { Toaster, toast } from "react-hot-toast";
import { RecipeReviewCard } from "../../../components/NewCard";

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
  // console.log(typeof info.date);
  // let date = info.date.split("-").reverse().join("-");
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
          <p className="infosDetails">
            By : <b>{info.owner}</b>
          </p>

          {/* <p className="infosDetails">
            Created :<b>{}</b>
          </p> */}
          <p className="infosDetails">
            Descrição : <b>{info.category}</b>
          </p>
        </div>
      </div>
      <div id="buttonsDetails">
        <Link
          id="buttonEditarDetails"
          to={`/edit/${id}`}
          className="btn btn-primary"
        >
          Editar Lista
        </Link>
        <button
          id="buttonApagarDetails"
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Apagar Lista
        </button>
      </div>
      <div id="bodyDetails">
        {info.movies.map((currentMovie) => {
          return (
            <>
              <div id="cardDetails">
                <RecipeReviewCard props={currentMovie} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
