import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="bg-[#1e1e1e] h-[20rem] p-5 m-3 rounded-2xl">
      <h2 className="text-white font-bold lg:text-4xl md:text-3xl text-2xl text-center pt-3 pb-6">
        What are you looking for?
      </h2>
      <div className="relative m-auto flex items-center justify-center max-w-3xl">
        <input placeholder="Search PPTs by name or URL" className="bg-white w-full font-medium text-gray-800 rounded-xl px-4 md:py-2.5 py-2" type="search" />
        <Search size={21} className="text-gray-500 inline-block absolute right-3" />
      </div>

      {/* <div className="mt-10">
        <h1 className="text-white text-2xl font-bold mt-5">Trending PPTs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          <div className="bg-white rounded-xl p-5">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <h2 className="text-gray-800 font-bold mt-3">PPT Name</h2>
            <p className="text-gray-500 mt-1">By Author</p>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <h2 className="text-gray-800 font-bold mt-3">PPT Name</h2>
            <p className="text-gray-500 mt-1">By Author</p>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <h2 className="text-gray-800 font-bold mt-3">PPT Name</h2>
            <p className="text-gray-500 mt-1">By Author</p>
          </div>
          <div className="bg-white rounded-xl p-5">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <h2 className="text-gray-800 font-bold mt-3">PPT Name</h2>
            <p className="text-gray-500 mt-1">By Author</p>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default SearchBar