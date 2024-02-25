import { Search, TrendingUp, LayoutGrid, HardDriveDownload, Eye, Hourglass, User } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="bg-[#1e1e1e] h-[18rem] p-5 m-3 rounded-2xl mt-20">
      <h2 className="text-white font-bold lg:text-4xl md:text-3xl text-2xl text-center pt-3 pb-6">
        What are you looking for?
      </h2>
      <div className="relative m-auto flex items-center justify-center max-w-3xl">
        <input placeholder="Search PPTs by name or URL" className="bg-white w-full font-medium text-gray-800 rounded-xl px-4 md:py-2.5 py-2" type="search" />
        <Search size={21} className="text-gray-500 inline-block absolute right-3" />
      </div>

      <div>
        <div className="flex justify-center mt-5 md:gap-4 gap-1">
          <TypeIcon type="All" type2="" icon={<LayoutGrid size={21} />} />
          <TypeIcon type="Recent" type2="" icon={<Hourglass size={21} />} />
          <TypeIcon type="Trending" type2="" icon={<TrendingUp size={21} />} />
          <TypeIcon type="Most" type2="Viewed" icon={<Eye size={21} />} />
          <TypeIcon type="Most" type2="Downloaded" icon={<HardDriveDownload size={21} />} />
          <TypeIcon type="By You" type2="" icon={<User size={21} />} />
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
      </div>


    </section>
  )
}

export default SearchBar;

const TypeIcon = ({ icon, type, type2 = "" }: { type: string, icon: JSX.Element, type2: string }) => {
  return (
    <div className="md:w-20 w-16 flex flex-col items-center">
      <div className="bg-white shadow-lg transition cursor-pointer hover:scale-105 hover:shadow-2xl rounded-full w-fit md:p-4 p-3.5">
        {icon}
      </div>
      <p className="text-white font-semibold mt-1 md:text-sm text-xs text-center">{type} {type2}</p> 
    </div>
  )
}