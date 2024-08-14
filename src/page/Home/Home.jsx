import { useState } from "react"
import { Feeds } from "../../components/Feeds/Feeds"
import { SideBar } from "../../components/SideBar/SideBar"
import { Layout } from "../../components/layout/Layout"
import { BsFilterLeft } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { SelectListbox } from "../../components/common/SelectListbox/SelectListbox.jsx";
import { HomeSearchCategory, HomeSelectCategoryOne } from "../../assets/static/index.js";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const [selectedCatagery, setSelectedCatagery] = useState('popular');
    const navigate = useNavigate();

    return (
        <Layout homePage>
            <div className="w-full px-4 sm:px-10 md:px-12 md:py-10 py-4 flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
                <SelectListbox
                    option={HomeSelectCategoryOne}
                    selectedCatagery={selectedCatagery}
                    setSelectedCatagery={setSelectedCatagery}
                >
                    <div className="w-[110px] hidden md:flex flex-row gap-1 items-center justify-center rounded-12 px-4 py-1 border border-black-200">
                        <p className="font-Golos text-sm font-normal capitalize text-black-700">{selectedCatagery || ''}</p>
                        <RiArrowDownSLine size={18} className="text-black-700" />
                    </div>
                </SelectListbox>

                <div id="hide_scrollbar" className="w-full md:max-w-[60%] flex flex-row gap-4 items-center justify-start lg:justify-center overflow-x-scroll">
                    {HomeSearchCategory && HomeSearchCategory?.map((item, index) => (
                        <button
                            onClick={() => navigate(`search?q=${item}`)}
                            className={`w-fit py-1 px-3 rounded-51 flex fex-row items-center justify-center font-Golos text-xs font-normal capitalize text-black-700 ${item === 'discover' && "bg-black-25"}`}
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <SelectListbox
                    option={HomeSelectCategoryOne}
                    selectedCatagery={selectedCatagery}
                    setSelectedCatagery={setSelectedCatagery}
                >
                    <div className="min-w-[80px] w-fit hidden md:flex flex-row gap-1 items-center justify-center rounded-12 px-4 py-1 border border-black-200">
                        <p className="font-Golos text-sm font-normal capitalize text-black-700">all</p>
                        <BsFilterLeft size={18} className="text-black-700" />
                    </div>
                </SelectListbox>
            </div>


            {/* content */}
            <div className="w-full h-screen m-auto px-4 sm:px-10 md:px-12 pt-2 md:pt-8 flex flex-row gap-10 justify-between">
                <div className="w-full h-full">
                    <Feeds />
                </div>

                <div className="hidden lg:block w-[1px] h-full border border-black-25"></div>

                <div className="hidden lg:block w-[400px] h-full">
                    <SideBar />
                </div>
            </div>
        </Layout>
    )
}