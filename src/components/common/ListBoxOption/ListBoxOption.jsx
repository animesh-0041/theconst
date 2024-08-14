import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { RiArrowRightSLine } from "react-icons/ri";
import { Breaker } from '../../common/Breaker/Breaker';
import Cookies from 'js-cookie';
import { Fragment } from 'react'

export const ListBoxOption = ({ children, listoptions = [] }) => {
    const navigate = useNavigate();

    const handleBoxOption = (props) => {

        switch (props?.name) {
            case 'logout': {
                Cookies.remove('blog_user');
                Cookies.remove('token');
                navigate('/login');
                break;
            }
            default:
                return navigate(props?.url);
        }
    };

    const optionCheck = (name) => {
        if (name === 'logout') {
            return { text: 'text-red-400', bg: 'data-[focus]:bg-red-100' }
        } else if (name === 'write') {
            return { text: 'text-green-200', bg: 'data-[focus]:bg-green-50' }
        } else {
            return { text: 'text-black-500', bg: 'data-[focus]:bg-black-25' }
        }
    };

    return (
        <Listbox>
            <ListboxButton>{children}</ListboxButton>
            <Transition
                as={Fragment}
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ListboxOptions
                    anchor="bottom start"
                    className="w-[220px] block px-1 py-3 absolute z-[999] mt-4 border rounded bg-black-0 ring-black/5 focus:outline-none shadow-md border-t-[0.1px] -right-[0px]"
                >
                    {listoptions && listoptions?.map((item, ind) => (
                        <ListboxOption
                            key={ind}
                            value={item}
                            onClick={() => handleBoxOption(item)}
                            className={`group ${item?.name === 'breaker' ? "py-1" : "px-4 py-4"} flex flex-row items-center justify-start gap-4 bg-white rounded-12 cursor-pointer ${optionCheck(item?.name)?.bg}`}
                        >
                            {item?.name === 'breaker' ?
                                <Breaker />
                                :
                                <>
                                    {item?.icon && item?.icon}
                                    <p className={`w-full text-sm font-Golos font-normal capitalize ${optionCheck(item?.name)?.text}`}>
                                        {item.name}
                                    </p>

                                    {(item?.name !== 'logout' && item?.name !== 'write') && <RiArrowRightSLine size={'18px'} className="text-black-75" />}
                                </>
                            }
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Transition>
        </Listbox>
    )
}