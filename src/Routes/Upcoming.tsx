import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getUpcomingMovies, INowMoviesResult } from "../api";
import { makeImagePath } from "../utilities";
import {
  BigCover,
  BigMovie,
  BigOverview,
  BigTitle,
  Box,
  boxVariants,
  Button,
  Info,
  infoVariants,
  Loader,
  offset,
  Overlay,
  Row,
  rowVariants,
  Slider,
} from "./styled";

const Upcoming = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => navigate("/");
  const { data, isLoading } = useQuery<INowMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };
  const toggleLeaving = () => setLeaving(prev => !prev);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(movie => movie.id + "" === bigMovieMatch.params.movieId);
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <h3>
            Upcoming
            <Button onClick={increaseIndex}>Next</Button>
          </h3>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(offset * index, offset * (index + 1))
                  .map(movie => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Upcoming;
