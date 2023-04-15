export default function Searchbox() {
    return (
        <div className="m-10">
            <form className="flex justify-center items-center">
                <input type="text" placeholder="Search" className="w-3/4 rounded-l-full border border-black h-12 md:h-16 py-2 px-4 focus:outline-none focus:border-indigo-600" />
                <button><i class='rounded-r-full border flex items-center border-black h-12 md:h-16 py-2 px-4 bx bx-search-alt-2 text-2xl'></i></button>
            </form>
        </div>
    )
}