export interface Lodging {
  _id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  description: string;
  rating: number;
  rooms: any[];
  cheapestPrice: number;
  featured: boolean;
}
