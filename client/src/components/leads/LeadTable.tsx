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

  onDelete?: (
    id: string
  ) => void;

  onStatusUpdate?: (
    lead: Lead
  ) => void;
};

const LeadTable = ({
  leads,
  onEdit,
  onDelete,
  onStatusUpdate,
}: Props) => {
  const user = useSelector(
    (state: any) =>
      state.auth.user
  );

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "Qualified":
        return `
          bg-green-100 text-green-700
          dark:bg-green-500/10 dark:text-green-400
        `;

      case "Contacted":
        return `
          bg-blue-100 text-blue-700
          dark:bg-blue-500/10 dark:text-blue-400
        `;

      case "Lost":
        return `
          bg-red-100 text-red-700
          dark:bg-red-500/10 dark:text-red-400
        `;

      default:
        return `
          bg-zinc-100 text-zinc-700
          dark:bg-zinc-800 dark:text-zinc-300
        `;
    }
  };

  return (
    <div
      className="
        overflow-x-auto
        rounded-3xl
      "
    >
      <table className="w-full min-w-[900px]">

        {/* HEAD */}
        <thead
          className="
            bg-zinc-50 dark:bg-zinc-900
            border-b border-zinc-200 dark:border-zinc-800
          "
        >
          <tr>

            <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500 dark:text-zinc-200">
              Customer
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500 dark:text-zinc-200">
              Email
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500 dark:text-zinc-200">
              Status
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500 dark:text-zinc-200">
              Source
            </th>

            <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500 dark:text-zinc-200">
              Actions
            </th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {leads?.map((lead) => (
            <tr
              key={lead._id}
              className="
                border-b border-zinc-100 dark:border-zinc-900
                hover:bg-zinc-50 dark:hover:bg-zinc-900/50
                transition-all duration-200
              "
            >

              {/* NAME */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-11 h-11 rounded-2xl
                      bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200
                      flex items-center justify-center
                    "
                  >
                    <User size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-zinc-800 dark:text-white">
                      {lead.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      Lead Customer
                    </p>
                  </div>

                </div>
              </td>

              {/* EMAIL */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <Mail size={16} />

                  <span>
                    {lead.email}
                  </span>
                </div>
              </td>

              {/* STATUS */}
              <td className="px-6 py-5">
                <span
                  className={`
                    inline-flex items-center
                    px-4 py-2
                    rounded-full
                    text-sm font-medium
                    ${getStatusStyle(
                      lead.status
                    )}
                  `}
                >
                  {lead.status}
                </span>
              </td>

              {/* SOURCE */}
              <td className="px-6 py-5">
                <span
                  className="
                    px-4 py-2
                    rounded-xl
                    bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300
                    text-sm font-medium
                  "
                >
                  {lead.source}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">

                  {user?.role ===
                    "admin" && (
                    <button
                      onClick={() =>
                        onEdit?.(lead)
                      }
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        text-blue-500 hover:bg-blue-600
                        hover:text-white
                        transition-all duration-200
                      "
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  )}

                  {user?.role ===
                    "admin" && (
                    <button
                      onClick={() =>
                        onDelete?.(
                          lead._id
                        )
                      }
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-xl border-1
                        text-red-600 hover:bg-red-50
                        
                        transition-all duration-200
                      "
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}

                  {user?.role ===
                    "sales" && (
                    <button
                      onClick={() =>
                        onStatusUpdate?.(
                          lead
                        )
                      }
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-green-500 hover:bg-green-600
                        text-white
                        transition-all duration-200
                      "
                    >
                      <RefreshCcw
                        size={16}
                      />
                      Status
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