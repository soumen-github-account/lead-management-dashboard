import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import { fetchLeads } from "../features/leads/leadSlice";

import LeadTable from "../components/leads/LeadTable";
import CreateLeadModal from "../components/leads/CreateLeadModal";

import debounce from "lodash.debounce";

import type { Lead } from "../types/lead";

import EditLeadModal from "../components/leads/EditLeadModal";

import toast from "react-hot-toast";

import API from "../api/axios";

import TableSkeleton from "../components/common/TableSkeleton";

import {
  Plus,
  Download,
  Search,
  Filter,
} from "lucide-react";

const LeadsPage = () => {
  const dispatch = useDispatch<any>();

  const [openModal, setOpenModal] =
    useState(false);

  const {
    leads,
    loading,
    pagination,
  } = useSelector(
    (state: any) => state.leads
  );

  const user = useSelector(
    (state: any) => state.auth.user
  );

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [source, setSource] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [sort, setSort] =
    useState("latest");

  const [
    selectedLead,
    setSelectedLead,
  ] = useState<Lead | null>(null);

  const fetchData = () => {
    dispatch(
      fetchLeads({
        search,
        status,
        source,
        page,
        sort,
      })
    );
  };

  const debouncedSearch =
    debounce((value: string) => {
      dispatch(
        fetchLeads({
          search: value,
          status,
          source,
          page: 1,
          sort,
        })
      );
    }, 500);

  useEffect(() => {
    fetchData();
  }, [status, source, page, sort]);

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this lead?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/leads/${id}`
      );

      toast.success(
        "Lead deleted"
      );

      fetchData();
    } catch (error) {
      toast.error(
        "Delete failed"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div
          className="
            flex flex-col lg:flex-row
            lg:items-center lg:justify-between
            gap-6
          "
        >
          <div>
            <h1 className="text-4xl font-bold tracking-tight dark:text-zinc-200">
              Leads Management
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Manage customer leads,
              filters and conversions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                window.open(
                  "http://localhost:5000/api/leads/export/csv",
                  "_blank"
                )
              }
              className="
                flex items-center gap-2
                bg-green-600 hover:bg-green-700
                text-white
                px-5 py-3
                rounded-2xl
                transition-all duration-200
              "
            >
              <Download size={18} />
              Export CSV
            </button>

            {user?.role ===
              "admin" && (
              <button
                onClick={() =>
                  setOpenModal(true)
                }
                className="
                  flex items-center gap-2
                  bg-black dark:bg-white
                  dark:text-black
                  text-white
                  px-5 py-3
                  rounded-2xl
                  transition-all duration-200
                  hover:scale-[1.02]
                "
              >
                <Plus size={18} />
                Create Lead
              </button>
            )}
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div
          className="
            bg-white dark:bg-zinc-950
            border border-zinc-200 dark:border-zinc-800
            rounded-3xl
            p-5 md:p-6
            shadow-sm
          "
        >
          <div className="flex items-center gap-2 mb-5">
            <Filter size={18} />

            <h2 className="font-semibold text-lg dark:text-zinc-200">
              Filters & Search
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-4
            "
          >

            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-zinc-400 dark:text-zinc-200
                "
              />

              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => {
                  setSearch(
                    e.target.value
                  );

                  debouncedSearch(
                    e.target.value
                  );
                }}
                className="
                  w-full
                  bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200
                  border border-zinc-200 dark:border-zinc-800
                  rounded-2xl
                  pl-11 pr-4 py-3
                  outline-none
                  focus:ring-2 focus:ring-black dark:focus:ring-white
                  transition-all
                "
              />
            </div>

            {/* STATUS */}
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="
                bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200
                border border-zinc-200 dark:border-zinc-800
                rounded-2xl
                px-4 py-3
                outline-none
              "
            >
              <option value="">
                Status
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

            {/* SOURCE */}
            <select
              value={source}
              onChange={(e) =>
                setSource(
                  e.target.value
                )
              }
              className="
                bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200
                border border-zinc-200 dark:border-zinc-800
                rounded-2xl
                px-4 py-3
                outline-none
              "
            >
              <option value="">
                Source
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

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="
                bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200
                border border-zinc-200 dark:border-zinc-800
                rounded-2xl
                px-4 py-3
                outline-none
              "
            >
              <option value="latest">
                Latest
              </option>

              <option value="oldest">
                Oldest
              </option>
            </select>

          </div>
        </div>

        {/* TABLE */}
        <div
          className="
            bg-white dark:bg-zinc-950
            border border-zinc-200 dark:border-zinc-800
            rounded-3xl
            shadow-sm
            overflow-hidden
          "
        >
          {loading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : leads?.length ===
            0 ? (
            <div className="p-16 text-center">
              <h2 className="text-2xl font-bold">
                No leads found
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Try changing filters
                or create a new lead.
              </p>
            </div>
          ) : (
            <LeadTable
              leads={leads}
              onEdit={(lead) =>
                setSelectedLead(
                  lead
                )
              }
              onDelete={
                handleDelete
              }
            />
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-4">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="
              px-5 py-3
              rounded-2xl
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950 dark:text-zinc-200
              disabled:opacity-50
            "
          >
            Prev
          </button>

          <div
            className="
              px-5 py-3
              rounded-2xl
              bg-black dark:bg-white
              text-white dark:text-black
              font-semibold
            "
          >
            {pagination?.page} /{" "}
            {pagination?.pages}
          </div>

          <button
            disabled={
              page ===
              pagination?.pages
            }
            onClick={() =>
              setPage(page + 1)
            }
            className="
              px-5 py-3
              rounded-2xl
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-zinc-950 dark:text-zinc-200
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

        {/* MODALS */}
        {openModal && (
          <CreateLeadModal
            onClose={() =>
              setOpenModal(
                false
              )
            }
            fetchData={fetchData}
          />
        )}

        {selectedLead && (
          <EditLeadModal
            lead={selectedLead}
            onClose={() =>
              setSelectedLead(
                null
              )
            }
            fetchData={fetchData}
          />
        )}

      </div>
    </DashboardLayout>
  );
};

export default LeadsPage;