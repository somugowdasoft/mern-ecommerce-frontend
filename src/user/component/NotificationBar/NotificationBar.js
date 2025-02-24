import { useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';

const NotificationBar = () => {
    const [show, setShow] = useState(true);

    return (
        show && (
            <div className="w-full flex h-12 items-center justify-between bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              <p className="flex-1 text-center">🎉 Get free delivery on orders over $100! 🎁</p>
              <button
                onClick={() => setShow(false)}
                className="p-2 rounded-full hover:bg-indigo-500 transition duration-300"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          )
    );
};

export default NotificationBar;
