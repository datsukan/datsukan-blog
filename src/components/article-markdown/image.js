import { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

export const ImageModal = ({ open, setOpen, image }) => {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed overflow-y-auto z-10 inset-0 cursor-zoom-out"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="block min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
          >
            <div
              className="inline-block shadow-xl transform transition-all align-middle max-w-7xl max-h-screen"
              onClick={() => setOpen(false)}
            >
              <img {...image} className="max-w-full max-h-screen" />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
