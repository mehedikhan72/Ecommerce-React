import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Searchbox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`search?query=${query}`);
    }
    return (
        <div className="m-10">
            <form onSubmit={handleSearch} className="flex justify-center items-center">
                <input required value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="w-3/4 rounded-l-full border border-black h-12 md:h-16 py-2 px-4 focus:outline-none focus:border-indigo-600" />
                <button type="submit"><i class='rounded-r-full border flex items-center border-black h-12 md:h-16 py-2 px-4 bx bx-search-alt-2 text-2xl'></i></button>
            </form>
        </div>
    )
}