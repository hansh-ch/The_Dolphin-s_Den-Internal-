import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutside";

export default function Modal({ onClose, children }) {
  const ref = useOutsideClick(onClose);
  return createPortal(
    <div
      className="fixed inset-0  mx-auto flex justify-center items-center bg-transparent top-0 left-0 bg-opacity-50 h-screen w-full backdrop-blur-md"
      ref={ref}
    >
      <div className="rounded-lg shadow-lg p-6 relative border border-accent-content m-4 z-50 ">
        <button
          className="absolute top-0 right-2 btn btn-outline flex items-center"
          onClick={onClose}
        >
          <span>Close</span> <span>&#x2715;</span> {/* Close button */}
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
