import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


export const Search = ({ search, setSearch, prime }) => {
    const navigation = useNavigate();

    return (
        <>
            <div onClick={() => prime ? navigation(`/search`) : null} className="w-full max-w-[300px] relative flex flex-row justify-between bg-black-50 bg-opacity-0 rounded-51">
                <input
                    type="text"
                    value={search}
                    placeholder="Search"
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:h-10 h-8 rounded-51 pr-3 pl-12 py-1 font-Golos text-xs font-normal text-black-500 border border-black-200 bg-opacity-95"
                />
                <div className="absolute left-2 md:top-[7px] top-[5px]">
                    <CiSearch size={'25px'} className="text-black-75" />
                </div>
            </div>
        </>
    )
}