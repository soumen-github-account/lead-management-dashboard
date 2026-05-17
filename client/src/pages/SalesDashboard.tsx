import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchLeads } from "../features/leads/leadSlice";
import LeadTable from "../components/leads/LeadTable";
import UpdateStatusModal from "../components/leads/UpdateStatusModal";

const SalesDashboard = () => {
  const dispatch = useDispatch<any>();
  const { leads, loading } = useSelector((state: any) => state.leads);
  
  const [openModal, setOpenModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

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

  return (
    <DashboardLayout>
      <div className="space-y-6 dark:text-zinc-200">
        <h1 className="text-3xl font-bold dark:text-zinc-200 tracking-tight">
          My Assigned Leads
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">Loading...</p>
          </div>
        ) : (
          <LeadTable
            leads={leads || []}
            onStatusUpdate={(lead) => {
              setSelectedLead(lead);
              setOpenModal(true);
            }}
          />
        )}
      </div>

      {openModal && selectedLead && (
        <UpdateStatusModal
          leadId={selectedLead._id}
          currentStatus={selectedLead.status}
          onClose={() => setOpenModal(false)}
          fetchData={fetchData}
        />
      )}
    </DashboardLayout>
  );
};

export default SalesDashboard;