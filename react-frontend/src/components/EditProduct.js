import React, { useState, useContext, useEffect } from 'react'
import AuthContext from './context/AuthContext'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from './axios/AxiosSetup';
import Loading from './utils/Loading';
import Select from 'react-dropdown-select'

export default function EditProduct() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const { user } = useContext(AuthContext);
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState(null);
    const [productId, setProductId] = useState(null);

    const [sizes, setSizes] = useState([])
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getProductData = async () => {
            try {
                const response = await axios.get(`product/${slug}/`)
                setProductData(response.data)
                setProductId(response.data.id)
            }
            catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        if (slug) {
            getProductData();
            setLoading(true)
        }

    }, [slug])

    useEffect(() => {
        const getSizes = async () => {
            try {
                const response = await axios.get(`get_available_sizes/${productId}/`)
                setSizes(response.data)
                setLoading(false)
            }
            catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        const getImages = async () => {
            try {
                const response = await axios.get(`images/${productId}/`)
                setImages(response.data)
                getSizes();
            }
            catch (error) {
                console.log(error)
                setLoading(false)
            }

        }

        if (productId) {
            getImages();
            setLoading(true)
        }
    }, [productId])

    console.log(images)

    // Codes from add prod

    const [error, setError] = useState(null);

    const [productEdited, setproductEdited] = useState(false);

    // Get available Categories.
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('get_categories/');
                setCategories(response.data.results);
                setLoading(false);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);

    // Product Data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [regular_price, setRegular_price] = useState(null);
    const [discount_price, setDiscount_price] = useState(null);
    const [stock, setStock] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const setData = () => {
            setName(productData.name);
            setDescription(productData.description);
            setRegular_price(productData.regular_price);
            setDiscount_price(productData.discount_price);
            setStock(productData.stock);
            setCategory(productData.category);
        }

        if (productData) {
            setData();
        }
    }, [productData]);

    // Handle Image Upload
    const [formData, setFormData] = useState(new FormData());

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    }

    useEffect(() => {
        const newFormData = new FormData();
        for (let i = 0; i < images.length; i++) {
            newFormData.append('images', images[i]);
        }
        setFormData(newFormData);
    }, [images]);

    const uploadImages = async (id) => {
        try {
            const response = await axios.post(`upload_images/${id}/`, formData);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle size upload;
    const [currentSize, setCurrentSize] = useState('');
    const [currentAvailableQuantity, setCurrentAvailableQuantity] = useState('');

    const [sizeError, setSizeError] = useState(null);

    const addSize = (e) => {
        e.preventDefault();
        // check if size already exists
        const sizeExists = sizes.find((s) => s.size === currentSize);
        if (sizeExists) {
            setSizeError("Size already exists!");
            return;
        }

        if (currentSize && currentAvailableQuantity) {
            setSizes([...sizes, {product: productData, size: currentSize, available_quantity: parseInt(currentAvailableQuantity) }]);
            setCurrentSize('');
            setCurrentAvailableQuantity('');
            setSizeError(null);
        }
        else {
            setSizeError("Please enter a size and available quantity!");
        }
    }

    const removeSize = (size) => {
        console.log("removing size: ", size, " from the list")
        setSizes(sizes.filter((s) => s.size !== size));
    }

    const uploadSizes = async (id) => {
        const sizesObj = {
            sizes: sizes,
            stock: stock
        }
        try {
            const response = await axios.post(`add_product_sizes/${id}/`, sizesObj);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Form submission

    const stockCountOkay = () => {
        let total = 0;
        sizes.forEach((s) => {
            total += s.available_quantity;
        });
        return (total === parseInt(stock))
    }

    const handleSubmit = async (e) => {
        console.log("submitted")
        e.preventDefault();
        const productData = {
            product: {
                name,
                description,
                regular_price,
                discount_price,
                stock,
            },

            category: {
                category
            },

        }

        try {
            console.log(images.length);
            if (images.length > 0 && sizes.length > 0) {
                if (stockCountOkay()) {
                    setLoading(true);
                    const response = await axios.post(`edit_product/${slug}/`, productData);
                    console.log(response.data)
                    if(response.data.error) {
                        setError(response.data.error);
                        setLoading(false);
                        return;
                    }
                    uploadImages(productId);
                    uploadSizes(productId);
                    setproductEdited(true);
                    setLoading(false);
                    window.scrollTo(0, 0);
                }
                else {
                    setError("Stock count does not match the sum of quantity of all sizes!");
                }
            }
            else {
                if (images.length === 0) {
                    setError("Please upload at least one image!");
                }
                else if (sizes.length === 0) {
                    setError("Please add at least one size!");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeImages = () => {
        setImages([]);
        document.getElementById('images').value = null;
    }

    return (
        <div>
            {loading && <Loading />}
            {(!user || (!user.is_admin && !user.is_moderator)) && <div className='flex flex-col justify-center items-center'>
                <p className='error-text text-center'>You are not authorized for this action.</p>
                <Link to={{ pathname: `/` }}><button className='my-btns m-5'>Continue shopping</button></Link>
            </div>}
            {user && (user.is_admin || user.is_moderator) && <div>
                {!productEdited && <div>
                    <p className='normal-headings'>Edit Product</p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-wrap justify-center items-center'>
                            <input disabled required type="text" className='my-input-fields w-full md:w-2/5 bg-gray-200' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of the product" />
                            <input required type="number" min={0} className='my-input-fields w-full md:w-2/5' value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Available Stocks" />
                            <input required type='number' min={0} className='my-input-fields w-full md:w-2/5' value={regular_price} onChange={(e) => setRegular_price(e.target.value)} placeholder="Regular Price" />
                            <input required type='number' min={0} className='my-input-fields w-full md:w-2/5' value={discount_price} onChange={(e) => setDiscount_price(e.target.value)} placeholder="Discount Price" />
                            <textarea className='my-input-fields w-full md:w-2/5 h-[100px] resize-none' required type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description of the product" />
                            <div className='w-full md:w-2/5 m-3'>
                                <Select
                                    required
                                    className='h-[100px]'
                                    options={categories}
                                    placeholder={category ? category.name : "Choose category..."}
                                    labelField="name"
                                    valueField="name"
                                    values={category ? [category] : []}
                                    onChange={(value) => {
                                        if (value[0] !== category) {
                                            setCategory(value[0]);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className=' flex justify-center items-center flex-wrap'>
                            <input type="text" className='my-input-fields w-full md:w-2/5' value={currentSize} onChange={(e) => setCurrentSize(e.target.value)} placeholder="Size" />
                            <input type="number" className='my-input-fields w-full md:w-2/5' value={currentAvailableQuantity} onChange={(e) => setCurrentAvailableQuantity(e.target.value)} placeholder={currentSize ? `Available Quantity of ${currentSize}` : "Available Quantity"} />
                        </div>
                        {sizeError && <div className='flex justify-center items-center'>
                            <p className='w-full md:w-1/2 error-text text-center'>{sizeError}</p>
                        </div>}
                        <div className='flex justify-center items-center'>
                            <button type='button' onClick={addSize} className='my-btns-3 w-[200px]'>Add Size</button>
                        </div>
                        {sizes.length > 0 &&
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-wrap justify-center items-center w-[82%] border border-gray-500 p-5 m-4 rounded-md'>
                                    {sizes.map((size) => (
                                        <div key={size.id}>
                                            <div className='flex justify-between items-center border border-gray-500 px-3 py-2 m-3 rounded-md'>
                                                <p className='normal-text'>{size.size} - {size.available_quantity} pieces</p>
                                                <button type='button' onClick={() => removeSize(size.size)} className='bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700 cursor-pointer'>X</button>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>}

                        <div className='md:ml-[8%]'>
                            <p className='normal-text'>Upload Images to your Product </p>
                            <div className='flex justify-start items-center'>
                                <label for="images">
                                    <div className='my-btns-3 ml-5 my-2'>Upload Images</div>
                                </label>
                                <input className='hidden font-bold mx-5 my-2 w-[250px]' type="file" accept="image/*" id="images" name="images" multiple onChange={handleImageChange} />
                                {images.length === 0 && <p className='normal-text'>No file selected</p>}
                                {images.length > 0 && <p className='normal-text'>{images.length} selected</p>}
                                {images.length > 0 && <button onClick={removeImages} type='button' className='bg-black text-white px-2 py-1 rounded-md hover:bg-gray-700 cursor-pointer'>X</button>}
                            </div>
                        </div>

                        {error && <div className='flex justify-center items-center'>
                            <p className='w-full md:w-1/2 error-text text-center'>{error}</p>
                        </div>}

                        <div className='flex justify-center items-center m-4'>
                            <button type='submit' className='my-big-btns w-[200px]'>Edit Product</button>
                        </div>
                    </form>
                </div>}

                {productEdited && slug && <div className='flex justify-center flex-col items-center m-5'>
                    <p className='success-text text-xl p-5 font-bold m-5'>Product Edited Succssfully!</p>
                    <Link to={{ pathname: `/product/${slug}` }} ><button className='my-btns m-5'>Visit this product</button></Link>
                </div>}
            </div>}
        </div>
    )
}
