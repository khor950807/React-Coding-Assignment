import React, { useEffect, useCallback, useState, useMemo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { Row, Col, InputGroup, Form, Container, Image, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
// import InfiniteScroll from 'react-infinite-scroll-component';

import {
  fetchAnimes,
  setCurrentPage,
  setPageLimit,
  setSortBy,
  setOrderBy,
  setSelectedRating,
  setSelectedType,
  searchAnime
} from "../store/animeSlice";

import { toggleFavouritelist } from "../store/animeFavouriteSlice";

import type { RootState, AppDispatch } from "../store";
import AnimePagination from "./AnimePagination";

const AnimeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    animes,
    loading,
    error,
    currentPage,
    pageLimit,
    searchTerm,
    sortBy,
    orderBy,
    lastPage,
    totalFound,
    selectedRating,
    selectedType,
  } = useSelector((state: RootState) => state.anime);

  const {
    favourite_anime_ids
  } = useSelector((state: RootState) => state.animeFavourite);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchAnimes());
  }, [dispatch, currentPage, pageLimit, sortBy, orderBy, selectedRating, selectedType, searchTerm]);

  /* Infinite Loader */
  // const loadMore = () => {
  //   if (loading || currentPage >= lastPage) return;
  //   dispatch(setCurrentPage(currentPage + 1));
  // };
  /* End Infinite Loader */

  const anime_type = useMemo(() =>({
    all: "All Anime",
    tv: "TV",
    movie: "Movie",
    ova: "OVA",
    special: "Special",
    ona: "ONA",
    music: "Music",
    cm: "CM",
    pv: "PV",
    tv_special: "TV Special",
  }), []);

  const rating_type = useMemo(() =>({
    all: "All Rating",
    g: "All Ages",
    pg: "Children",
    pg13: "Teens 13 or older",
    r17: "17+ (violence & profanity)",
    r: "Mild Nudity",
    rx: "Hentai",
  }), []);

  const order_by = useMemo(() =>({
    title: "Anime Title",
    start_date: "Start Date",
    end_date: "End Date",
    episodes: "Episodes",
    score: "Score",
    scored_by: "Scored By",
    rank: "Rank",
    popularity: "Popularity",
    members: "Members",
    favorites: "Favorites",
  }), []);

  const sort_option = useMemo(() =>({
    asc: "ASC",
    desc: "DESC",
  }), []);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(searchAnime(query));
    }, 250),
    [dispatch]
  );

  const [localSearch, setLocalSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  if (error) {
    return (
      <Container className="py-md-5 py-3 min-vh-100 d-flex align-items-center justify-content-center w-100">
        <Row className="align-items-center justify-content-end w-100">
          <Col xs="12" lg="6">
            <Image className="w-100" src="../../src/assets/images/404.png"></Image>
          </Col>
          <Col xs="12" lg="6" className="text-center text-md-start mt-4 mt-md-0">
            <h2 className="text-white mb-3">{error.code ?? 'Something went wrong'}</h2>
            <h5 className="text-theme-secondary mb-4">{error.message ?? 'Something went wrong. Please try refresh page...'}</h5>
            <Button onClick={() => navigate('/anime')}>Back to Home</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <section>
      <div className="w-100 py-5 section-search">
        <Container className="px-lg-0">
          <InputGroup>
            <Form.Select className="d-none d-md-block" size="lg" value={selectedType} onChange={(e) => dispatch(setSelectedType(e.target.value))}>
              {Object.entries(anime_type).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </Form.Select>
            <Form.Control type="text" placeholder="Search anime name or keywords..." size="lg" className="w-50" value={localSearch} onChange={handleSearchChange} />
          </InputGroup>
        </Container>
      </div>
      <Container className="py-md-5 py-3">
        <Row>
          <Col xs="12" className="d-block d-md-none">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column xs="4">
                Movie Type:
              </Form.Label>
              <Col xs="8">
                <Form.Select value={selectedType} onChange={(e) => dispatch(setSelectedType(e.target.value))}>
                  {Object.entries(anime_type).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
          <Col xs="12" lg="4">
            <Form.Group as={Row} className="mb-3 mb-lg-0">
              <Form.Label column xs="4" lg="3" className="pe-0">
                Show:
              </Form.Label>
              <Col xs="8" lg="4">
                <Form.Select value={pageLimit} onChange={(e) => dispatch(setPageLimit(Number(e.target.value)))}>
                  {[5, 10, 15, 20, 25].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
          <Col xs="12" lg="4">
            <Form.Group as={Row} className="mb-3 mb-lg-0">
              <Form.Label column xs="4" lg="4" className="pe-0 text-lg-end">
                Order By:
              </Form.Label>
              <Col xs="8" lg="8">
                <Form.Select value={orderBy} onChange={(e) => dispatch(setOrderBy(e.target.value))}>
                  {Object.entries(order_by).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
          <Col xs="12" lg="4">
            <Form.Group as={Row}>
              <Form.Label column xs="4" lg="4" className="pe-0 text-lg-end">
                Sort By:
              </Form.Label>
              <Col xs="8" lg="8">
                <Form.Select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
                  {Object.entries(sort_option).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex align-items-center overflow-x-auto text-nowrap mb-4 mt-5">
          {Object.entries(rating_type).map(([key, label], index) => (
            <div className="position-relative" key={key}>
              <Form.Check type="radio" className="ps-0">
                <Form.Check.Input checked={selectedRating === key} type="radio" id={`ratingbtncheck${index}`} className="btn-check" name="rating_type_radio" onChange={() => dispatch(setSelectedRating(key))} />
                <Form.Check.Label className="custom-checkbox-label d-inline-block text-nowrap me-4 text-capitalize" htmlFor={`ratingbtncheck${index}`}>{label}</Form.Check.Label>
              </Form.Check>
            </div>
          ))}
        </div>
        <Row>
          <Col className="d-flex align-items-center justify-content-between mb-4" sm={12}>
            <p className="text-white mb-0">Total Result Found: {totalFound.toLocaleString()}</p>
          </Col>
          <Col sm={12}>
            {loading ? (
              <Row>
                <SkeletonTheme baseColor="#000" highlightColor="#222222">
                  {[...Array(pageLimit)].map((_, i) => (
                    <Col key={i} xs="6" lg="12" className="mb-lg-5">
                      <Row className="align-items-center">
                        <Col xs="12" lg="4" xl="3">
                          <Skeleton className="w-100 anime-image-skeleton" />
                        </Col>
                        <Col xs="12" lg="8" xl="9" className="px-lg-4 text-theme-secondary">
                          <p className="text-uppercase text-white fw-bold mb-2"><Skeleton className="w-100" height={21.25} /></p>
                          <p className="mb-lg-2 mb-3"><Skeleton className="w-100" height={29} /></p>
                          <div className="d-none d-lg-block">
                            <h5 className="mb-0 clamp-2 fw-normal"><Skeleton className="w-100" height={48} /></h5>
                            <hr className="border-white hr-m-lg" />
                            <h5 className="fw-normal mb-3"><Skeleton className="w-100" height={24} /></h5>
                            <h5 className="fw-normal mb-3"><Skeleton className="w-100" height={24} /></h5>
                            <h5 className="fw-normal mb-0"><Skeleton className="w-100" height={24} /></h5>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </SkeletonTheme>
              </Row>

            ) : (
              <Row>
                {animes.length > 0 ? (
                  animes.map((anime: any = []) => (
                    <Col key={anime.mal_id} xs="6" lg="12" className="mb-4 mb-lg-5">
                      <Row className="align-items-center anime-container">
                        <Col xs="12" lg="4" xl="3" className="cursor-pointer mb-4 mb-lg-0" onClick={() => navigate(`/anime/${anime.mal_id}`)}>
                          <Image src={anime.images.jpg.image_url} className="w-100 h-auto anime-image" />
                        </Col>
                        <Col xs="12" lg="8" xl="9" className="px-lg-4 text-theme-secondary">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <p className="text-uppercase text-white fw-bold mb-0 clamp-2 cursor-pointer w-75" onClick={() => navigate(`/anime/${anime.mal_id}`)}><span className="title">{anime.rank ? `#${anime.rank} - ` : ''} {anime.title}</span> {anime.year && (<span className="text-theme-secondary">({anime.year})</span>)}</p>
                            <a type="button" className="text-end mb-0"><FaHeart onClick={() => dispatch(toggleFavouritelist(anime))} className={`${favourite_anime_ids[anime.mal_id] ? "text-danger" : "text-white"}`} size={30}></FaHeart></a>
                          </div>

                          <p className="mb-lg-2 mb-3"> <span className="h4 text-warning">★</span> <span className="h5 text-white">{anime.score ?? 0}</span>/10</p>
                          <div className="d-none d-lg-block">
                            <h5 className="mb-0 clamp-2 fw-normal">{anime.synopsis}</h5>
                            <hr className="border-white hr-m-lg" />
                            <div className="d-xl-flex mb-3">
                              <h5 className="fw-normal text-capitalize mb-3 mb-xl-0">{anime.episodes ? `Total ${anime.episodes} EP, ` : ''} {anime.duration}</h5>
                              <h5 className="fw-normal ms-xl-4 mb-3 mb-xl-0">Released: {anime.aired.string}</h5>
                            </div>
                            <h5 className="fw-normal mb-3">Rating: {anime.rating}</h5>
                            <h5 className="fw-normal mb-0">Studio: {anime.studios[0]?.name}</h5>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))
                ) : (
                  <Col xs="12">
                    <div className="text-center my-5">
                      <Image src="src/assets/images/not-found.png" width={300} />
                      <h2 className="text-white mb-3">No Anime Found</h2>
                      <h5 className="text-theme-secondary">Please try to search other keywords...</h5>
                    </div>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-center justify-content-lg-start">
          <AnimePagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </div>
      </Container>
    </section>
  )
}

{/* InfiniteScroll */ }
{/* <InfiniteScroll
  dataLength={animes.length}
  next={loadMore}
  hasMore={currentPage < lastPage}
  loader={<p>Loading...</p>}
  endMessage={<p>No more results</p>}
>
  {
    animes.map((anime: any = []) => (
    <div key={anime.mal_id} className="col-lg-12 col-6 mb-lg-5">
      <div className="row align-items-center anime-container" onClick={() => navigate(`/anime/${anime.mal_id}`)}>
        <div className="col-12 col-lg-4 col-xl-3 ">
          <img
            className="w-100 h-auto anime-image"
            src={anime.images.jpg.image_url}
            alt={anime.title}
          />
        </div>
        <div className="py-4 px-lg-4 col-12 col-lg-8 col-xl-9 text-theme-secondary">
          <p className="text-uppercase text-white fw-bold mb-2"><span className="title">{anime.rank ? `#${anime.rank} - ` : ''} {anime.title}</span> {anime.year && (<span className="text-theme-secondary">({anime.year})</span>)}</p>
          <p className="mb-lg-2 mb-3"> <span className="h4 text-warning">★</span> <span className="h5 text-white">{anime.score ?? 0}</span>/10</p>
          <div className="d-none d-lg-block">
            <h5 className="mb-0 clamp-2 fw-normal">{anime.synopsis}</h5>
            <hr className="border-white hr-m-lg" />
            <div className="d-xl-flex mb-3">
              <h5 className="fw-normal text-capitalize mb-3 mb-xl-0">{anime.episodes ? `Total ${anime.episodes} EP, ` : ''} {anime.duration}</h5>
              <h5 className="fw-normal ms-xl-4 mb-3 mb-xl-0">Released: {anime.aired.string}</h5>
            </div>
            <h5 className="fw-normal mb-3">Rating: {anime.rating}</h5>
            <h5 className="fw-normal mb-0">Studio: {anime.studios[0]?.name}</h5>
          </div>
        </div>
      </div>
    </div>
  ))
  }
</InfiniteScroll> */}
{/* End InfiniteScroll */ }
{/* Pagination */ }

export default AnimeList