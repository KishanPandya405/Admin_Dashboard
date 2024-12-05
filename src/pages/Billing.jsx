import React, { useState, useEffect } from 'react';
import '../styles/Billing.css';

const Billing = () => {
    const [products, setProducts] = useState([]);
    const [customerData, setCustomerData] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});
    const [total, setTotal] = useState(0);

    // Fetch data from localStorage on load
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('submittedProducts'));
        const savedCustomerData = JSON.parse(localStorage.getItem('customerData'));
        if (savedProducts) setProducts(savedProducts);
        if (savedCustomerData) setCustomerData(savedCustomerData);
    }, []);

    // Update total whenever selected products change
    useEffect(() => {
        const totalAmount = Object.keys(selectedProducts).reduce((acc, productName) => {
            const quantity = selectedProducts[productName];
            const product = products.find(p => p.name === productName);
            return acc + (product.price * quantity);
        }, 0);
        setTotal(totalAmount);
    }, [selectedProducts, products]);

    const handleQuantityChange = (productName, quantity) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productName]: quantity
        }));
    };

    // Handle billing submission
    const handleSubmit = () => {
        const billData = {
            customer: customerData,
            selectedProducts,
            total,
        };

        // Save to localStorage
        const bills = JSON.parse(localStorage.getItem('bills')) || [];
        bills.push(billData);
        localStorage.setItem('bills', JSON.stringify(bills));

        // Reset after submission
        setSelectedProducts({});
        setTotal(0);

        alert("Billing completed successfully!");
    };

    return (
        <div className="billing-container">
            <h2>Billing Page</h2>
            <div className="customer-info">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {customerData.name}</p>
                <p><strong>Mobile:</strong> {customerData.mobile}</p>
                <p><strong>Email:</strong> {customerData.email}</p>
            </div>
            <div className="product-list">
                <h3>Select Products</h3>
                {products.map((product, index) => (
                    <div key={index} className="product-item">
                        <span>{product.name}</span>
                        <span>₹{product.price}</span>
                        <input
                            type="number"
                            min="0"
                            value={selectedProducts[product.name] || 0}
                            onChange={(e) =>
                                handleQuantityChange(product.name, parseInt(e.target.value) || 0)
                            }
                        />
                    </div>
                ))}
            </div>
            <div className="total-container">
                <h3>Total: ₹{total}</h3>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Submit Bill</button>
        </div>
    );
};

export default Billing;
