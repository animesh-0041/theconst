import { CiSearch } from "react-icons/ci";
import { BiMenuAltRight } from "react-icons/bi";
import { FriendProfile } from "./FriendProfile";
import { PageNavigation } from "../../../components/common/PageNavigation/PageNavigation";


export const MessageSidebar = ({ isActive, setIsActive, firendList }) => {


    return (
        <div className="w-full h-full pt-2 px-2 flex flex-col gap-2 bg-white">
            <div className="w-full h-11 relative rounded-12 overflow-hidden bg-white">
                {/* <CiSearch
                    className="absolute top-[10px] left-2 text-black-75"
                    size={'20px'}
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-full p-2 pl-10 pr-8 border-none outline-none font-Golos text-xs text-black-700 bg-white"
                /> */}
                <PageNavigation url={'/'}>
                    <h1 className="text-lg leading-8 font-Golos font-bold text-black-700">Const</h1>
                </PageNavigation>

                <BiMenuAltRight
                    className="absolute top-[10px] right-2 text-black-75"
                    size={'20px'}
                />
            </div>

            <div id="hide_scrollbar" className="w-full h-full flex flex-col rounded gap-0 overflow-y-scroll">
                {firendList && firendList?.map((user, ind) => (
                    <FriendProfile
                        key={ind}
                        name={user.name}
                        active={ind}
                        lastmessage={'Hi...'}
                        image={user?.photoURL}
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                ))}
            </div>
        </div>
    )
}