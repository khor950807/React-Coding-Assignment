export interface Option {
  value: string;
  label: string;
}

export interface AnimeDetailState {
  anime: any;
  loading: boolean;
  error: any;
}

export interface AnimeState {
  animes: any;
  loading: boolean;
  error: any;
  currentPage: number;
  pageLimit: number;
  totalFound: number;
  sortBy: string;
  orderBy: string;
  lastPage: number;
  selectedRating: string;
  selectedType: string;
  searchTerm: string;
}

export interface Props {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}
