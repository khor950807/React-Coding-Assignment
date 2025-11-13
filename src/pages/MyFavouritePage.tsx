import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../store";
import { Container, Image } from "react-bootstrap";

import AnimeFavouriteCard from "../components/AnimeFavouriteCard";
import { Button } from "react-bootstrap";
import { clearFavouritelist } from "../store/animeFavouriteSlice";

const MyFavouritePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        favourite_anime_ids,
        total_favourite_ids
    } = useSelector((state: RootState) => state.animeFavourite);

    return (
        <div className="position-relative min-vh-100">
            <div className="w-100 py-4">
                <Container>
                    <h1 className="text-theme-secondary mb-0 d-flex align-items-center"><Button className="me-3" onClick={() => navigate('/anime')}>← Back</Button>My Favourite Anime</h1>
                    <hr className="border-white hr-m-lg" />

                    {total_favourite_ids > 0 ? (
                        <div>
                            <Button variant="danger" onClick={() => dispatch(clearFavouritelist())} className="mb-4">Clear All</Button>
                            {Object.values(favourite_anime_ids).map((anime: any) => (
                                <AnimeFavouriteCard key={anime.mal_id} mal_id={anime.mal_id} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center my-5">
                            <Image src="src/assets/images/not-found.png" className="mb-4" width={300} />
                            <h2 className="text-white mb-0">No Favourite Anime Found</h2>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    )
}

export default MyFavouritePage