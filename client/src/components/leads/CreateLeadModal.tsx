import {
  useForm,
} from "react-hook-form";

import API from "../../api/axios";

import toast from "react-hot-toast";

import {
  useEffect,
  useState,
} from "react";

import {
  X,
  User,
  Mail,
  Flag,
  Globe,
  UserCheck,
  Plus,
} from "lucide-react";

type FormData = {
  name: string;

  email: string;

  status: string;

  source: string;

  assignedTo?: string;
};

type Props = {
  onClose: () => void;

  fetchData: () => void;
};

const CreateLeadModal = ({
  onClose,
  fetchData,
}: Props) => {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const [users, setUsers] =
    useState([]);

  const onSubmit = async (
    data: FormData
  ) => {

    try {

      await API.post(
        "/leads",
        data
      );

      toast.success(
        "Lead created"
      );

      reset();

      fetchData();

      onClose();

    } catch (error) {

      toast.error(
        "Failed to create lead"
      );
    }
  };

  useEffect(() => {

    const fetchUsers =
      async () => {

        const res =
          await API.get(
            "/leads/users"
          );

        setUsers(
          res.data.data
        );
      };

    fetchUsers();

  }, []);

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
          w-full max-w-lg
          bg-white dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          rounded-[32px]
          shadow-2xl
          overflow-hidden
        "
      >

        {/* TOP */}
        <div
          className="
            flex items-center justify-between
            px-8 py-6
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
              <Plus size={24} />
            </div>

            <div>

              <h2 className="text-2xl font-bold dark:text-zinc-200">
                Create Lead
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                Add a new customer lead
              </p>

            </div>

          </div>

          <button
            onClick={onClose}

            className="
              w-11 h-11 dark:text-zinc-200
              rounded-2xl 
              bg-zinc-100 dark:bg-zinc-700
              hover:scale-105
              transition-all duration-200
              flex items-center justify-center
            "
          >
            <X size={20} />
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }

          className="p-8 space-y-5 dark:text-zinc-200"
        >

          {/* NAME */}
          <div>

            <label className="text-sm font-medium mb-2 block ">
              Full Name
            </label>

            <div className="relative">

              <User
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <input
                type="text"

                placeholder="Rahul Sharma"

                {...register(
                  "name"
                )}

                className="
                  w-full
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3.5
                  outline-none
                  focus:ring-2 focus:ring-black dark:focus:ring-white
                "
              />

            </div>

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-sm font-medium mb-2 block">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <input
                type="email"

                placeholder="rahul@gmail.com"

                {...register(
                  "email"
                )}

                className="
                  w-full
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3.5
                  outline-none
                  focus:ring-2 focus:ring-black dark:focus:ring-white
                "
              />

            </div>

          </div>

          {/* STATUS */}
          <div>

            <label className="text-sm font-medium mb-2 block">
              Lead Status
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
                {...register(
                  "status"
                )}

                className="
                  w-full
                  appearance-none
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3.5
                  outline-none
                "
              >

                <option value="">
                  Select Status
                </option>

                <option value="New">
                  New
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Qualified">
                  Qualified
                </option>

                <option value="Lost">
                  Lost
                </option>

              </select>

            </div>

          </div>

          {/* SOURCE */}
          <div>

            <label className="text-sm font-medium mb-2 block">
              Lead Source
            </label>

            <div className="relative">

              <Globe
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <select
                {...register(
                  "source"
                )}

                className="
                  w-full
                  appearance-none
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3.5
                  outline-none
                "
              >

                <option value="">
                  Select Source
                </option>

                <option value="Website">
                  Website
                </option>

                <option value="Instagram">
                  Instagram
                </option>

                <option value="Referral">
                  Referral
                </option>

              </select>

            </div>

          </div>

          {/* ASSIGN USER */}
          <div>

            <label className="text-sm font-medium mb-2 block">
              Assign User
            </label>

            <div className="relative">

              <UserCheck
                size={18}

                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-400
                "
              />

              <select
                {...register(
                  "assignedTo"
                )}

                className="
                  w-full
                  appearance-none
                  bg-zinc-100 dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3.5
                  outline-none
                "
              >

                <option value="">
                  Assign User
                </option>

                {users.map(
                  (user: any) => (

                    <option
                      key={user._id}

                      value={
                        user._id
                      }
                    >
                      {user.name}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex items-center justify-end
              gap-3
              pt-4
            "
          >

            <button
              type="button"

              onClick={onClose}

              className="
                px-5 py-3
                rounded-2xl
                bg-zinc-100 dark:bg-zinc-900
                hover:bg-zinc-200 dark:hover:bg-zinc-800
                transition-all duration-200
              "
            >
              Cancel
            </button>

            <button
              className="
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
              Create Lead
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateLeadModal;