import { FaBook } from "react-icons/fa";
import { ellipsisType } from "../Helper/Tools";
import { AuthorRecommend } from "./SidebarContentList/AuthorRecommend";



const book_list = [
    { name: 'Html tutorial', profileUrl: 'https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&w=600', desc: 'Beginner lavel Html' },
    { name: 'Java', profileUrl: 'https://images.pexels.com/photos/459403/pexels-photo-459403.jpeg?auto=compress&cs=tinysrgb&w=600', desc: 'Web developer and Ui/ux desgin' },
    { name: 'React projects', profileUrl: 'https://images.pexels.com/photos/5965839/pexels-photo-5965839.jpeg?auto=compress&cs=tinysrgb&w=600', desc: 'Web developer and Ui/ux desgin' },
];


const BooksRecommend = ({ name, profileUrl, desc }) => {

    return (
        <div className="w-full flex flex-row gap-3 cursor-pointer">
            <img
                className="block w-24 h-20"
                src={profileUrl || 'https://cdn-icons-png.flaticon.com/128/847/847969.png'}
                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
            />
            <div>
                <h2 className="font-Golos text-sm font-normal text-black-500 capitalize">{name || ''}</h2>
                <p
                    style={ellipsisType({ line: 3, height: '70px', border: '1px solid red' })}
                    className="font-Golos text-[11px] font-normal text-black-300"
                >
                    {desc || ''}
                </p>
            </div>
        </div>
    )
}

export const SideBar = () => {




    return (
        <div id="hide_scrollbar" className="w-full h-full pb-10 flex flex-col gap-6 overflow-scroll">

            {/* Card Show */}
            <div className="w-full px-4 py-2 flex flex-col gap-2 rounded bg-black-25">
                <div className="w-full flex flex-row items-center gap-2">
                    <h2 className="font-Golos text-sm text-bold text-black-500">Create Blog</h2>
                    <FaBook size={15} className="text-black-75" />
                </div>
                <p className="font-Golos text-xs text-normal text-black-300">Write your stories today and publish it today</p>
                {/* <button className="w-fit px-2 py-1 rounded border border-black-500 capitalize font-Golos text-xs font-normal text-black-500">try now</button> */}

                <div className="flex flex-row justify-center gap-1">
                    <span className="text-black-700">•</span>
                    <span className="text-black-200">•</span>
                    <span className="text-black-200">•</span>
                </div>
            </div>

            {/* Recommend cards */}
            <div className="w-full flex flex-col gap-6">
                <h2 className="w-full pl-1 font-Golos text-sm text-bold text-black-500">People you might be interested</h2>
                <AuthorRecommend />
            </div>

            {/* books recommend */}
            <div className="w-full flex flex-col gap-6">
                <h2 className="w-full pl-1 font-Golos text-sm text-bold text-black-500">Books you might like</h2>

                <div className="w-full flex flex-col gap-5">
                    {book_list && book_list?.map((item, index) => (
                        <BooksRecommend
                            key={index}
                            name={item?.name}
                            profileUrl={item?.profileUrl}
                            desc={item?.desc}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}