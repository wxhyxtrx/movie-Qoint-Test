import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useDispatch } from "react-redux";
import { genreAction } from "../store/action/genreAction";

export default function Header() {
  const [search, setSearh] = useState("");
  const dispatch = useDispatch();

  const { data: genre } = useQuery("genre", async () => {
    const response = await API.get("/genre/movie/list");
    return response.data.genres;
  });

  const handleChange = (e) => {
    setSearh(e.target.value);
  };

  const handleGenre = (id) => {
    dispatch(genreAction(id));
  };

  return (
    <div>
      <Navbar
        bg="black"
        variant="dark"
        expand="lg"
        className="text-white"
        style={{ background: "rgb(0,0,0,.5)", color: "white" }}
      >
        <Container>
          <Navbar.Brand href="/">
            <Image
              src="https://www.seekpng.com/png/full/23-234252_tv-movie-logo-png-transparent-tv-and-movie.png"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              width={100}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Beranda</Nav.Link>
              <NavDropdown
                title="Kategori"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                {genre?.map((e, i) => (
                  <NavDropdown.Item key={i} onClick={() => handleGenre(e.id)}>
                    {e.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search Movie"
                className="me-2 inputOutline"
                aria-label="Search"
                value={search}
                onChange={handleChange}
              />
              <Button variant="danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
