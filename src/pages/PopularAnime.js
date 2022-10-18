import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeGrid from "../components/AnimeGrid/AnimeGrid";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
import { Helmet } from "react-helmet";

function PopularAnime({changeMetaArr}) {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = "Popular Anime";
  const content= "Sakamoto - Watch Popular Anime Online";
  const image = "https://media.discordapp.net/attachments/1009328245533065288/1009328327909199904/8.png";

  useEffect(() => {
    getAnime();
  }, []);

  // React.useEffect(()=>{
  //   changeMetaArr("title", "Popular Anime")
  // })

  async function getAnime() {
    window.scrollTo(0, 0);
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}popular?page=1`
    );
    setLoading(false);
    setAnimeDetails(res.data);
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
      {loading && <SearchResultsSkeleton name="Popular Anime" />}
      {!loading && (
        <AnimeGrid animeDetails={animeDetails} title="Popular Anime" />
      )}
    </div>
  );
}

export default PopularAnime;
