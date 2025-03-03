import React from 'react'
import CategoryLabel from '@/components/CategoryLabel/CategoryLabel.jsx'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/utils/axiosInstance.js'
import ProductComponent from '@/components/ProductComponent/ProductComponent.jsx';

function RelatedItem({ id }) {
  console.log(id);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await axiosInstance.get(`/products/related/${id}`)).data,
  });
  return (
    <div>
      <CategoryLabel categoryName='Related Items' isFromProductDetails={true} />
      <div className='d-flex flex-row gap-3 overflow-auto'>
        {
          !isLoading && products.map((product) => <ProductComponent key={product.id} product={product} isWishList={false} />)
        }
      </div>
    </div>
  )
}

export default RelatedItem