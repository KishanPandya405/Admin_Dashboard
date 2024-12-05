// ProductPage.js
import React, { useState, useEffect } from 'react';
import '../styles/Product.css'

const Products = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [submittedProducts, setSubmittedProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Load products and categories from local storage on component mount
    useEffect(() => {
        const savedProducts = localStorage.getItem('submittedProducts');
        if (savedProducts) {
            setSubmittedProducts(JSON.parse(savedProducts));
        }

        const savedCategories = localStorage.getItem('categoryList');
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name: productName,
            price: productPrice,
            category: productCategory,
            description: productDescription
        };

        const updatedProducts = [...submittedProducts, newProduct];
        setSubmittedProducts(updatedProducts);
        localStorage.setItem('submittedProducts', JSON.stringify(updatedProducts));

        // Save updated products to local storage
        localStorage.setItem('submittedProducts', JSON.stringify(updatedProducts));

        // Clear form fields after submission
        setProductName('');
        setProductPrice('');
        setProductCategory('');
        setProductDescription('');
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = submittedProducts.filter((_, i) => i !== index);
        setSubmittedProducts(updatedProducts);
        localStorage.setItem('submittedProducts', JSON.stringify(updatedProducts));
    };


  return (
    <>
    <main className="product-container">
      <h3 className="product-title">Add New Product</h3>
      <form className="product-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="productCategory">Category</label>
        <select
                            id="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
        </div>
        <div className="form-group">
        <label htmlFor="productDescription">Description</label>
                        <textarea 
                            id="productDescription"
                            value={productDescription} 
                            onChange={(e) => setProductDescription(e.target.value)} 
                            placeholder="Enter product description" 
                            required 
                        />
        </div>
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </main>
    <div className="submitted-products">
    <h3 className="section-title">Product List</h3>
    {submittedProducts.length === 0 ? (
        <p className="no-products">No products added yet.</p>
    ) : (
        <div className="product-table">
            <div className="table-header">
                <span className="table-cell">Name</span>
                <span className="table-cell">Price</span>
                <span className="table-cell">Category</span>
                <span className="table-cell">Description</span>
            </div>
            {submittedProducts.map((product, index) => (
                <div className="table-row" key={index}>
                    <span className="table-cell">{product.name}</span>
                    <span className="table-cell">₹{product.price}</span>
                    <span className="table-cell">{product.category}</span>
                    <span className="table-cell">{product.description}</span>
                    <span className="table-cell">
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteProduct(index)}
                                    >
                                        Delete
                                    </button>
                                </span>
                </div>
            ))}
        </div>
    )}
</div>
    </>
  );
};

export default Products;
