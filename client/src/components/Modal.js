import React from "react";

function Modal({ title, content, isOpen, onClick, onClose, alert }) {
  return (
    isOpen && (
      <div className="modal fixed inset-0 flex bg-black bg-opacity-30 backdrop-blur-sm items-center justify-center z-50">
        <div className="bg-white p-2 rounded shadow-lg w-80">
          <div className="modal-content p-2 ">
            <div className="font-bold text-xl mb-5 flex justify-center">
              {title}
            </div>
            <div className="text-lg flex justify-center">{content}</div>
          </div>
          <div className="modal-buttons flex justify-center  mt-5">
            <button
              className="px-4 py-1 mx-5 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={onClick}
            >
              OK
            </button>
            {alert ? (
              <>
                <button
                  className="px-4 py-1 mx-5 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
