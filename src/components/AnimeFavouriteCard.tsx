import React from "react";
import type { MyFavouriteState } from "../types/MyFavouriteInterface";
import { removeFromFavouritelist } from "../store/animeFavouriteSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { Row, Col, Image } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AnimeFavouriteCard: React.FC<MyFavouriteState> = ({ mal_id, anime }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <Row>
            <Col key={mal_id} xs="6" lg="12" className="mb-4 mb-lg-5">
                <Row className="align-items-center anime-container">
                    <Col xs="12" lg="4" xl="3" className="cursor-pointer mb-4 mb-lg-0" onClick={() => navigate(`/anime/${mal_id}`)}>
                        <Image src={anime.images.jpg.image_url} className="w-100 h-auto anime-image" />
                    </Col>
                    <Col xs="12" lg="8" xl="9" className="px-lg-4 text-theme-secondary">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <p className="text-uppercase text-white fw-bold mb-0 clamp-2 cursor-pointer w-75" onClick={() => navigate(`/anime/${mal_id}`)}><span className="title">{anime.rank ? `#${anime.rank} - ` : ''} {anime.title}</span> {anime.year && (<span className="text-theme-secondary">({anime.year})</span>)}</p>
                            <a type="button" className="text-end mb-0"><FaHeart onClick={() => dispatch(removeFromFavouritelist(mal_id))} className="text-danger" size={30}></FaHeart></a>
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
        </Row>

    );
}

export default AnimeFavouriteCard