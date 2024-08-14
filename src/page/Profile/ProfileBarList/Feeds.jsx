import { useQuery } from "@tanstack/react-query";
import { GetPostData } from "../../../service/quiries/UserAuth";
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FormatDate } from '../../../components/common/FormatDate/FormatDate.jsx'
import { useNavigate } from "react-router-dom";
import { ellipsisType } from "../../../components/Helper/Tools.jsx";
import { FeedContent } from "../../../components/Feeds/FeedContent.jsx";
import { Breaker } from "../../../components/common/Breaker/Breaker.jsx";

export const Feeds = ({ profileData, userData, queryType }) => {
    const navigation = useNavigate();


    const formatString = (str) => {
        if (typeof str !== 'string' || !str) {
            return 'author';
        }
        return str.toLowerCase().trim().replace(/\s+/g, '-');
    };


    return (
        <div className="w-full flex flex-col gap-10 px-4 md:p-0">
            {profileData && profileData?.map((el, index) => (
                <div
                    key={index}
                    onClick={() => navigation(`/${formatString(userData?.username) || 'author'}/${el?.url}`)}
                    className="flex flex-wrap gap-8"
                >
                    <FeedContent
                        icon={userData?.photoURL}
                        name={userData?.name || 'UNKNOWN'}
                        username={userData?.username || 'author'}
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
    )
}