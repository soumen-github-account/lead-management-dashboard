import { useState } from "react";

import API from "../../api/axios";

import toast from "react-hot-toast";

import {
  X,
  RefreshCcw,
  Flag,
  Save,
} from "lucide-react";

type Props = {
  leadId: string;

  currentStatus: string;

  onClose: () => void;

  fetchData: () => void;
};

const UpdateStatusModal = ({
  leadId,
  currentStatus,
  onClose,
  fetchData,
}: Props) => {

  const [status, setStatus] =
    useState(currentStatus);

  const handleUpdate =
    async () => {

      try {

        await API.put(
          `/leads/${leadId}`,
          { status }
        );

        toast.success(
          "Status updated"
        );

        fetchData();

        onClose();

      } catch (error) {

        toast.error(
          "Update failed"
        );
      }
    };

  const getStatusStyle = (
    value: string
  ) => {

    switch (value) {

      case "Qualified":
        return `
          bg-green-100 text-green-700
          dark:bg-green-500/10
          dark:text-green-400
        `;

      case "Contacted":
        return `
          bg-blue-100 text-blue-700
          dark:bg-blue-500/10
          dark:text-blue-400
        `;

      case "Lost":
        return `
          bg-red-100 text-red-700
          dark:bg-red-500/10
          dark:text-red-400
        `;

      default:
        return `
          bg-zinc-100 text-zinc-700
          dark:bg-zinc-800
          dark:text-zinc-300
        `;
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/60 backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >

      {/* MODAL */}
      <div
        className="
          relative
          w-full max-w-md
          bg-white dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          rounded-[32px]
          shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            px-7 py-6
            border-b border-zinc-200 dark:border-zinc-800
          "
        >

          <div className="flex items-center gap-4">

            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-black dark:bg-white
                text-white dark:text-black
                flex items-center justify-center
              "
            >
              <RefreshCcw size={22} />
            </div>

            <div>

              <h2 className="text-2xl font-bold dark:text-zinc-200">
                Update Status
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                Change lead progress status
              </p>

            </div>

          </div>

          <button
            onClick={onClose}

            className="
              w-11 h-11
              rounded-2xl
              bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-200
              hover:scale-105
              transition-all duration-200
              flex items-center justify-center
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* BODY */}
        <div className="p-7">

          {/* CURRENT STATUS */}
          <div className="mb-6">

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
              Current Status
            </p>

            <span
              className={`
                inline-flex items-center
                px-4 py-2
                rounded-full
                text-sm font-medium
                ${getStatusStyle(
                  currentStatus
                )}
              `}
            >
              {currentStatus}
            </span>

          </div>

          {/* SELECT */}
          <div className="mb-8 dark:text-zinc-200">

            <label className="text-sm font-medium mb-2 block">
              Select New Status
            </label>

            <div className="relative">

              <Flag
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <select
                value={status}

                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }

                className="
                  w-full
                  appearance-none
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3.5
                  outline-none
                  focus:ring-2 focus:ring-black dark:focus:ring-white
                "
              >

                <option>
                  New
                </option>

                <option>
                  Contacted
                </option>

                <option>
                  Qualified
                </option>

                <option>
                  Lost
                </option>

              </select>

            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3">

            <button
              onClick={onClose}

              className="
                px-5 py-3
                rounded-2xl
                bg-zinc-100 dark:bg-zinc-900
                hover:bg-zinc-200 dark:hover:bg-zinc-800
                transition-all duration-200 dark:text-zinc-200
              "
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}

              className="
                flex items-center gap-2
                px-6 py-3
                rounded-2xl
                bg-black dark:bg-white
                dark:text-black
                text-white
                font-medium
                hover:scale-[1.02]
                transition-all duration-200
              "
            >

              <Save size={18} />

              Update

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UpdateStatusModal;