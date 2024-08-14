import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../components/layout/Layout"
import { SideBar } from "../../components/SideBar/SideBar"
import { getbookMarkBlog } from "../../service/quiries/UserAuth";
import { FeedContent } from "../../components/Feeds/FeedContent";
import { Breaker } from "../../components/common/Breaker/Breaker";
import { FormatString } from "../../components/common/FormatDate/FormatDate";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa6";
import { DashLayout } from "../../components/DashLayout/DashLayout";

export const Bookmark = () => {
    const navigation = useNavigate();

    const {
        // isLoading: bookmarkLoading,
        data: bookmarkData,
    } = useQuery({
        queryKey: ["getbookmark"],
        queryFn: getbookMarkBlog,
        retry: 2,
    });

    // console.log(bookmarkData, 'bookmarkData')


    return (
        <DashLayout>
            <div id="hide_scrollbar" className="w-full h-full flex flex-col gap-10 overflow-y-scroll">

                <div className="w-full flex flex-row items-center gap-4 px-4 py-4 md:py-6 bg-green-50 rounded font-Golos text-lg md:text-xl font-medium text-green-300">
                    <FaRegBookmark className="inline-block" />
                    List of all your bookmark
                </div>
                {bookmarkData && bookmarkData?.map((el, ind) => (
                    <div
                        key={ind}
                        onClick={() => navigation(`/${FormatString(el?.user[0].username) || 'author'}/${el?.url}`)}
                        className="flex flex-col gap-8"
                    >
                        <FeedContent
                            followers={"5"}
                            read={el?.view}
                            blogUrl={el?.url}
                            date={el?.createdAt}
                            queryType={["getpostdata"]}
                            icon={el?.user[0]?.photoURL}
                            name={el?.user[0]?.name || 'UNKNOWN'}
                            username={el?.user[0]?.username || 'UNKNOWN'}
                            title={el?.blogHeader?.header?.data?.text || ''}
                            desc={el?.blogHeader?.paragraph?.data?.text || ''}
                            image={el?.blogHeader?.image?.data?.url || el?.blogHeader?.image?.data?.file?.url || ''}
                            bookmark={true}
                        />
                        <Breaker />
                    </div>
                ))}
            </div>
        </DashLayout>
    )
}