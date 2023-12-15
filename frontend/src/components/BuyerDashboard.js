import React from 'react'
import Carousel from "./Carousel"
import PopularProducts from './PopularProducts';


const BuyerDashboard = ({popularProducts}) => {
  return (
    <div>
        <Carousel />

        <section className="popular-products">
        <h2 className='display-3 mt-5 mb-3' style={{ fontWeight: " 700 " }}>Popular Rentals</h2>
        <div className="product-list card-group">
          {/* {popularProducts.map(product => (
            <ProductCard product={product} key={product.id} />
          ))} */}
          <PopularProducts popularProducts={popularProducts} />
        </div>
      </section>


    </div>
  )
}

export default BuyerDashboard