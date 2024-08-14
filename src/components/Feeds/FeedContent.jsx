import { Paragraph } from "../common/Paragraph/Paragraph"
import { ellipsisType } from '../Helper/Tools.jsx'
import { FeedFunc } from "./FeedFunc.jsx"
import { FeedProfile } from "./FeedProfile.jsx"



export const FeedContent = (props) => {
    const { title, desc, image, name, username, followers, icon, date, blogUrl, read, queryType, bookmark } = props;

    return (
        <div className="w-full flex flex-col md:flex-row gap-4 cursor-pointer">
            {image && <div className="w-full h-[250px] md:w-[300px] md:h-[170px] flex flex-row justify-center items-center rounded bg-black-25">
                <img
                    src={image}
                    loading="lazy"
                    className="w-full max-w-[350px] h-[250px] md:w-full md:h-full rounded"
                />
            </div>}


            <div className="w-full flex flex-col justify-between gap-3">
                <div className="w-full flex flex-col gap-3">
                    <FeedProfile
                        name={name}
                        icon={icon}
                        date={date}
                        blogUrl={blogUrl}
                        username={username}
                        queryType={queryType}
                        followers={followers}
                        bookmark={bookmark}
                    />
                    <p className="font-Golos text-base md:text-xl tracking-tighter leading-5 font-semibold opacity-85 text-black-700">{title}</p>
                    <div
                        style={ellipsisType({ line: 3, height: '60px' })}
                        className='font-Golos text-[10px] md:text-xs tracking-wide leading-5 font-normal text-[#666]'
                        dangerouslySetInnerHTML={{ __html: desc }}
                    />
                </div>

                <div>
                    <FeedFunc
                        read={read}
                        blogUrl={blogUrl}
                        bookmarked={bookmark}
                    />
                </div>
            </div>
        </div>
    )
}