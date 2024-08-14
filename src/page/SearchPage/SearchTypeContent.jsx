import { Breaker } from "../../components/common/Breaker/Breaker";
import { FeedContent } from "../../components/Feeds/FeedContent";
import { FormatString } from '../../components/common/FormatDate/FormatDate.jsx';
import { useNavigate } from "react-router-dom";
import { ellipsisType, Statistic } from "../../components/Helper/Tools.jsx";
import { GoKebabHorizontal } from "react-icons/go";

export const SearchTypeContent = ({ searchData, SearchType, queryType }) => {
    const navigation = useNavigate();

    switch (SearchType) {
        case 'stories':
            return <div className="w-full flex flex-col gap-10">
                {searchData?.data?.map((el, ind) => (
                    <div
                        key={ind}
                        onClick={() => navigation(`/${FormatString(el?.userDetails[0].username) || 'author'}/${el?.url}`)}
                        className="flex flex-wrap gap-8"
                    >
                        <FeedContent
                            icon={el?.userDetails[0]?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                            name={el?.userDetails[0]?.name || 'UNKNOWN'}
                            username={el?.userDetails[0]?.username || 'UNKNOWN'}
                            title={el?.blogHeader?.header?.data?.text || ''}
                            desc={el?.blogHeader?.paragraph?.data?.text || ''}
                            image={el?.blogHeader?.image?.data?.url || el?.blogHeader?.image?.data?.file?.url || ''}
                            queryType={queryType}
                            date={el?.createdAt}
                            blogUrl={el?.url}
                            read={el?.view}
                        />
                        <Breaker />
                    </div>
                ))}
            </div>
        case 'people':
            return <div className="w-full flex flex-row gap-5 overflow-scroll pt-3 pb-10 pl-2">
                {searchData?.data?.map((user, ind) => (
                    <div
                        key={ind}
                        onClick={() => navigation(`/${user?.username}`)}
                        className="relative w-fit max-w-[330px] px-4 py-6 flex flex-col items-center gap-5 shadow-header rounded-12 cursor-pointer shadow-black-200"
                    >
                        <div className="absolute top-3 right-5 cursor-pointer">
                            <GoKebabHorizontal size={'15px'} className="text-black-75" />
                        </div>
                        <div>
                            <img
                                className="w-20 h-20 rounded-full"
                                src={user?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                            />
                        </div>

                        <div className="flex flex-col px-2 items-center justify-between gap-4">
                            <p className="font-Golos font-normal text-xs leading-5 capitalize text-black-900">{user?.name || '@unknown'}</p>
                            <div className='w-fit flex flex-row gap-8'>
                                <Statistic title={'Followers'} value={'240k'} />
                                <Statistic title={'Post'} value={'291'} />
                                <Statistic title={'Following'} value={'1.2k'} />
                            </div>
                            <div className="w-[20%] border border-black-50"></div>
                            <p
                                style={ellipsisType({ line: 3, height: '60px' })}
                                className='max-w-[400px] font-Golos font-normal text-center text-[10px] leading-4 text-black-300'
                            >
                                Passionate blogger sharing insights on travel, tech, and lifestyle. Join me on a journey of discovery, tips, and inspiration. Let's explore together!
                            </p>


                            {/* <div className="flex flex-row gap-2">
                                <button className="w-fit py-1 px-5 flex flex-row justify-center items-center gap-2 font-Golos text-xs rounded-12 whitespace-nowrap text-white bg-black-900">Pofile</button>
                                <button className="w-fit py-1 px-5 flex flex-row justify-center items-center gap-2 font-Golos text-xs rounded-12 whitespace-nowrap text-black-900 bg-white border border-black-900">Follow</button>
                            </div> */}

                        </div>
                    </div>
                ))}
            </div>

        case 'project':
            return <div className="w-full font-Golos font-normal text-sm leading-5 text-black-300">Comming soon...</div>
        default:
            return null;
    }
}