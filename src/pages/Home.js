import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/Home/Carousel";
import axios from "axios";
import { Helmet } from "react-helmet";
import AnimeCards from "../components/Home/AnimeCards";
import HomeSkeleton from "../components/skeletons/CarouselSkeleton";
import useWindowDimensions from "../hooks/useWindowDimensions";
import WatchingEpisodes from "../components/Home/WatchingEpisodes";

function Home({changeMetaArr}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmRemove, setConfirmRemove] = useState([]);
  const { width } = useWindowDimensions();
  const title = "Sakamoto - Watch Popular Anime Online";
  const content= `Sakamoto. An ad-free anime streaming site. Catch your favourite shows and movies right here! 
            Help us by contributing to the project on github.`;
  const image = "https://media.discordapp.net/attachments/1009328245533065288/1009328327909199904/8.png";
  // React.useEffect(()=>{
  //   changeMetaArr("title", title)
  //   // console.log("Hlo")
  // })
  useEffect(() => {
    async function getImages() {
      window.scrollTo(0, 0);
      let result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}recent-release`
      );
      setImages(result.data);
      setLoading(false);
    }
    getImages();
  }, []);

  function checkSize() {
    let lsData = localStorage.getItem("Animes");
    lsData = JSON.parse(lsData);
    if (lsData.Names.length === 0) {
      return false;
    }
    return true;
  }
  return (
    <div>
      <Helmet>
        <title>{title}</title>
          <meta property="description" content= {content}/>
          <meta property="og:title" content= {title}/>
          <meta property="og:description" content= {content}/>
        <meta property="og:image" content={image} />
      </Helmet>
      <HomeDiv>
        <HomeHeading>
          <span>Recommended</span> to you
        </HomeHeading>
        {loading && <HomeSkeleton />}
        {!loading && <Carousel images={images} />}
        {localStorage.getItem("Animes") && checkSize() && (
          <div>
            <HeadingWrapper>
              <Heading>
                <span>Continue</span> Watching
              </Heading>
            </HeadingWrapper>
            <WatchingEpisodes confirmRemove={confirmRemove} setConfirmRemove={setConfirmRemove} />
          </div>
        )}
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Popular
            </Heading>
            <Links to="/popular">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="popular" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>Top 100</span> Anime
            </Heading>
            <Links to="/top100">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="top-airing" />
        </div>
        <div>
          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Favourite
            </Heading>
            <Links to="/favourites">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="top-airing" />
        </div>
      </HomeDiv>
    </div>
  );
}

const Links = styled(Link)`
  color: #FFFFFF;
  font-size: 1.1rem;
  font-family: "Gilroy-Medium", sans-serif;
  @media screen and (max-width: 600px) {
    color: #FFFFFF;
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

const HomeDiv = styled.div`
  margin: 1.5rem 5rem 1rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem 1rem 0rem 1rem;
  }
`;

const HomeHeading = styled.p`
  font-size: 2.3rem;
  color: #FFFFFF;
  font-family: "Gilroy-Light", sans-serif;

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }
  margin-bottom: 1rem;

  @media screen and (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: #FFFFFF;
  font-family: "Gilroy-Light", sans-serif;

  span {
    font-family: "Gilroy-Bold", sans-serif;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;

export default Home;
