const Modal = ({ children, toggleModalHandler }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 mx-5">
        <div className="bg-black opacity-70 shadow-lg rounded-lg">
          <div className="text-xl font-semibold">
            <div className="flex justify-between items-center gap-3 flex-wrap border-b px-10 py-5">
              <p>Add Video</p>
              <p onClick={toggleModalHandler} className="cursor-pointer">
                ✕
              </p>
            </div>
          </div>
          <div>
            <div className="px-10 py-10 w-full sm:w-96">{children}</div>
          </div>
        </div>
      </div>
      <p
        className="fixed inset-0 bg-gray-700 opacity-50 z-20"
        onClick={toggleModalHandler}
      ></p>
    </div>
  );
};

export default Modal;
