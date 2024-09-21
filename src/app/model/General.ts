export interface Login {
  username: string;
  password: string;
}

export interface List {
  page: number;
  size: number;
}

export interface LogoStyle {
  height: string;
  margin: string;
}

export interface Src {
  country: string;
  iso3: string;
  time: string;
  airline: string;
}

export interface Dst {
  country: string;
  iso3: string;
  time: string;
  airline: string;
}

export interface Flight {
  logoSrc: string;
  logoStyle: LogoStyle;
  src: Src;
  dst: Dst;
  boarding: string;
  transfer: boolean;
  gates: number;
  seat: string;
  price: string;
  class: string;
}

export interface ListResponse {
  total: number;
  result: Flight[];
}
