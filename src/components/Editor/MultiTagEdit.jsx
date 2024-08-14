import { useState, useRef, useEffect } from "react";
import { TypeOfPost } from "../../components/Helper/CreatePostData";
import { Button } from "../common/Button/Button";
import { Transition } from "@headlessui/react";


export const MultiTagEdit = ({ postType = [], setPostType, profileBar }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addType, setAddType] = useState('');
    const inputRef = useRef(null);

    const managePostType = (type) => {

        if (profileBar) {
            if (postType.includes(type)) {
                setPostType(postType.filter(e => e !== type));
            } else {
                setPostType([...postType, type.toLowerCase()]);
            }
        } else {
            if (postType.includes(type)) {
                setPostType(postType.filter(e => e !== type));
            } else {
                setPostType([...postType, type.toLowerCase()]);
                if (!TypeOfPost.includes(type)) {
                    TypeOfPost.push(type.toLowerCase());
                }
            }
        }
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (addType) {
                managePostType(addType);
                setIsOpen(false);
                setAddType('');
            }
        }
    };

    const ButtonActiveState = (item) => {
        if (postType.includes(item)) {
            switch (item) {
                case 'bugs':
                    return 'bg-black-700 hover:bg-black-900 active:bg-black-500 text-white border-[1.5px] border-orange-200';
                case 'error':
                    return 'bg-black-700 hover:bg-black-900 active:bg-black-500 text-white border-[1.5px] border-red-300';
                default:
                    return 'bg-black-700 hover:bg-black-900 active:bg-black-500 text-white';
            }
        } else {
            return 'text-black-500 bg-black-50 hover:bg-black-200 active:bg-black-25';
        }
    }

    const profileBarHandler = () => {
        return profileBar ? postType : TypeOfPost
    }

    return (
        <div id="hide_scrollbar" className={`flex ${profileBar ? 'flex-wrap' : 'flex-row rounded-3xl'} items-center gap-2 overflow-scroll py-1`}>
            <>
                {profileBarHandler()?.map((item, ind) => (
                    <Button
                        key={ind}
                        onClick={() => managePostType(item)}
                        type={profileBar ? 'skill-edit' : null}

                        className={`w-fit ${profileBar ? 'px-4 text-xs' : 'px-3 text-sm'} py-[6px] flex flex-row justify-center items-center gap-2 rounded-full font-Golos whitespace-nowrap capitalize ${ButtonActiveState(item)}`}
                    >
                        {item}
                    </Button>
                ))}
            </>

            {isOpen ?
                <Transition show={isOpen}>
                    <input
                        type="text"
                        ref={inputRef}
                        value={addType}
                        onChange={(e) => setAddType(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type..."
                        className="w-full min-w-28 max-w-20 px-3 py-[6px] font-Golos text-xs rounded-full transition duration-300 ease-in data-[closed]:opacity-0 text-black-500 bg-black-50 hover:bg-black-200 active:bg-black-25"
                    />
                </Transition>
                :
                <Button onClick={() => setIsOpen(true)} className={`w-fit px-4 py-[6px] font-Golos text-sm rounded-full text-black-500 bg-black-50 hover:bg-black-200 active:bg-black-25`}>
                    +
                </Button>
            }
        </div>
    )
};
