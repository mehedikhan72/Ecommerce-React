import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Select from 'react-dropdown-select'
import axios from '../axios/AxiosSetup'
import { Link } from 'react-router-dom';

export default function AddProduct() {
    const { user } = useContext(AuthContext);

    const [error, setError] = useState(null);

    const [productAdded, setProductAdded] = useState(false);
    const [addedProductSlug, setAddedProductSlug] = useState(null);

    // Get available Categories.
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('get_categories/');
                setCategories(response.data.results);
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
    // slug field
    const [category, setCategory] = useState(null);

    // Handle Image Upload
    const [images, setImages] = useState([]);
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
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle size upload
    const [sizes, setSizes] = useState([]);
    const [currentSize, setCurrentSize] = useState('');
    const [currentAvailableQuantity, setCurrentAvailableQuantity] = useState('');

    const [sizeError, setSizeError] = useState(null);

    const addSize = (e) => {
        e.preventDefault();
        // check if size already exists
        const sizeExists = sizes.find((s) => s.size === currentSize);
        console.log(sizeExists)
        if (sizeExists) {
            setSizeError("Size already exists");
            return;
        }

        if (currentSize && currentAvailableQuantity) {
            setSizes([...sizes, { size: currentSize, available_quantity: parseInt(currentAvailableQuantity) }]);
            setCurrentSize('');
            setCurrentAvailableQuantity('');
            setSizeError(null);
        }
    }

    const removeSize = (size) => {
        console.log("removing size: ", size, " from the list")
        setSizes(sizes.filter((s) => s.size !== size));
    }

    const uploadSizes = async (id) => {
        try {
            const response = await axios.post(`add_product_sizes/${id}/`, sizes);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            name,
            description,
            regular_price,
            discount_price,
            stock,
        }

        try {
            if (images.length > 0 && sizes.length > 0) {
                const response = await axios.post(`category/${category[0].slug}/`, productData);
                uploadImages(response.data.id);
                uploadSizes(response.data.id);
                setProductAdded(true);
                setAddedProductSlug(response.data.slug);
            }
            else {
                if (images.length === 0) {
                    setError("Please upload at least one image");
                }
                else if (sizes.length === 0) {
                    setError("Please add at least one size");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // TODO: I need to come up with a theme for this app and then design the Add size buttons accordingly.

    return (
        <div>
            {!productAdded && <div>
                <p className='normal-headings'>Add a product!!</p>
                {error && <div className='flex justify-center items-center'>
                    <p className='w-full md:w-1/2 error-text text-center'>{error}</p>
                </div>}
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-wrap justify-center items-center'>
                        <input required type="text" className='my-input-fields w-full md:w-2/5' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of the product" />
                        <input required type="number" min={0} className='my-input-fields w-full md:w-2/5' value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Available Stocks" />
                        <input required type='number' min={0} className='my-input-fields w-full md:w-2/5' value={regular_price} onChange={(e) => setRegular_price(e.target.value)} placeholder="Regular Price" />
                        <input required type='number' min={0} className='my-input-fields w-full md:w-2/5' value={discount_price} onChange={(e) => setDiscount_price(e.target.value)} placeholder="Discount Price" />
                        <textarea className='my-input-fields w-full md:w-2/5 h-[100px] resize-none' required type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description of the product" />
                        <div className='w-full md:w-2/5 m-3'>
                            <Select
                                required
                                className='h-[100px]'
                                options={categories}
                                placeholder={category ? category[0].name : "Choose category..."}
                                labelField="name"
                                valueField="name"
                                onChange={(value) => setCategory(value)}
                            />
                        </div>
                    </div>
                    <div className='md:ml-[8%]'>
                        <p className='normal-text'>Upload Images to your Product </p>
                        <input required className='mx-5 my-2' type="file" accept="image/*" id="images" name="images" multiple onChange={handleImageChange} />
                    </div>
                    <div className=' flex justify-center items-center flex-wrap'>
                        <input type="text" className='my-input-fields w-full md:w-2/5' value={currentSize} onChange={(e) => setCurrentSize(e.target.value)} placeholder="Size" />
                        <input type="number" className='my-input-fields w-full md:w-2/5' value={currentAvailableQuantity} onChange={(e) => setCurrentAvailableQuantity(e.target.value)} placeholder={currentSize ? `Available Quantity of ${currentSize}` : "Available Quantity"} />
                    </div>
                    {sizeError && <div className='flex justify-center items-center'>
                        <p className='w-full md:w-1/2 error-text text-center'>{sizeError}</p>
                    </div>}
                    <div className='flex justify-center items-center'>
                        <button type='button' onClick={addSize} className='my-btns w-[200px]'>Add Size</button>
                    </div>
                    {sizes.length > 0 &&
                        <div className='flex justify-center items-center'>
                            <div className='flex flex-wrap justify-center items-center w-[82%] border border-gray-500 p-5 m-4 rounded-md'>
                                {sizes.map((size) => (
                                    <div key={size.id}>
                                        <div className='flex justify-between items-center border border-gray-500 px-5 py-2 m-3 bg-gray-300 rounded-md'>
                                            <p className='normal-text'>{size.size} - {size.available_quantity}</p>
                                            <button type='button' onClick={() => removeSize(size.size)} className='my-btns-2 bg-gray-400'>X</button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>}

                    <div className='flex justify-center items-center m-4'>
                        <button type='submit' className='my-big-btns w-[200px]'>Add Product</button>
                    </div>
                </form>
            </div>}

            {productAdded && addedProductSlug && <div className='flex justify-center flex-col items-center m-5'>
                <p className='success-text text-xl p-5 font-bold m-5'>Product Added Succssfully!</p>
                <Link to={{ pathname: `/product/${addedProductSlug}` }} ><button className='my-btns m-5'>Visit this product</button></Link>
            </div>}

        </div>
    )
}
