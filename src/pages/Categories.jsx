import React, { useState, useEffect } from 'react';
import '../styles/Categories.css'

const Categories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryList, setCategoryList] = useState([]); // Avoid naming conflict

    // Load categories from local storage when the component mounts
    useEffect(() => {
        const savedCategories = localStorage.getItem('categoryList');
        if (savedCategories) {
            setCategoryList(JSON.parse(savedCategories));
            //console.log("Loaded categories from local storage:", JSON.parse(savedCategories));
        }
    }, []);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (categoryName.trim() !== '') {
            const updatedCategories = [...categoryList, categoryName];
            setCategoryList(updatedCategories);
            localStorage.setItem('categoryList', JSON.stringify(updatedCategories));
            //console.log("Saved updated categories to local storage:", updatedCategories);
            setCategoryName('');
        }
    };

    const handleDeleteCategory = (index) => {
        const updatedCategories = categoryList.filter((_, i) => i !== index);
        setCategoryList(updatedCategories);
        localStorage.setItem('categoryList', JSON.stringify(updatedCategories));
        //console.log("Updated categories after deletion:", updatedCategories);
    };

    return (
        <div className="category-container">
            <h2 className="category-title">Manage Categories</h2>
            
            {/* Category Form */}
            <form className="category-form" onSubmit={handleAddCategory}>
                <label htmlFor="categoryName">Category Name:</label>
                <input
                    type="text"
                    id="categoryName"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                />
                <button type="submit">Add Category</button>
            </form>

            {/* Category List */}
            <div className="category-list">
                {categoryList.map((category, index) => (
                    <div key={index} className="category-item">
                        <p>{category}</p>
                        <button onClick={() => handleDeleteCategory(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
