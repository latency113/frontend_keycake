
export interface Order {
  id: string;
  date: string;
  department: string;
  items: { product: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'completed';
  isPickedUp?: boolean; // เพิ่มสถานะการรับเค้ก
}

export interface Branch {
  id: string
  name: string
}

export interface Room {
  id:string
  room_number:number
  branch_id:string
}

export interface Cake {
  id:string
  name:string
  price:number
  unit:string
}