import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardImg,
  Carousel,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import {
  AiFillStar,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";
import { API } from "../config/api";
import Header from "../components/header";

export default function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const urlImage = useSelector((state) => state.imageUrl.url);
  const idGenre = useSelector((state) => state.genreID.id);

  const { data: videos, refetch: refetchVideo } = useQuery(
    "video",
    async () => {
      const response = await API.get("/movie/upcoming?page=" + page);
      return response.data.results;
    }
  );

  const { data: videogenre, refetch: refetchVideoGenre } = useQuery(
    "videogenre",
    async () => {
      const response = await API.get("/discover/movie?with_genres=" + idGenre);
      return response.data.results;
    }
  );

  const description = (string) => {
    let text = string;
    let desc = string.length;
    desc > 170 ? (text = text.substring(0, 200) + "...") : text;
    return text;
  };
  const count = Math.floor(Math.random() * videos?.length);

  const currentItems = idGenre > 0 ? videogenre : videos;

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setPage(newOffset);
  };
  const getDetail = (id) => {
    navigate("movies/" + id);
  };
  useEffect(() => {
    refetchVideo();
  }, [page, videos]);

  useEffect(() => {
    refetchVideoGenre();
  }, [idGenre, videogenre]);

  return (
    <div>
      <Header />
      <Carousel fade className="position-relative">
        {videos?.slice(count, count === 20 ? 20 : count + 5)?.map((e, i) => (
          <Carousel.Item key={i} className="position-relative">
            <div style={{ background: "black" }}>
              <Image
                className="d-block w-100"
                src={urlImage + e.backdrop_path}
                alt="slide"
                style={{
                  height: "65vh",
                  objectFit: "revert",
                }}
              />
              <Carousel.Caption className="text-start w-100 pb-5">
                <h3 className="col-md-7 fs-1">{e.title}</h3>
                <p className="col-md-6 fs-6">{description(e.overview)}</p>
                <Button
                  onClick={() => getDetail(e.id)}
                  variant="danger"
                  size="lg"
                >
                  Detail Movie
                </Button>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container className="text-white">
        <p className="display-6 my-3">List Movie</p>
        <div>
          <Row xs={2} md={4} lg={6} className="g-4">
            {currentItems?.map((e, i) => {
              return (
                <Col key={i}>
                  <Card
                    onClick={() => getDetail(e.id)}
                    bg="dark"
                    className="cardVideo border-0 shadow-sm position-relative"
                  >
                    <CardImg src={urlImage + e.poster_path} />
                  </Card>
                  <label className="fw-semibold lh-1 mt-2">{e.title}</label>
                  <br />
                  <label style={{ fontSize: "10pt" }}>
                    <AiFillStar color="yellow" /> {e.vote_average}
                  </label>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="d-flex justify-content-center my-3">
          <ReactPaginate
            breakLabel=" ... "
            nextLabel={<AiOutlineDoubleRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={20}
            previousLabel={<AiOutlineDoubleLeft />}
            renderOnZeroPageCount={null}
            containerClassName="pagination bg-black border-dark text-danger pagination-md"
            pageLinkClassName="page-link fw-bold  bg-black border-0 inputOutline "
            nextLinkClassName="page-link ms-2 bg-danger border-0 rounded-circle text-white inputOutline"
            previousLinkClassName="page-link me-2 bg-danger border-0 rounded-circle text-white  inputOutline"
            activeClassName="page-item active inputOutline"
          />
        </div>
      </Container>
    </div>
  );
}
