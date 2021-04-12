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
  width: 50%;
  margin-left: 10px;
`;

const Info = styled.div`
  width: 20%;
  margin-left: 10px;
  padding-top: 100px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 80%;
  margin-bottom: 20px;
`;

const UnderLineText = styled.span`
  text-decoration: underline;
  color: rgba(255, 255, 255, 0.9);
`;

const Collection = styled.div`
  width: 150px;
`;

const Category = styled.div`
  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const CategoryTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 25px;
`;

const MapItem = styled.div`
  margin-bottom: 8px;
`;

const DetailPresenter = ({ result, loading, error }) =>
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
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
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
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id ? (
              <>
                <Divider>•</Divider>
                <a href={`https://www.imdb.com/title/${result.imdb_id}/`}>
                  <span>⭐IMDB⭐</span>
                </a>
              </>
            ) : (
              ""
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.belongs_to_collection && (
            <Category>
              <CategoryTitle>Collection</CategoryTitle>
              <Collection>
                <Link to={`/collection/${result.belongs_to_collection.id}`}>
                  <ImageItem
                    imageUrl={result.belongs_to_collection.poster_path}
                    name={result.belongs_to_collection.name}
                  />
                </Link>
              </Collection>
            </Category>
          )}
          {result.seasons && result.seasons.length > 0 && (
            <Category>
              <CategoryTitle>Seasons</CategoryTitle>
              <Grid>
                {result.seasons.map((season) => (
                  <ImageItem imageUrl={season.poster_path} name={season.name} />
                ))}
              </Grid>
            </Category>
          )}
          {result.created_by && result.created_by.length > 0 && (
            <Category>
              <CategoryTitle>Creator</CategoryTitle>
              <Grid>
                {result.created_by.map((creator) => (
                  <ImageItem
                    imageUrl={creator.profile_path}
                    name={creator.name}
                  />
                ))}
              </Grid>
            </Category>
          )}
        </Data>
        <Info>
          {result.videos.results && result.videos.results.length > 0 && (
            <Category>
              <CategoryTitle>Preview</CategoryTitle>
              {result.videos.results.map((video) => (
                <MapItem>
                  <a href={`https://youtube.com/watch?v=${video.key}`}>
                    <UnderLineText>{video.name} ➡</UnderLineText>
                  </a>
                </MapItem>
              ))}
            </Category>
          )}
          {result.production_companies &&
            result.production_companies.length > 0 && (
              <Category>
                <CategoryTitle>Production Company</CategoryTitle>
                {result.production_companies.map((company, index) => (
                  <MapItem>
                    #{index + 1} {company.name}
                  </MapItem>
                ))}
              </Category>
            )}
          {result.production_countries &&
            result.production_countries.length > 0 && (
              <Category>
                <CategoryTitle>Production Country</CategoryTitle>
                {result.production_countries.map((country, index) => (
                  <MapItem>
                    #{index + 1} {country.name}
                  </MapItem>
                ))}
              </Category>
            )}
        </Info>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
