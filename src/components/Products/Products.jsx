import React, { useContext } from 'react'
import { ProductsInRoutesContext } from '@/contexts/ProductsInRoutesContext'
import { useLocation, useNavigate } from 'react-router-dom';
import ProductComponent from '@/components/ProductComponent/ProductComponent.jsx';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance.js';

function Products() {
  const { productsInRoutes } = useContext(ProductsInRoutesContext);
  const navigate = useNavigate();
  const location = useLocation();
  const productType = location.state?.productType
  const queryClient = useQueryClient();
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["newArrivalProducts"],
    enabled: !!productType,
    queryFn: async () => (await axiosInstance.get(`/products/newarrivals/${productType}`)).data
  });
  
  return (
    <div className='container'>
      <div className='d-flex gap-2 mt-4'>
        <div onClick={() => navigate("/")} className='homeNav'>Home</div>
        <div style={{ color: "grey" }}>/</div>
        <div>Products</div>
      </div>
      <div className='mt-5 d-flex gap-5 flex-wrap'>
        {
          productType ?
            isLoading ? <div>Loading...</div>
              :
              response.products.map((product) => <ProductComponent key={product.id} product={product} />)
            : productsInRoutes.map((product) => <ProductComponent isFlashSale={product.flashSale} key={product.id} product={product} />)
        }
      </div>
    </div>
  )
}

export default Products