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
  // Enhanced information
  category: 'clothing' | 'footwear' | 'electronics' | 'food' | 'services' | 'entertainment' | 'other';
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  hours?: {
    opening: string;
    closing: string;
    days: string;
  };
  description?: string;
  images?: string[];
  floorId?: string;
}

export interface Floor {
  id: string;
  name: string;
  image: string;
  description: string;
}
