
import { useSelector } from "react-redux";
import type { Lead } from "../../types/lead";

import {
  Pencil,
  Trash2,
  RefreshCcw,
  Mail,
  User,
} from "lucide-react";

type Props = {
  leads: Lead[];
  onEdit?: (lead: Lead) => void;
  onDelete?: (id: string) => void;
  onStatusUpdate?: (lead: Lead) => void;
};

const LeadTable = ({ leads, onEdit, onDelete, onStatusUpdate }: Props) => {
  const user = useSelector((state: any) => state.auth.user);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Qualified":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
      case "Contacted":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      case "Lost":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px]">

        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="px-4 md:px-6 py-4 text-left">Customer</th>
            <th className="px-4 md:px-6 py-4 text-left">Email</th>
            <th className="px-4 md:px-6 py-4 text-left">Status</th>
            <th className="px-4 md:px-6 py-4 text-left">Source</th>
            <th className="px-4 md:px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b hover:bg-zinc-50 dark:hover:bg-zinc-900">

              <td className="px-4 md:px-6 py-4">
                <div className="flex items-center gap-3">
                  <User size={18} />
                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-xs text-zinc-500">Lead</p>
                  </div>
                </div>
              </td>

              <td className="px-4 md:px-6 py-4">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-sm">{lead.email}</span>
                </div>
              </td>

              <td className="px-4 md:px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(lead.status)}`}>
                  {lead.status}
                </span>
              </td>

              <td className="px-4 md:px-6 py-4 text-sm">
                {lead.source}
              </td>

              <td className="px-4 md:px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-2">

                  {user?.role === "admin" && (
                    <>
                      <button
                        onClick={() => onEdit?.(lead)}
                        className="flex items-center gap-1 px-3 py-1 text-blue-500"
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => onDelete?.(lead._id)}
                        className="flex items-center gap-1 px-3 py-1 text-red-600"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </>
                  )}

                  {user?.role === "sales" && (
                    <button
                      onClick={() => onStatusUpdate?.(lead)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg"
                    >
                      <RefreshCcw size={16} />
                      <span className="hidden sm:inline">Status</span>
                    </button>
                  )}

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default LeadTable;