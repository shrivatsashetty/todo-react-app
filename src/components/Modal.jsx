/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */

import { createPortal } from "react-dom";

function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return createPortal(
        (<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4">
                    Please Enter Todo Content!!
                </h3>

                <button
                    onClick={onClose}
                    className="bg-amber-700 text-white rounded-full px-4 py-2 cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>),
        document.body
    );
}

export default Modal;
