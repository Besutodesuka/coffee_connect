// pages/product/[name].jsx
import { useRouter } from 'next/router';

const AuctionDetail = () => {

    
  const router = useRouter();
  const { name } = router.query; // Extract product name from the URL

  return (
    <div>
      <h1>Auction Details</h1>
      {/* <p>Product Name: {name}</p> */}
      {/* Fetch and display product details based on the name */}
      {/* Here you can fetch product data from an API or static data */}
    </div>
  );
};

export default AuctionDetail;
