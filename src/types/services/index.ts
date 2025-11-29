export type ServiceType = "visage" | "massage" | "nails" | "eyelashes" | "hair";

export type ServiceListItem = {
  title: string;
  price: number | string;
  description?: string;
  currency?: string;
};

export type Service = {
  id: number;
  name: string;
  list: ServiceListItem[];
  type: ServiceType;
};
