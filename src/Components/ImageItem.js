import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.div`
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 220px;
  border-radius: 5px;
  transition: opacity 0.2s linear;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
  position: absolute;
  bottom: 8px;
  left: 5px;
  opacity: 0;
  transition: opacity 0.2s linear;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.6;
    }
    ${Name} {
      opacity: 1;
    }
  }
`;

const ImageItem = ({ imageUrl, name }) => (
  <Container>
    <Image
      bgImage={
        imageUrl
          ? `https://image.tmdb.org/t/p/original${imageUrl}`
          : require("../assets/noPosterSmall.png").default
      }
    ></Image>
    <Name>{name}</Name>
  </Container>
);

ImageItem.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
};

export default ImageItem;
