import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import API from "../api/axios";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  Users,
  BadgeCheck,
  Phone,
  XCircle,
  TrendingUp,
} from "lucide-react";

const COLORS = [
  "#18181b",
  "#52525b",
  "#a1a1aa",
];

const DashboardPage = () => {
  const [analytics, setAnalytics] =
    useState<any>(null);

  const fetchAnalytics =
    async () => {
      try {
        const res = await API.get(
          "/analytics"
        );

        setAnalytics(
          res.data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
              Loading Dashboard...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = [
    {
      name: "Website",
      value:
        analytics?.sourceAnalytics
          ?.websiteLeads || 0,
    },

    {
      name: "Instagram",
      value:
        analytics?.sourceAnalytics
          ?.instagramLeads || 0,
    },

    {
      name: "Referral",
      value:
        analytics?.sourceAnalytics
          ?.referralLeads || 0,
    },
  ];

  const conversionRate =
    analytics?.totalLeads > 0
      ? Math.round(
          (
            analytics
              ?.statusAnalytics
              ?.qualifiedLeads /
            analytics.totalLeads
          ) * 100
        )
      : 0;

  const stats = [
    {
      title: "Total Leads",
      value:
        analytics?.totalLeads,
      icon: Users,
      growth: "+12%",
    },

    {
      title: "Qualified",
      value:
        analytics
          ?.statusAnalytics
          ?.qualifiedLeads || 0,
      icon: BadgeCheck,
      growth: "+8%",
    },

    {
      title: "Contacted",
      value:
        analytics
          ?.statusAnalytics
          ?.contactedLeads || 0,
      icon: Phone,
      growth: "+5%",
    },

    {
      title: "Lost",
      value:
        analytics
          ?.statusAnalytics
          ?.lostLeads || 0,
      icon: XCircle,
      growth: "-2%",
    },

    {
      title: "Conversion",
      value: `${conversionRate}%`,
      icon: TrendingUp,
      growth: "+18%",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* HERO */}
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            bg-black dark:bg-gray-300
            text-white dark:text-black
            p-8 md:p-10
          "
        >
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome Back
            </h1>

            <p className="mt-4 text-zinc-300 dark:text-zinc-700 text-lg max-w-2xl">
              Monitor leads, track
              conversions and manage
              your entire sales team
              from one dashboard.
            </p>
          </div>

          <div
            className="
              absolute -right-10 -top-10
              w-52 h-52
              rounded-full
              bg-white/10 dark:bg-black/10
            "
          />

          <div
            className="
              absolute right-20 bottom-0
              w-32 h-32
              rounded-full
              bg-white/5 dark:bg-black/5
            "
          />
        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-5
            gap-6
          "
        >
          {stats.map(
            (item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    bg-white dark:bg-zinc-950
                    border border-zinc-200 dark:border-zinc-800
                    rounded-3xl
                    p-6
                    hover:-translate-y-1
                    transition-all duration-300
                    shadow-sm
                  "
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-zinc-100 dark:bg-zinc-400
                        flex items-center justify-center
                      "
                    >
                      <Icon size={22} />
                    </div>

                    <span className="text-green-500 text-sm font-semibold">
                      {item.growth}
                    </span>
                  </div>

                  <p className="mt-6 text-zinc-500 dark:text-zinc-400">
                    {item.title}
                  </p>

                  <h1 className="text-5xl font-bold mt-2 tracking-tight dark:text-zinc-200">
                    {item.value}
                  </h1>
                </div>
              );
            }
          )}
        </div>

        {/* CHARTS */}
        <div className="grid xl:grid-cols-2 gap-8">

          {/* PIE */}
          <div
            className="
              bg-white dark:bg-zinc-950
              border border-zinc-200 dark:border-zinc-800
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold dark:text-zinc-200">
                  Lead Sources
                </h2>

                <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                  Distribution overview
                </p>
              </div>
            </div>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  innerRadius={70}
                  paddingAngle={4}
                  label
                >
                  {chartData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* SUMMARY */}
          <div
            className="
              bg-white dark:bg-zinc-950
              border border-zinc-200 dark:border-zinc-800
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <h2 className="text-2xl font-bold mb-8 dark:text-zinc-200">
              Lead Summary
            </h2>

            <div className="space-y-5">

              {chartData.map(
                (item, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center justify-between
                      p-5
                      rounded-2xl
                      bg-zinc-50 dark:bg-zinc-900
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index],
                        }}
                      />

                      <span className="font-medium text-lg dark:text-zinc-200">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-3xl font-bold dark:text-zinc-200">
                      {item.value}
                    </span>
                  </div>
                )
              )}

            </div>
          </div>

        </div>

        {/* ACTIVITY */}
        <div
          className="
            bg-white dark:bg-zinc-950
            border border-zinc-200 dark:border-zinc-800
            rounded-3xl
            p-6
            shadow-sm
          "
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                Recent Activity
              </h2>

              <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                Latest team actions
              </p>
            </div>
          </div>

          <div className="space-y-5">

            {[
              {
                title:
                  "Rahul lead moved to Qualified",
                time:
                  "2 minutes ago",
              },

              {
                title:
                  "New lead added from Instagram",
                time:
                  "10 minutes ago",
              },

              {
                title:
                  "Aman updated customer status",
                time:
                  "30 minutes ago",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  flex items-start justify-between
                  p-5
                  rounded-2xl
                  bg-zinc-50 dark:bg-zinc-900
                "
              >
                <div>
                  <p className="font-semibold text-lg dark:text-zinc-200">
                    {item.title}
                  </p>

                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                    {item.time}
                  </p>
                </div>

                <div
                  className="
                    w-3 h-3 rounded-full
                    bg-green-500
                    mt-2
                  "
                />
              </div>
            ))}

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;