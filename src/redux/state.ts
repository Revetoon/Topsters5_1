export type State = {
  title: string;
  showTitles: boolean;
  rows: number;
  columns: number;
  featured: number;
  backgroundType: BackgroundType;
  sort: Sort;
  imageFilter: ImageFilter;
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundOpacity: number;
  gradientDirection: Direction;
  gap: number;
  borderColor: string;
  isCircle: boolean;
  borderSize: number;
  borderRadius: number;
  showNumbers: boolean;
  showEloRating: boolean;
  showShadows: boolean;
  font: Font | string;
  fontSize: number;
  textColor: string;
  titlesPosition: Position;
  items: Item[];
  sortedItems: Item[];
  battleItems: number[];
  numberBattleItems: number;
  lockWinner: boolean;
};

export enum BackgroundType {
  color = "Color",
  gradient = "Gradient",
  radialGradient = "Radial gradient",
}

export enum Sort {
  // This is the custom sort order
  none = "None",
  default = "Default",
  elo = "Elo Rating",
}

export enum ImageFilter {
  normal = "Normal",
  grayscale = "Grayscale",
  sepia = "Sepia",
  saturate = "Saturate",
  hueRotate = "Hue rotate",
  invert = "Invert",
}

export enum Direction {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left",
  topRight = "top right",
  bottomRight = "bottom right",
  bottomLeft = "bottom left",
  topLeft = "top left",
  center = "center",
}

export enum Font {
  monospace = "Monospace",
  lato = "Lato",
}

export enum Position {
  side = "Side",
  cover = "Cover",
}

export enum Category {
  games = "games",
  music = "music",
  lastfm = "Lastfm",
  movies = "movies",
  tvshows = "TV shows",
  books = "books",
  pictures = "pictures",
}

// overall | 7day | 1month | 3month | 6month | 12month
export enum Period {
  overall = "overall",
  week = "7day",
  month = "1month",
  threeMonths = "3month",
  sixMonths = "6month",
  year = "12month",
}

export interface Item {
  title: string;
  cover: string;
  elo: number;
}
