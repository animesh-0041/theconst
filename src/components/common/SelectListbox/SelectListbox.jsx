import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { VscCheck } from "react-icons/vsc";

export const SelectListbox = ({ children, option = [], selectedCatagery, setSelectedCatagery }) => {

    console.log(selectedCatagery);

    return (
        <Listbox value={selectedCatagery} onChange={setSelectedCatagery}>
            <ListboxButton>{children}</ListboxButton>

            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ListboxOptions anchor="bottom start" className={'w-[220px] px-2 p-2 block absolute z-[999] mt-4 border rounded-12 bg-black-0 ring-black/5 focus:outline-none shadow-md border-t-[0.1px] -right-[0px]'}>
                    {option?.map((person) => (
                        <ListboxOption
                            key={person.id}
                            value={person.name}
                            className={`w-full px-2 py-2 my-1 flex flex-row justify-between hover:bg-black-50 rounded-lg cursor-pointer ${person.name === selectedCatagery ? 'bg-black-50' : ''}`}
                        >
                            <p className='font-Golos text-sm font-normal text-black-500 capitalize'>{person.name}</p>
                            <VscCheck className={`text-black-500 size-4 ${person.name === selectedCatagery ? 'block' : 'hidden'}`} />
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Transition>
        </Listbox>
    )
}
