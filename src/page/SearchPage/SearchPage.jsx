import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { TypeOfSearch } from "../../components/Helper/CreatePostData";
import { Layout } from "../../components/layout/Layout";
import { RiSearchLine } from "react-icons/ri";
import { getSearch } from "../../service/quiries/UserAuth";
import { useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";
import { SearchTypeContent } from "./SearchTypeContent";

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [SearchType, setSearchType] = useState('stories');
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [actualSearch, setActualSearch] = useState(searchParams.get('q') || '');
    const location = useLocation();

    const {
        isLoading: searchLoading,
        data: searchData,
        refetch: refetchSearch,
    } = useQuery({
        queryKey: ["getsearchdata", SearchType, actualSearch],
        queryFn: () => getSearch(`q=${actualSearch.trim() || actualSearch}&type=${SearchType}`),
        enabled: !!actualSearch,
    });

    const handleSearch = () => {
        if (search.trim()) {
            setActualSearch(search);
        }
    };

    const handleSearchKey = (e) => {
        if (e.key === 'Enter' && search.trim()) {
            setActualSearch(search);
        }
    }


    useEffect(() => {
        if (searchParams.get('q')) {
            setSearch(searchParams.get('q'));
            setActualSearch(searchParams.get('q'));
        } else {
            setSearch('');
            setActualSearch('');
        }
    }, [searchParams, location]);

    useEffect(() => {
        if (actualSearch.trim()) {
            setSearchParams({ q: actualSearch });
            refetchSearch();
        }
    }, [actualSearch, refetchSearch]);


    return (
        <Layout>
            <div className="w-full flex flex-col pt-8 px-4 md:px-14 justify-center items-center gap-8">

                <div className="w-full md:w-[80%] max-w-[350px] md:max-w-[500px] relative flex flex-row justify-between bg-opacity-0 rounded-51">
                    <input
                        type="text"
                        value={search}
                        placeholder="Search here"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearchKey}
                        className="w-full md:h-14 h-10 rounded-51 pl-4 md:pl-6 pr-12 py-1 font-Golos text-sm leading-5 text-black-500 border transform transition duration-300 bg-black-25 border-black-50 focus:border-black-300"
                    />
                    <button onClick={handleSearch} className="flex flex-row justify-center items-center absolute p-[7px] top-1 right-1 md:right-2 md:top-2 rounded-full bg-black-700 hover:bg-black-900 active:bg-black-700">
                        <RiSearchLine className="text-black-25 size-4 md:size-6" />
                    </button>
                </div>

                {searchLoading && <p className='flex flex-row justify-center items-center p-2'>
                    <FaSpinner size={20} className="animate-spin" />
                </p>}


                {searchData &&
                    <div className="w-full mt-1 md:pt-6 flex flex-col gap-6 px-4 md:p-0">
                        <h2 className="font-Golos font-semibold text-center text-base md:text-lg leading-5 text-black-700">{!searchData?.data?.length ? 'No matching for' : 'Matching'} "{actualSearch}"</h2>

                        <div className="w-full flex flex-row gap-4">
                            {TypeOfSearch && TypeOfSearch.map((item, ind) => (
                                <button
                                    key={ind}
                                    onClick={() => setSearchType(item)}
                                    className={`w-fit px-5 py-[6px] font-Golos text-xs md:text-sm font-normal whitespace-nowrap capitalize ${SearchType !== item ? 'text-black-700 border-0' : 'text-black-900 border-b border-black-500'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <SearchTypeContent
                            searchData={searchData}
                            SearchType={SearchType}
                            queryType={["getsearchdata", actualSearch, SearchType]}
                        />

                    </div>
                }

            </div>
        </Layout>
    );
};
