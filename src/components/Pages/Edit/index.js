import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Card } from "../../Card";
import home from "../../../assets/images/home.png";
import { Toaster, toast } from "react-hot-toast";
import "./style.css";
// import CustomizedTables from "../../Table";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState({ movies: [] });
  // console.log(info);
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
        {/* <CustomizedTables props={info.movies} /> */}
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Título</StyledTableCell>
                <StyledTableCell align="right">Lançamento</StyledTableCell>
                <StyledTableCell align="right">Nota</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.movies.map((currentMovie) => (
                <StyledTableRow key={currentMovie.title}>
                  <StyledTableCell component="th" scope="row">
                    {currentMovie.original_title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {currentMovie.release_date}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {currentMovie.vote_average}
                  </StyledTableCell>
                  <StyledTableCell align="right">
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
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* {info.movies.map((currentMovie) => {
          return (
            <>
              <div id="cardEdit">
                <CustomizedTables props={currentMovie} />
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
        })} */}
      </div>
    </>
  );
}
