import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from './axios/AxiosSetup'
import GetImages from './GetImages';
import CategoryOptions from './CategoryOptions';
import SimilarProducts from './SimilarProducts';
import Size from './productpage/Size';
import Quantity from './productpage/Quantity';
import Loading from './utils/Loading';
import Custom404 from './utils/Custom404';
import { useNavigate } from 'react-router-dom';
import QnA from './productpage/QnA';
import GetReviews from './productpage/GetReviews';
import PostReviews from './productpage/PostReviews';
import { Link } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Confirmation from './utils/Confirmation';

export default function Product() {

  const { user } = useContext(AuthContext);
  const { slug } = useParams();
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState([]);
  const [fetchComleted, setFetchCompleted] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`product/${slug}/`)
        setProductId(response.data.id)
        setProductData(response.data)
        setFetchCompleted(true)
      } catch (error) {
        console.log(error)
        setFetchCompleted(true)
      }
    }

    const ifInWishlist = async () => {
      try {
        const response = await axios.get(`if_in_wishlist/${slug}/`)
        setAddedToWishlist(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct();
    if (user) {
      ifInWishlist();
    }

  }, [slug, productId])

  const [productSize, selectedProductSize] = useState(null);
  const [productQuantity, selectedProductQuantity] = useState(1);

  // Get the available product count of the selected size
  const [sizeStock, setSizeStock] = useState(0);

  // const minusAmount = (sizeToBeDeducted) => {
  //   // Deduct the amount of the selected size that are present in the cart and setSizeStock;
  //   const existingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  //   let count = 0;
  //   existingCart.forEach((item) => {
  //     if (item.size[0].size === sizeToBeDeducted) {
  //       count += item.quantity;
  //     }
  //   });

  //   setSizeStock((prev) => prev - count);
  // }

  useEffect(() => {
    const fetchStock = async () => {
      if (productSize) {
        try {
          const response = await axios.get(`get_size_specific_stock/${productId}/${productSize[0].size}/`)
          console.log(response.data)
          setSizeStock(response.data)
          // Minus the ones that are in the cart.
          // minusAmount(productSize[0].size)
        } catch (error) {
          console.log(error)
        }
      }
    }

    fetchStock();

  }, [productSize])

  const [addedToCart, setAddedToCart] = useState(false);

  const AddToCart = () => {
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cart.findIndex((item) => item.productData.id === productData.id && item.size[0].size === productSize[0].size);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += productQuantity;
    }
    else {
      const newItem = { id: cart.length, size: productSize, quantity: productQuantity, productData };
      cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);

  }

  const navigate = useNavigate();

  const handleBuyNow = () => {
    localStorage.setItem('buy_now_product', JSON.stringify([{ size: productSize, quantity: productQuantity, productData }]));
    navigate('/checkout');
  }

  const changeWishList = async () => {
    setAddedToWishlist(!addedToWishlist)
    try {
      const response = await axios.post(`change_wishlist/${slug}/`)
    } catch (error) {
      console.log(error)
    }
  }

  const [isEligibleReviewer, setIsEligibleReviewer] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const response = await axios.get(`is_eligible_reviewer/${slug}/`)
        setIsEligibleReviewer(response.data.is_eligible)
      } catch (error) {
        console.log(error)
      }
    }

    if (slug && user) {
      checkEligibility();
    }

  }, [slug, reviewAdded])

  const deleteMessage = "Are you sure you want to delete this product? This action is irreversible!"
  const event = "delete-product"
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const deleteBtnClicked = () => {
    setShowDeleteConfirmation(true);
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`delete_product/${slug}/`)
      console.log(response)
      if (response.status === 204) {
        navigate('/')
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <CategoryOptions />
      {showDeleteConfirmation && <Confirmation message={deleteMessage} event={event} yesClicked={handleDelete} noClicked={cancelDelete} />}
      {productData && productId && <div>
        <div className='my-5 grid grid-cols-1 lg:grid-cols-2'>
          {/* IMAGES */}
          <div>
            <GetImages productId={productId} />
          </div>

          {/* OTHER DATA */}
          <div className='sm:ml-[100px] md:ml-[200px] lg:ml-0'>
            <p className='text-3xl sm:text-4xl font-bold mx-10 my-5 lg:mx-20 text-left'>{productData.name}</p>
            {productData.stock > 0 &&
              <div>
                <div className='text-1xl sm:text-2xl font-bold mx-10 my-5 lg:mx-20 text-left flex items-center'>
                  <p>Availability : </p> <p className='success-text'>In stock</p>
                </div>
                <div>
                  {sizeStock > 0 && <p className='alert-text text-center mx-10 lg:mx-20 w-[250px]'>Only {sizeStock} left. Hurry up!</p>}
                  {sizeStock <= 0 && <p className='alert-text text-center mx-10 lg:mx-20 w-[250px]'>This size is unavailable at this moment.</p>}
                </div>
              </div>}

            {productData.stock <= 0 &&
              <div className='text-1xl sm:text-2xl font-bold mx-10 my-5 lg:mx-20 text-left flex items-center'>
                <p>Availability : </p> <p className='error-text'>Out of stock</p>
              </div>}

            {productData.discount_price && productData.regular_price &&
              <div className='flex items-center mx-10 my-5 lg:mx-20'>
                <p className='cut-price text-2xl lg:text-4xl mr-2'>TK {productData.regular_price} </p>
                <p className='discount_price text-2xl lg:text-4xl ml-2'> TK {productData.discount_price}</p>
              </div>}
            {!productData.discount_price &&
              <div className='price mx-10 my-5 lg:mx-20 text-left'>
                <p className='text-4xl'>TK {productData.regular_price}</p>
              </div>}

            {productData.stock > 0 && <div>
              <Size productId={productId} selectedProductSize={selectedProductSize} />
              <Quantity selectedProductQuantity={selectedProductQuantity} sizeStock={sizeStock} />
            </div>}

            {addedToCart &&
              <p className='fixed success-text text-center w-[250px] bottom-5 right-5 animate-bounce'>Added to cart</p>
            }

            <div className='flex  mx-10 my-5 lg:mx-20 items-center'>
              {productData.stock > 0 && sizeStock > 0 && <button onClick={AddToCart} className='my-btns mr-2 w-[120px] md:w-[150px] text-[12px] md:text-base'>Add To Cart</button>}
              <button onClick={changeWishList} className='my-btns m-1 w-[70px] md:w-[150px] text-[12px] md:text-base' >{addedToWishlist ? 'Unsave' : 'Save'}</button>
              {productData.stock > 0 && sizeStock > 0 && <button onClick={handleBuyNow} className='my-btns ml-2 w-[120px] md:w-[150px] text-[12px] md:text-base'>Buy Now</button>}
            </div>
          </div>
        </div>
        {user && (user.is_admin || user.is_moderator) && <div className='flex justify-center items-center'>
          <Link to={{ pathname: `/edit-product/${slug}` }}><button className='my-btns w-[100px] m-1'>Edit</button></Link>
          <button onClick={deleteBtnClicked} className='my-btns w-[100px] m-1'>Delete</button>
        </div>}

        <div className='my-20 mx-10 md:mx-20'>
          <p className='normal-headings text-left mx-0'>Product Description</p>
          <hr className='border-black ' />
          <p className='normal-text text-left mx-0 whitespace-pre-wrap'>{productData.description}</p>
        </div>
        {isEligibleReviewer && <PostReviews slug={slug} reviewAdded={reviewAdded} setReviewAdded={setReviewAdded} />}
        <GetReviews slug={slug} reviewAdded={reviewAdded} avgRating={productData.avg_rating} totalReviews={productData.total_reviews} />
        <QnA slug={slug} />

        <SimilarProducts slug={productData.category.slug} />

      </div>}

      {(!productData || !productId) && !fetchComleted && <Loading />}
      {(!productData || !productId) && fetchComleted && <Custom404 />}

    </div>
  )
}
