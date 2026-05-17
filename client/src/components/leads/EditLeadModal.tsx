import { useForm, } from "react-hook-form";

import API from "../../api/axios";
import toast from "react-hot-toast";

import type { Lead } from "../../types/lead";

import {
  X,
  Pencil,
  User,
  Mail,
  Flag,
  Globe,
  Save,
  LoaderCircle
} from "lucide-react";
import { useState } from "react";

type Props = {
  lead: Lead;

  onClose: () => void;

  fetchData: () => void;
};

const EditLeadModal = ({lead, onClose, fetchData }: Props) => {

  const { register, handleSubmit, } = useForm({
    defaultValues: {
      name: lead.name,

      email: lead.email,

      status: lead.status,

      source: lead.source,
    },
  });
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await API.put(`/leads/${lead._id}`, data);
      toast.success("Lead updated");
      fetchData();
      setLoading(false)
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false)
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[32px] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
              <Pencil size={22} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Edit Lead
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                Update customer lead information
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:scale-105 transition-all duration-200 flex items-center justify-center">
            <X size={20} />
          </button>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Full Name
            </label>

            <div className="relative">

              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"/>
              <input
                type="text"
                {...register("name")}
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />

            </div>

          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="email"
                {...register("email")}
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />

            </div>

          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Lead Status
            </label>

            <div className="relative">
              <Flag
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <select
                {...register("status")}

                className="w-full appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 outline-none">
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

          <div>
            <label className="text-sm font-medium mb-2 block">
              Lead Source
            </label>

            <div className="relative">

              <Globe
                size={18}

                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <select {...register("source")}

                className="w-full appearance-none bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 outline-none"
              >

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

          <div
            className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              Cancel
            </button>

            <button disabled={loading} className={`flex items-center gap-2 px-6 py-3 rounded-2xl bg-black dark:bg-white dark:text-black text-white font-medium hover:scale-[1.02] transition-all duration-200 ${loading && "cursor-no-drop"}`}>
              {loading ? 
                (
                  <span className="w-full flex items-center justify-center gap-3 text-zinc-400"><LoaderCircle className="animate-spin transition-all duration-500" /><p>please wait...</p></span>
                )
                : (
                  <div className="flex gap-2 items-center"><Save size={18} />
                  Update Lead</div>
                )}
              
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;