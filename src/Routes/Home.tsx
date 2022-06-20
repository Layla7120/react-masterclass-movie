import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utilities";
import NowPlaying from "./NowPlaying";
import { Wrapper } from "./styled";
import TopRated from "./TopRated";

function Home() {
  const bigMovieMatch = useMatch("/movies/:movieId");
  // const { scrollY } = useViewportScroll();
  // const navigate = useNavigate();
  // const onOverlayClick = () => navigate("/");

  // const clickedMovie =
  //   bigMovieMatch?.params.movieId &&
  //   nowPlayingData?.results.find(
  //     movie => movie.id + "" === bigMovieMatch.params.movieId
  //   );

  return (
    <Wrapper>
      <NowPlaying />
      <TopRated />
    </Wrapper>
    /* <AnimatePresence>
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
      </AnimatePresence> */
  );
}
export default Home;
