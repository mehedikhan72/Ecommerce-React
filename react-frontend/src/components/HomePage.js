import React, { useContext } from 'react'
import ProductCategories from './ProductCategories'
import NewArrivals from './NewArrivals'
import AuthContext from './context/AuthContext'

export default function HomePage() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <div>
      <ProductCategories />
      <NewArrivals />
    </div>
  )
}
