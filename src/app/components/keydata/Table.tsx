'use client'

import React, { useState } from "react";
import { CAKE_PRODUCTS } from "../dashboard/data";
import Cake from "@/app/types"

const Table = () => {
  // State เพื่อเก็บข้อมูลที่ user กรอก
  const [quantities, setQuantities] = useState<{[key: string]: {[key: string]: number}}>({});

  // Function สำหรับอัพเดทข้อมูลเมื่อ user กรอก
  const handleQuantityChange = (cakeId: string, pound: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setQuantities(prev => ({
      ...prev,
      [cakeId]: {
        ...prev[cakeId],
        [pound]: numValue
      }
    }));
  };

  // Function สำหรับดูข้อมูลที่กรอก
  const showData = () => {
    console.log("ข้อมูลที่กรอก:", quantities);
    alert(JSON.stringify(quantities, null, 2));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left" rowSpan={2}>เนื้อเค้ก ราคา/ปอนด์</th>
                <th className="border p-2 text-center" colSpan={5}>จำนวนชิ้น/ขนาดปอนด์</th>
              </tr>
              <tr className="border bg-gray-100">
                <th className="border p-2 text-center">1 ปอนด์</th>
                <th className="border p-2 text-center">2 ปอนด์</th>
                <th className="border p-2 text-center">3 ปอนด์</th>
                <th className="border p-2 text-center">4 ปอนด์</th>
                <th className="border p-2 text-center">5 ปอนด์</th>
              </tr>
            </thead>
            <tbody>
              {CAKE_PRODUCTS.map((cake: Cake) => (
                <tr key={cake.id} className="border hover:bg-gray-50">
                  <td className="border p-2 font-medium">{cake.name} ({cake.price} บาท/ปอนด์)</td>
                  {['1', '2', '3', '4', '5'].map(pound => (
                    <td key={pound} className="border p-1">
                      <input
                        type="number"
                        min="0"
                        className="w-full p-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={quantities[cake.id]?.[pound] || ''}
                        onChange={(e) => handleQuantityChange(cake.id, pound, e.target.value)}
                        placeholder="0"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4 text-center">
            <button
              onClick={showData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              ดูข้อมูลที่กรอก
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;