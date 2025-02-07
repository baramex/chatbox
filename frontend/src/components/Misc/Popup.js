import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';

// BUG: tailwindcss not charge button style

export default function Popup({ Icon, title: _title, show, message: _message, buttons, iconColor, bgColor, onClose }) {
    const [title, setTitle] = useState(_title);
    const [message, setMessage] = useState(_message);
    if (_message && (!message || message !== _message)) setMessage(_message);
    if (_title && (!title || title !== _title)) setTitle(_title);

    return (<Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="bg-neutral-800/50 fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-sm sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${bgColor || "bg-red-100"} sm:mx-0 sm:h-10 sm:w-10`}>
                                        <Icon className={"h-6 w-6 " + (iconColor || "stroke-red-600")} aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {
                                    buttons.map((button, index) =>
                                        <button key={index} onClick={() => { (button.onClick || onClose)(); }} className={`transition-colors mt-3 inline-flex w-full justify-center rounded-md border ${button.borderColor || "border-gray-300"} ${button.bgColor || "bg-white"} px-4 py-2 text-base font-medium ${button.textColor || "text-gray-700"} shadow-sm ${button.bgHover || "bg-gray-50"} focus:outline-none focus:ring-2 ${button.ringColor || "ring-gray-400"} focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm sm:mt-0`}>
                                            {button.name}
                                        </button>
                                    )
                                }
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>);
}