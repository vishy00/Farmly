import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className='w-full mt-16'>
                <div className='space-y-1'>
                    <h2 className='text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight'>
                        Best <span className='text-orange-500'>Sellers</span>
                    </h2>
                    <p className='text-zinc-500 font-medium text-sm'>Showing you the most bought Products</p>
                </div>
      
      {/* Glass Container */}
      <div
        className=' bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-4 sm:p-6 md:p-8'>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
                        gap-3 sm:gap-4 md:gap-6'>
          {products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>

    </div>
  )
}

export default BestSeller