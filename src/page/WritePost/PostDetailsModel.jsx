import { useEffect, useRef, useState } from "react"
import { Model } from "../../components/common/Model/Model"
import { Transition } from "@headlessui/react"
import { Button } from "../../components/common/Button/Button";
import { BlogUser } from "../../components/Helper/Helper";

const Bugs = ['react', 'html', 'css', 'javascript', 'node', 'mongodb', 'express', 'nextjs', 'tailwind', 'bootstrap']

export const PostDetailsModel = ({ isOpen, closeModel, specificTag, setSpecificTag }) => {
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [addType, setAddType] = useState('');

    const inputRef = useRef(null);
    const managePostType = (type) => {
        if (specificTag.includes(type)) {
            setSpecificTag(specificTag.filter(e => e !== type));
        } else {
            setSpecificTag([...specificTag, type.toLowerCase()]);
            if (!Bugs.includes(type)) {
                Bugs.push(type.toLowerCase());
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (addType) {
                managePostType(addType);
                setIsInputOpen(false);
                setAddType('');
            }
        }
    };

    useEffect(() => {
        if (isInputOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isInputOpen])

    const ButtonActiveState = (item) => {
        if (specificTag.includes(item)) {
            return 'bg-black-900 hover:bg-black-700 active:bg-black-500 text-white';
        } else {
            return 'text-black-500 bg-black-50 hover:bg-black-200 active:bg-black-25';
        }
    }

    return (
        <Model isOpen={isOpen} closeModel={closeModel} type="right-side">
            <div id="hide_scrollbar" className="w-full h-full flex flex-col justify-between">
                <div className="w-full h-full flex flex-col gap-4">
                    <h1 className="font-Golos font-bold text-base text-black-700">Choose the specific tags for your bugs</h1>

                    <div className="flex flex-wrap items-center gap-2 gap-y-3">
                        {Bugs && Bugs.map((item, ind) => (
                            <Button
                                key={ind}
                                onClick={() => managePostType(item)}
                                className={`w-fit px-4 py-[5px] font-Golos text-xs rounded-full whitespace-nowrap capitalize ${ButtonActiveState(item)}`}
                            >
                                {item}
                            </Button>

                        ))}

                        {isInputOpen ?
                            <Transition show={isInputOpen}>
                                <input
                                    type="text"
                                    ref={inputRef}
                                    value={addType}
                                    onChange={(e) => setAddType(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type..."
                                    className="w-full min-w-28 max-w-20 px-3 py-[5px] font-Golos text-xs rounded-full transition duration-300 ease-in data-[closed]:opacity-0 text-black-500 bg-black-50 hover:bg-black-200 active:bg-black-25"
                                />
                            </Transition>
                            :
                            <Button onClick={() => setIsInputOpen(true)} className={`w-fit px-4 py-[5px] font-Golos text-xs rounded-full text-black-500 bg-black-50 hover:bg-black-200 active:bg-black-25`}>
                                +
                            </Button>
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <h2 className="font-Golos font-bold text-xs text-black-700 capitalize">Hi, {BlogUser().name || 'Author'}</h2>
                    <p className="font-Golos text-[10px] text-black-500">
                        "Select the most relevant tags to ensure we connect you with the best contributors and resources. Your choice makes a difference!"
                    </p>

                </div>
            </div>


        </Model>
    )
}