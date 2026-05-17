import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import DashboardLayout from "../layouts/DashboardLayout";

import { fetchLeads, } from "../features/leads/leadSlice";

import LeadTable from "../components/leads/LeadTable";
import UpdateStatusModal from "../components/leads/UpdateStatusModal";

const SalesDashboard = () => {

  const dispatch =
    useDispatch<any>();
    
  const {
    leads,
    loading,
  } = useSelector(
    (state: any) => state.leads
  );

  const fetchData = () => {
  dispatch(
    fetchLeads({
      search: "",
      status: "",
      source: "",
      page: 1,
      sort: "latest",
    })
  );
};

  useEffect(() => {
    fetchData();
  }, []);


  const [openModal,
setOpenModal] =
  useState(false);

const [selectedLead,
setSelectedLead] =
  useState<any>(null);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6 dark:text-zinc-200">
          My Assigned Leads
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <LeadTable
            leads={leads || []} onStatusUpdate={(lead) => {
                setSelectedLead(lead);

                setOpenModal(true);
            }}
          />
        )}
      </div>
      {openModal && selectedLead && (
            <UpdateStatusModal
                leadId={selectedLead._id}

                currentStatus={
                selectedLead.status
                }

                onClose={() =>
                setOpenModal(false)
                }

                fetchData={fetchData}
            />
        )}
    </DashboardLayout>
  );
};

export default SalesDashboard;