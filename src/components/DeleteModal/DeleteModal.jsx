import { Model } from "../common/Model/Model";
import { MdDeleteOutline } from "react-icons/md";
import './styles.scss';


export const DeleteModal = ({ isOpen, closeModel, deleteBlogPost }) => {
    const handleDelete = () => {
        deleteBlogPost();
    };

    return (
        <Model isOpen={isOpen} closeModel={closeModel} type="pop-up">
            <div className="w-full flex flex-col gap-8">
                {/* <MdDeleteOutline size={50} className="text-red-400 pulse-animation" /> */}
                <div className="w-full flex flex-col gap-2">
                    <h2 className="font-Golos font-bold text-base text-start leading-5 text-black-500">Delete confirmation</h2>
                    <p className="font-Golos font-medium text-xs text-center leading-5 text-black-500">Are you sure you want to delete this content?</p>
                </div>

                <div className="w-full flex flex-row gap-4">
                    <button
                        onClick={() => closeModel()}
                        className="w-full h-10 rounded border border-black-50 text-black-100 capitalize font-Golos text-sm font-normal"
                    >
                        cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full h-10 rounded bg-red-400 hover:bg-red-500 active:bg-red-400 text-black-0 capitalize font-Golos text-sm font-normal"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Model>
    );
};
