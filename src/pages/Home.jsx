import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BooksCard from "../components/home/BooksCard";
import fetchData from "../api";
import Section from "../ui/Section";
import Container from "../ui/Container";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetchData("GET", "/books");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <Section brand="Tüm Kitaplar">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-16 gap-8 xl:grid-cols-4">
            <BooksCard books={books} getBooks={getBooks} />
          </div>
        </Section>
      )}
    </Container>
  );
};

export default Home;
