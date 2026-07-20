export type Registration = {
  id?: string;
  eventId: string;
  title: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  distance: string;
  shirtSize: string;
  price: number;
  location: string;
  itemComplementarData: string;
  createdAt: string;
};

export type RegistrationFilters = {
  cpf: string;
  title: string;
  fullName: string;
  periodDays: "all" | "90" | "60" | "30";
};

export type RegistrationResponseItem = {
  title: string;
  eventId: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  distance: string;
  shirtSize: string;
  price: number;
  location: string;
  itemComplementarData: string;
  createdAt: string;
};
