// C:\Users\ken\coffee_connect\coffee_connect\src\app\home\ProductDetail\[ProductID]\page.jsx
'use client'; // Add this to make the component a Client Component

import React, { useEffect, useState } from 'react';
import Navbar from "../../../components/navbar";
import Footer from "../../../components/Footer";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import StarRate from "../../../components/Grade";

const ProductDetail = ({ params }) => {
  const { ProductID } = params; // Extract ProductID from the dynamic route params
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/login');
  }, [session, status, router]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/search/${ProductID}`); // Call the API to get product data
        if (!res.ok) throw new Error('Failed to fetch product data');
        const data = await res.json();
        setProduct(data); // Update the product state with fetched data
      } catch (err) {
        setError(err.message); // Update the error state if fetching fails
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };
    fetchProduct();
  }, [ProductID]); // Run the effect whenever ProductID changes

  if (error) {
    return <div>Error: {error}</div>; // Display error state
  }

  if (!product) {
    return <div>Product not found.</div>; // Display when no product is found
  }

  // Render the product details
  return (
    
    <div >
      <Navbar session={session} />
      <h1>Product Details: {product.product_name}</h1>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Product Image */}
        <div>
          <img
            src={product.image || '/Coffee_Product.svg'} // Use the product image or fallback
            alt={product.product_name}
            style={{ width: '300px', borderRadius: '10px' }}
          />
        </div>

        {/* Product Information */}
        
        <div>

          <div className='items-start'>
            <StarRate score={product.grade}/>
          </div>

          <h1>{product.product_name}</h1>
          <p>
            <strong>Price:</strong> {product.price} $
          </p>
          <p>{product.description || 'No description available.'}</p>

          {product.details && (
            <ul>
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          )}
          
          <button
            style={{
              backgroundColor: '#f60',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Shipping Information */}
      {product.shipping && (
        <div style={{ marginTop: '30px' }}>
          <h3>Shipping Information</h3>
          <ul>
            {product.shipping.map((ship, index) => (
              <li key={index}>
                <strong>{ship.method}:</strong> {ship.price}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDetail;
