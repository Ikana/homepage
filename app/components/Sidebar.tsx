'use client'

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, BookOpenIcon } from "@heroicons/react/24/outline";

type LayoutProps = {
  title: string;
  taskDetails: string;
  technologies: string;
  closingThoughts: string;
};

export default function Layout({
  title,
  taskDetails,
  technologies,
  closingThoughts,
}: LayoutProps) {
  const [open, setOpen] = useState(true);
  const [showOpenButton, setShowOpenButton] = useState(false);

  return (
    <>
      {showOpenButton && (
        <button
          type="button"
          className="absolute top-0 right-0 m-2 bg-black text-white rounded-full h-8 w-8 flex items-center justify-center"
          onClick={() => {
            setOpen(true);
            setShowOpenButton(false);
          }}
        >
          <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => {
                            setOpen(false);
                            setShowOpenButton(true);
                          }}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-cosmic-latte dark:bg-charcoal py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-2xl  text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* some lorem ipsu */}
                        <h3 className="text-1xl font-semibold">Task</h3>
                        <p>
                          {taskDetails}
                        </p>
                        <h3 className="text-1xl font-semibold">Technolgies</h3>
                        <p>
                          {technologies}
                        </p>
                        <h3 className="text-1xl font-semibold">Closing toughts</h3>
                        <p>
                          {closingThoughts}
                        </p>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
