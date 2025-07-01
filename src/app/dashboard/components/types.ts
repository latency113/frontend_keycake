
export interface Order {
  id: string;
  date: string;
  department: string;
  items: { product: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  isPickedUp?: boolean; // เพิ่มสถานะการรับเค้ก
}
