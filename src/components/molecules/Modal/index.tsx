import { MdOutlineCancel } from "react-icons/md";
import { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({
  isShown,
  header,
  hide,
  children,
  height,
  className,
}) => {
  if (!isShown) return null;
  return (
    <div
      onClick={hide}
      className="fixed top-0 left-0 right-0 bottom-0 h-screen bg-black/60 flex items-center justify-center z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-white mx-4 p-4 rounded-lg ${
          height ? height : "h-[95vh]"
        } max-h-[98vh]`}
      >
        <header className="flex justify-between items center border-b border-gray-200 py-3">
          <p className="text-2xl font-bold text-gray-800 px-3">{header}</p>

          <div
            onClick={hide}
            className="bg-black hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
          >
            <MdOutlineCancel color="white" />
          </div>
        </header>
        <div className="h-[90%]"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;