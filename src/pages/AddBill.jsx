import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBill = () => {

    const [customerName, setCustomerName] = useState('')
    const [customerMobile, setCustomerMobile] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const navigate = useNavigate('')

    const handleAddCustomer = (e) => {
        e.preventDefault();
        const customerData = {
            name: customerName,
            mobile: customerMobile,
            email: customerEmail
        };

        localStorage.setItem('customerData', JSON.stringify(customerData)); // Save customer data
        navigate('/billing'); // Redirect to Billing page
    };
  return (
    <div className="customer-container">
    <h2 className="customer-title">Add Customer</h2>
    <form className="customer-form" onSubmit={handleAddCustomer}>
        <div className="form-group">
            <label>Name</label>
            <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="Enter customer name"
            />
        </div>
        <div className="form-group">
            <label>Mobile Number</label>
            <input
                type="tel"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
                required
                placeholder="Enter mobile number"
            />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                placeholder="Enter email address"
            />
        </div>
        <button type="submit" className="submit-btn">Proceed to Billing</button>
    </form>
</div>
);
};

export default AddBill;