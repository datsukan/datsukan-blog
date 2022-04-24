import { Fragment, useRef, Dispatch, SetStateAction } from "react"
import { Dialog, Transition } from "@headlessui/react"

export type Image = {
  src: string
  alt: string
  title?: string
}

export type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  image: Image
}

export const ImageModal = ({ open, setOpen, image }: Props) => {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 cursor-zoom-out overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div
          className="block min-h-screen px-4 text-center"
          ref={cancelButtonRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="transition-opacity fixed inset-0 bg-gray-700 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
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
              className="transition-all inline-block max-h-screen max-w-7xl transform align-middle shadow-xl"
              onClick={() => setOpen(false)}
            >
              <img {...image} className="max-h-screen max-w-full" />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
