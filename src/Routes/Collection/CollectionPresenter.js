import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { Link } from "react-router-dom";
import ImageItem from "Components/ImageItem";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const Overview = styled.p`
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 25px;
`;

const Category = styled.div`
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;

const CategoryTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;
const CollectionPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{result.name}| Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.name}</Title>
          <Overview>{result.overview}</Overview>
          {result.parts && result.parts.length > 0 && (
            <Category>
              <CategoryTitle>Parts</CategoryTitle>
              <Grid>
                {result.parts.map((movie) => (
                  <Link to={`/movie/${movie.id}`}>
                    <ImageItem
                      imageUrl={movie.poster_path}
                      name={movie.title}
                    />
                  </Link>
                ))}
              </Grid>
            </Category>
          )}
        </Data>
      </Content>
    </Container>
  );

CollectionPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CollectionPresenter;

// export default ({ result, error, loading }) =>
//   loading ? (
//     <Loader />
//   ) : (
//     <>
//       <div>{result.name}</div>
//     </>
//   );
