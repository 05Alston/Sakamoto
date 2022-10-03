import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimeGrid from "../components/AnimeGrid/AnimeGrid";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";

function PopularAnime() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnime();
  }, []);

  async function getAnime() {
    window.scrollTo(0, 0);
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/popular?page=1&count=50`
    );
    setLoading(false);
    setAnimeDetails(res.data.data.Page.media);
  }
  return (
    <div>
      {loading && <SearchResultsSkeleton name="Popular Anime" />}
      {!loading && (
        <AnimeGrid animeDetails={animeDetails} title="Popular Anime" />
      )}
    </div>
  );
}

export default PopularAnime;
