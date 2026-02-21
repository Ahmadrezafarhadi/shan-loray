"use client";

import React from "react";
import Link from "next/link";
import {
  IoBarChartOutline,
  IoCashOutline,
  IoPeopleOutline,
  IoReceiptOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { AdminService } from "@/lib/api";
import { AdminDashboardData } from "@/lib/api/config";
import { useAuth } from "@/lib/contexts/AuthContext";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";

const currency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);

const number = (value: number) => new Intl.NumberFormat("en-US").format(value || 0);

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-sky-100 text-sky-700",
  processing: "bg-indigo-100 text-indigo-700",
  shipped: "bg-violet-100 text-violet-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
  refunded: "bg-zinc-100 text-zinc-700",
};

export default function AdminDashboardClient() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [range, setRange] = React.useState<"7d" | "30d" | "90d">("30d");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<AdminDashboardData | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashboard = await AdminService.getDashboard(range);
        setData(dashboard);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load admin dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user?.is_admin, range]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading text="Loading admin dashboard..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorMessage message="برای دسترسی به پنل ادمین ابتدا وارد حساب کاربری شوید." />
      </div>
    );
  }

  if (!user?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorMessage message="شما دسترسی ادمین ندارید." />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorMessage message={error || "No dashboard data available"} />
      </div>
    );
  }

  const maxRevenue = Math.max(...data.monthly_sales.map((item) => item.revenue), 1);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f4eb] via-[#fffaf2] to-[#f3eee4] px-4 sm:px-6 md:px-10 lg:px-16 py-8">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <p className="text-[13px] text-[#7a6a56]">Admin / Sales Intelligence</p>
            <h1 className="text-[34px] sm:text-[42px] leading-tight font-semibold text-[#2f261b]">
              پنل مدیریت فروش
            </h1>
            <p className="text-[15px] text-[#6d5f4d] mt-1">
              بازه فعال: {data.filters.from} تا {data.filters.to}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={range}
              onChange={(event) => setRange(event.target.value as "7d" | "30d" | "90d")}
              className="h-11 px-4 rounded-xl border border-[#d9cfbe] bg-white text-[#2f261b] text-[14px]"
            >
              <option value="7d">7 روز اخیر</option>
              <option value="30d">30 روز اخیر</option>
              <option value="90d">90 روز اخیر</option>
            </select>
            <Link
              href="/Dashboard"
              className="h-11 px-4 rounded-xl border border-[#8B7355] text-[#8B7355] text-[14px] flex items-center"
            >
              حساب کاربری
            </Link>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          {[
            {
              icon: IoCashOutline,
              label: "کل فروش",
              value: currency(data.summary.total_revenue),
            },
            {
              icon: IoReceiptOutline,
              label: "کل سفارش‌ها",
              value: number(data.summary.total_orders),
            },
            {
              icon: IoTrendingUpOutline,
              label: "میانگین هر سفارش",
              value: currency(data.summary.average_order_value),
            },
            {
              icon: IoTimeOutline,
              label: "سفارش امروز",
              value: number(data.summary.today_orders),
            },
            {
              icon: IoPeopleOutline,
              label: "کل مشتریان",
              value: number(data.summary.total_customers),
            },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl bg-white border border-[#e5dac9] p-5 shadow-sm">
              <card.icon className="w-6 h-6 text-[#8B7355] mb-3" />
              <p className="text-[13px] text-[#7f715f]">{card.label}</p>
              <p className="text-[24px] font-semibold text-[#2c2418] mt-1">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <article className="xl:col-span-2 rounded-2xl bg-white border border-[#e5dac9] p-6">
            <div className="flex items-center gap-2 mb-5">
              <IoBarChartOutline className="w-5 h-5 text-[#8B7355]" />
              <h2 className="text-[20px] font-semibold text-[#2f261b]">روند فروش ماهانه</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {data.monthly_sales.map((month) => {
                const height = Math.max((month.revenue / maxRevenue) * 120, 6);
                return (
                  <div key={month.month} className="text-center">
                    <div className="h-[130px] rounded-lg bg-[#f8f4ec] flex items-end px-2 py-2">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-[#7f6645] to-[#ceb07f]"
                        style={{ height: `${height}px` }}
                        title={`${month.label}: ${currency(month.revenue)}`}
                      />
                    </div>
                    <p className="text-[11px] mt-2 text-[#655744]">{month.label}</p>
                    <p className="text-[11px] text-[#9a8870]">{number(month.orders)} سفارش</p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl bg-white border border-[#e5dac9] p-6">
            <h2 className="text-[20px] font-semibold text-[#2f261b] mb-5">وضعیت سفارش‌ها</h2>
            <div className="space-y-3">
              {data.status_breakdown.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] font-medium ${STATUS_COLORS[item.status || ""] || "bg-stone-100 text-stone-700"}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[15px] font-semibold text-[#3a2f21]">{number(item.count)}</span>
                </div>
              ))}
            </div>

            <h3 className="text-[17px] font-semibold text-[#2f261b] mt-8 mb-4">روش‌های پرداخت</h3>
            <div className="space-y-3">
              {data.payment_method_breakdown.map((item) => (
                <div key={item.payment_method} className="flex items-center justify-between">
                  <span className="text-[14px] text-[#6f604d] capitalize">{item.payment_method}</span>
                  <span className="text-[15px] font-semibold text-[#3a2f21]">{number(item.count)}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <article className="rounded-2xl bg-white border border-[#e5dac9] p-6">
            <h2 className="text-[20px] font-semibold text-[#2f261b] mb-5">محصولات پرفروش</h2>
            <div className="space-y-4">
              {data.top_products.length === 0 ? (
                <p className="text-[14px] text-[#7e705f]">داده‌ای برای نمایش وجود ندارد.</p>
              ) : (
                data.top_products.map((item) => (
                  <div key={item.product_id} className="border-b border-[#efe6d8] pb-3 last:border-b-0">
                    <p className="text-[14px] font-medium text-[#3a3024]">{item.product_name}</p>
                    <p className="text-[12px] text-[#7f705e] mt-1">
                      فروش: {number(item.units_sold)} عدد
                    </p>
                    <p className="text-[13px] font-semibold text-[#8B7355]">{currency(item.revenue)}</p>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="xl:col-span-2 rounded-2xl bg-white border border-[#e5dac9] p-6 overflow-x-auto">
            <h2 className="text-[20px] font-semibold text-[#2f261b] mb-5">آخرین سفارش‌ها</h2>
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="text-[12px] text-[#7f715f] uppercase">
                  <th className="pb-3 font-medium">شماره سفارش</th>
                  <th className="pb-3 font-medium">مشتری</th>
                  <th className="pb-3 font-medium">تعداد آیتم</th>
                  <th className="pb-3 font-medium">مبلغ</th>
                  <th className="pb-3 font-medium">وضعیت</th>
                  <th className="pb-3 font-medium">تاریخ</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_orders.map((order) => (
                  <tr key={order.id} className="border-t border-[#efe6d8] text-[14px] text-[#3c3124]">
                    <td className="py-3 font-medium">{order.order_number}</td>
                    <td className="py-3">
                      <div>{order.customer?.name || "-"}</div>
                      <div className="text-[12px] text-[#897966]">{order.customer?.email || "-"}</div>
                    </td>
                    <td className="py-3">{number(order.items_count)}</td>
                    <td className="py-3 font-semibold text-[#8B7355]">{currency(order.total)}</td>
                    <td className="py-3 capitalize">{order.status}</td>
                    <td className="py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      </div>
    </main>
  );
}
