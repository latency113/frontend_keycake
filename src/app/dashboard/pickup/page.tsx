'use client';
import React from 'react';

const CakePickupPage = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50' }}>รับเค้กที่สั่งจองไว้</h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>กรุณากรอกหมายเลขคำสั่งซื้อเพื่อยืนยันการรับเค้ก</p>
      </header>
      
      <main style={{ maxWidth: '500px', margin: '0 auto', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="orderId" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}>หมายเลขคำสั่งซื้อ:</label>
          <input 
            type="text" 
            id="orderId" 
            name="orderId" 
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
            placeholder="เช่น ORD-12345"
          />
        </div>
        
        <button 
          style={{ 
            width: '100%',
            padding: '0.75rem 1.5rem', 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            color: '#fff', 
            backgroundColor: '#3498db', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
        >
          ค้นหาคำสั่งซื้อ
        </button>
      </main>

      {/* You can add a section here to display order details later */}
      {/* <section style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <h2>รายละเอียดคำสั่งซื้อ</h2>
        <p><strong>หมายเลข:</strong> [Order ID]</p>
        <p><strong>ลูกค้า:</strong> [Customer Name]</p>
        <p><strong>เค้ก:</strong> [Cake Details]</p>
        <p><strong>สถานะ:</strong> <span style={{color: 'green'}}>พร้อมรับ</span></p>
      </section> */}
    </div>
  );
};

export default CakePickupPage;
