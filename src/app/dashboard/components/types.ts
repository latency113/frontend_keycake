
export interface Order {
  id: string;
  date: string;
  department: string;
  items: { product: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
}
