import React, { useEffect, useState } from 'react';
import '../styles/Customers.css';

const Customers = () => {
    const [bills, setBills] = useState([]);

    // Fetch submitted bills data from localStorage
    useEffect(() => {
        const savedBills = JSON.parse(localStorage.getItem('bills')) || [];
        setBills(savedBills);
    }, []);

    return (
        <div className="customer-page">
            <h2>Customer Billing Records</h2>
            {bills.length === 0 ? (
                <p>No billing records available.</p>
            ) : (
                <div className="bill-list">
                    {bills.map((bill, index) => (
                        <div key={index} className="bill-card">
                            <div className="customer-info">
                                <h3>Customer Information</h3>
                                <p><strong>Name:</strong> {bill.customer.name}</p>
                                <p><strong>Mobile:</strong> {bill.customer.mobile}</p>
                                <p><strong>Email:</strong> {bill.customer.email}</p>
                            </div>
                            <div className="product-info">
                                <h4>Purchased Products</h4>
                                {Object.keys(bill.selectedProducts).map((productName, idx) => (
                                    <div key={idx} className="product-item">
                                        <span>{productName}</span>
                                        <span>Quantity: {bill.selectedProducts[productName]}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="total-info">
                                <strong>Total: ₹{bill.total}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Customers;
