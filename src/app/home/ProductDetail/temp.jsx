// pages/product/[name].jsx
import { useRouter } from 'next/router';

const ProductDetail = () => {

    
  const router = useRouter();
  const { name } = router.query; // Extract product name from the URL

  return (
    <div>
      <h1>Product Details</h1>
      {/* <p>Product Name: {name}</p> */}
      {/* Fetch and display product details based on the name */}
      {/* Here you can fetch product data from an API or static data */}
    </div>
  );
};

export default ProductDetail;
