import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getTopRatedMovies, ITopRatedMoviesResult } from "../api";
import { makeImagePath } from "../utilities";
import {
  Box,
  boxVariants,
  Info,
  infoVariants,
  Loader,
  offset,
  Row,
  rowVariants,
  Slider,
} from "./styled";

const TopRated = () => {
  const [leavingTR, setLeaving] = useState(false);
  const [nowIndex, setIndex] = useState(0);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<ITopRatedMoviesResult>(
    ["movies", "topRated"],
    getTopRatedMovies
  );

  const increaseIndex = () => {
    if (data) {
      if (leavingTR) return;
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
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Slider>
            <button onClick={increaseIndex}>👻</button>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={nowIndex}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(offset * nowIndex, offset * (nowIndex + 1))
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
        </>
      )}
      ;
    </>
  );
};

export default TopRated;
