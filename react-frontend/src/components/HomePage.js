import React, { useContext } from 'react'
import ProductCategories from './ProductCategories'
import NewArrivals from './NewArrivals'
import AuthContext from './context/AuthContext'
import TopSales from './hero/TopSales'
import Featurings from './hero/Featurings'

export default function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Featurings />
      <TopSales />
      <ProductCategories />
      <NewArrivals />
    </div>
  )
}
