import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { IoIosClose } from "react-icons/io";


export const Model = (props) => {
    const {
        children,
        isOpen = false,
        closeModel = null,
        type = 'right-side'
    } = props;
    const dialogRef = useRef(null);


    switch (type) {
        case 'right-side':
            return (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        initialFocus={dialogRef}
                        ref={dialogRef}
                        className="relative z-10"
                        onClose={() => closeModel()}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto bg-black-50 bg-opacity-60">
                            <div className="flex min-h-full justify-center text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-300"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-200"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel
                                        id="hide_scrollbar"
                                        className={`md:max-w-[500px] w-[86%] h-screen overflow-scroll flex relative flex-col text-left shrink-0 gap-6 bg-white px-6 pb-4 pt-7 ml-auto`}
                                    >
                                        <>
                                            <div onClick={() => closeModel()} className="fixed top-2 right-2 p-1 cursor-pointer">
                                                <IoIosClose size={'25px'} className="text-black-75" />
                                            </div>
                                            {children}
                                        </>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )
        case 'pop-up':
            return (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        initialFocus={dialogRef}
                        ref={dialogRef}
                        className="relative z-10"
                        onClose={() => closeModel()}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>


                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center bg-black-50 bg-opacity-50">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className={`w-fit max-w-[350px] h-auto flex relative flex-col text-left shrink-0 gap-6 rounded bg-black-0 px-8 p-6 shadow-header`}>

                                        {children}

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )
        case 'pop-up-full':
            return (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        initialFocus={dialogRef}
                        ref={dialogRef}
                        className="relative z-10"
                        onClose={() => null}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>


                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex h-screen py-4 px-6 items-center justify-center text-center bg-black-50 bg-opacity-50">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className={`w-full max-w-[800px] h-content overflow-scroll flex relative flex-col text-left shrink-0 gap-6 rounded bg-black-0 px-8 p-6 shadow-header`}>
                                        {children}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )
        case 'blank-loading':
            return (
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        initialFocus={dialogRef}
                        ref={dialogRef}
                        className="relative z-10"
                        onClose={() => null}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center bg-black-700 bg-opacity-80">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className={`w-fit h-screen flex relative flex-row justify-center items-center text-left shrink-0 gap-6 rounded`}>
                                        {children}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            );
        default:
            break;
    }

}
