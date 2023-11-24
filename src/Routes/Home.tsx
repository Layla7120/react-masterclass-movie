import NowPlaying from "./NowPlaying";
import { Wrapper } from "./styled";
import TopRated from "./TopRated";
import Upcoming from "./Upcoming";

function Home() {
  return (
    <Wrapper>
      <NowPlaying />
      <TopRated />
      <Upcoming />
    </Wrapper>
  );
}
export default Home;
