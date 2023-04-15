import React from 'react'
import { useParams } from 'react-router-dom'

export default function Product() {
    const { slug } = useParams();
    const url = `http://127.0.0.1:8000/api/product/${slug}/`
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
  return (
    <div>
      
    </div>
  )
}
