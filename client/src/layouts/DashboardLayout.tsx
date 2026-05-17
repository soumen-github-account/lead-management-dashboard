import Sidebar from "../components/layout/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: Props) => {
  return (
    <div
      className="
        max-h-[100vh]
        flex
        bg-zinc-100
        dark:bg-zinc-900
        transition-all duration-300
      "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Mobile Header */}
        <header
          className="
            md:hidden
            sticky top-0 z-50
            backdrop-blur-lg
            bg-white/80 dark:bg-zinc-950/80
            border-b border-zinc-200 dark:border-zinc-800
            px-5 py-4
          "
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-zinc-800 dark:text-white">
              Smart Leads
            </h1>

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-zinc-100 dark:bg-zinc-900
                flex items-center justify-center
              "
            >
              ⚡
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="
            flex-1
            p-4 md:p-8
            overflow-y-auto
          "
        >
          <div
            className="
              min-h-[calc(100vh-40px)]
              rounded-3xl
              bg-white
              dark:bg-zinc-950
              border border-zinc-200 dark:border-zinc-800
              shadow-sm
              p-6 md:p-8
              transition-all duration-300
            "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;