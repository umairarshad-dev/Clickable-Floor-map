export interface PolygonPoint {
  x: number;
  y: number;
}

export interface Shop {
  id: string;
  name: string;
  size: string;
  status: 'rented' | 'vacant';
  rentStatus: 'paid' | 'unpaid' | 'n/a';
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  polygon?: PolygonPoint[];
}
