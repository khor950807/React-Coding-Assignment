import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeDetails, clearAnimeDetail } from "../store/animeDetailSlice";
import type { RootState, AppDispatch } from "../store";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Col, Row, Image } from "react-bootstrap";
import { toggleFavouritelist } from "../store/animeFavouriteSlice";
import { FaHeart } from "react-icons/fa";

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { anime, loading, error } = useSelector(
    (state: RootState) => state.animeDetail
  );

  const {
    favourite_anime_ids
  } = useSelector((state: RootState) => state.animeFavourite);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetails(id));
    }

    return () => {
      dispatch(clearAnimeDetail());
    };
  }, [id, dispatch]);

  if (error) {
    return (
      <div className="position-relative min-vh-100">
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
      </div>
    )
  }

  return (
    <div className="position-relative min-vh-100">
      <Container className="my-4">
        <h1 className="text-theme-secondary mb-0 d-flex align-items-center"><Button className="me-3" onClick={() => navigate('/anime')}>← Back</Button>Details Page</h1>
        <hr className="border-white hr-m-lg" />
      </Container>

      {loading ? (
        <Container className="text-white">
          <SkeletonTheme baseColor="#000" highlightColor="#222222">
            <div className="row justify-content-center mt-4">
              <div className="col-6 col-md-3">
                <Skeleton className="w-100 anime-image-skeleton" />
              </div>

              <div className="col-12 col-md-9 ps-md-5 mt-5 mt-md-0">
                <h2 className="fw-bold"><Skeleton className="w-100" height={38.5} /></h2>
                <p className="text-white"><Skeleton className="w-100" height={200} /></p>
                <p><Skeleton className="w-100" height={24} /></p>
                <hr />
                <p><Skeleton className="w-100" height={24} /></p>
                <p><Skeleton className="w-100" height={24} /></p>
                <p><Skeleton className="w-100" height={24} /></p>
                <p><Skeleton className="w-100" height={24} /></p>
                <p><Skeleton className="w-100" height={24} /></p>
                <p><Skeleton className="w-100" height={24} /></p>
              </div>
            </div>
          </SkeletonTheme>
        </Container>
      ) : (
        <div>
          {anime && Object.keys(anime).length > 0 && (
            <Container className="text-white">
              <Col key={anime.mal_id} xs="6" lg="12" className="mb-4 mb-lg-5">
                <Row className="align-items-center anime-container">
                  <Col xs="12" lg="4" xl="3" className="cursor-pointer mb-4 mb-lg-0">
                    <Image src={anime.images.jpg.image_url} className="w-100 h-auto anime-image" />
                  </Col>
                  <Col xs="12" lg="8" xl="9" className="px-lg-4 text-theme-secondary">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <p className="text-uppercase text-white fw-bold mb-0 clamp-2 cursor-pointer w-75"><span className="title">{anime.rank ? `#${anime.rank} - ` : ''} {anime.title}</span> {anime.year && (<span className="text-theme-secondary">({anime.year})</span>)}</p>
                      <a type="button" className="text-end mb-0"><FaHeart onClick={() => dispatch(toggleFavouritelist(anime))} className={`${favourite_anime_ids[anime.mal_id] ? "text-danger" : "text-white"}`} size={30}></FaHeart></a>
                    </div>

                    <p className="mb-lg-2 mb-3"> <span className="h4 text-warning">★</span> <span className="h5 text-white">{anime.score ?? 0}</span>/10</p>
                    <div className="d-none d-lg-block">
                      <p>{anime.synopsis}</p>
                      <hr />
                      <p><strong>Episodes: </strong> {anime.episodes ?? "N/A"}</p>
                      <p><strong>Duration: </strong> {anime.duration}</p>
                      <p><strong>Year: </strong> {anime.year ?? "N/A"}</p>
                      <p><strong>Rating: </strong> {anime.rating}</p>
                      <p><strong>Studio: </strong> {anime.studios?.[0]?.name ?? "N/A"}</p>
                      <p className="mb-0">
                        <strong>Producers: </strong>
                        {anime.producers?.map((p: any) => p.name).join(", ") || "N/A"}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Container>
          )}
        </div>
      )}
    </div>
  )
};

export default AnimeDetails;