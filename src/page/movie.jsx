import React from "react";
import { Badge, Card, CardImg, Container, Image, Stack } from "react-bootstrap";
import Header from "../components/header";
import "../assets/style.css";
import { AiFillStar, AiOutlinePlayCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useSelector } from "react-redux";
import Moment from "react-moment";

export default function Movie() {
  const { id } = useParams();
  const urlImage = useSelector((state) => state.imageUrl.url);

  const { data: movie } = useQuery("movie", async () => {
    const response = await API.get("/movie/" + id);
    return response.data;
  });

  let production = movie?.production_companies.map((e) => e.name);
  let country = movie?.production_countries.map((e) => e.name);
  let genres = movie?.genres.map((e) => e.name);
  return (
    <div>
      <Header />
      <div className="position-relative">
        <Image
          fluid
          className="w-100 "
          style={{ height: "65vh", objectFit: "revert" }}
          src={urlImage + movie?.backdrop_path}
          alt="banner"
        />
        <div
          className="position-absolute w-100 d-flex justify-content-center pb-5"
          style={{
            top: "35%",
          }}
        >
          <AiOutlinePlayCircle
            size={70}
            color="lightgray"
            style={{ zIndex: 1, cursor: "pointer" }}
          />
        </div>
        <div
          className="bgGradient-dark position-absolute bottom-0 w-100 text-white px-5 d-flex align-items-end"
          style={{
            height: "30%",
          }}
        >
          <div className="pb-3 m-0">
            <h1 className="d-inline-block">{movie?.title}</h1>
            <Stack className="p-0 m-0" direction="horizontal">
              <Badge className="fs-6" bg="danger">
                <Moment format="yyyy">{movie?.release_date}</Moment>
              </Badge>
              <Badge className="fs-6 mx-2" bg="danger">
                {movie?.spoken_languages.map((e) => e.name)}
              </Badge>
              <AiFillStar color="yellow" size={20} />
              <span className="mx-2">{movie?.vote_average}</span>
            </Stack>
          </div>
        </div>
      </div>
      <h4 className="text-light mt-3 px-5">Deskripsi</h4>
      <hr className="border-white" />
      <div className="mt-3 px-5 text-white">
        <label className="col-md-8">{movie?.overview}</label>
      </div>
      <Container fluid className="my-5 px-5">
        <Card bg="black">
          <Stack direction="horizontal">
            <CardImg
              style={{ width: "17vw" }}
              src={urlImage + movie?.poster_path}
            />
            <Card.Body>
              <table className="text-white w-100">
                <tbody>
                  <tr>
                    <th>Production</th>
                    <td>{production?.join(", ")}</td>
                  </tr>
                  <tr>
                    <th>Release</th>
                    <td>
                      <Moment format="ddd , DD MMM yyyy">
                        {movie?.release_date}
                      </Moment>
                    </td>
                  </tr>
                  <tr>
                    <th>Negara</th>
                    <td>{country?.join(", ")}</td>
                  </tr>
                  <tr>
                    <th>Genre</th>
                    <td>{genres?.join(", ")}</td>
                  </tr>
                  <tr>
                    <th>Durasi</th>
                    <td>{movie?.runtime} Minute</td>
                  </tr>
                  <tr>
                    <th>Budget</th>
                    <td>{movie?.budget}</td>
                  </tr>
                  <tr>
                    <th>Tagline</th>
                    <td>{movie?.tagline}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}
