
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Users, UserPlus, Search, Shield, UserCheck, Briefcase, Mail, LoaderCircle  } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const UsersPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await API.get("/leads/get-all-users");
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await API.post("/auth/register", data);
      toast.success("User created successfully");
      setLoading(false)
      reset();
      fetchUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoading(false)
    }
  };

  const filteredUsers = users.filter((user: any) => {
    const matchRole = roleFilter ? user.role === roleFilter : true;
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    return matchRole && matchSearch;
  });

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
      case "leader":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
      default:
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 dark:text-zinc-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold tracking-tight dark:text-zinc-200">Users Management</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Manage admins, leaders and sales team members.</p>
          </div>

          <div className="w-16 h-16 rounded-3xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
            <Users size={30} />
          </div>
        </div>
        <div className="grid xl:grid-cols-[420px_1fr] gap-8">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center dark:text-zinc-200">
                <UserPlus size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold dark:text-zinc-200">Create User</h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Add new team members</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-2 block dark:text-zinc-200">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-zinc-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block dark:text-zinc-200">Email Address</label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  {...register("email")}
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-zinc-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block dark:text-zinc-200">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-zinc-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block dark:text-zinc-200">Select Role</label>
                <select
                  {...register("role")}
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 outline-none dark:text-zinc-200"
                >
                  <option value="">Select Role</option>
                  <option value="leader">Leader</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <button disabled={loading} className={`w-full bg-black dark:bg-white dark:text-black text-white py-3.5 rounded-2xl font-semibold hover:scale-[1.01] transition-all duration-200 ${loading && "cursor-no-drop"}`}>
                {loading ? 
                (
                  <span className="w-full flex items-center justify-center gap-3 text-zinc-400"><LoaderCircle className="animate-spin transition-all duration-500" /><p>please wait...</p></span>
                )
                : "Create User"}
              </button>
            </form>
          </div>
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold dark:text-zinc-200">All Users</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-1">Team members overview</p>
                </div>

                <div className="flex gap-3">
                  <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-200" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-11 pr-4 py-3 outline-none dark:text-zinc-200"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 outline-none dark:text-zinc-200"
                  >
                    <option value="">All</option>
                    <option value="leader">Leader</option>
                    <option value="sales">Sales</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500">User</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500">Email</th>
                    <th className="px-6 py-5 text-left text-sm font-semibold text-zinc-500">Role</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user: any) => (
                    <tr key={user._id} className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all duration-200">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center dark:text-zinc-200">
                            {user.role === "admin" ? (
                              <Shield size={20} />
                            ) : user.role === "leader" ? (
                              <Briefcase size={20} />
                            ) : (
                              <UserCheck size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold dark:text-zinc-200">{user.name}</p>
                            <p className="text-sm text-zinc-500">Team Member</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                          <Mail size={16} />
                          <span>{user.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getRoleStyle(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default UsersPage;