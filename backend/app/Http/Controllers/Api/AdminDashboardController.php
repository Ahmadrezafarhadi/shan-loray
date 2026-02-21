<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $rangeDays = $this->resolveRangeDays($request->query('range'));
        $rangeStart = now()->startOfDay()->subDays($rangeDays - 1);
        $todayStart = now()->startOfDay();

        $allOrders = Order::query();
        $completedOrders = Order::query()->whereNotIn('status', ['cancelled', 'refunded']);

        $totalOrders = (int) $allOrders->count();
        $completedOrdersCount = (int) $completedOrders->count();
        $totalRevenue = (float) $completedOrders->sum('total');
        $todayOrders = (int) $allOrders->where('created_at', '>=', $todayStart)->count();
        $todayRevenue = (float) Order::query()
            ->whereNotIn('status', ['cancelled', 'refunded'])
            ->where('created_at', '>=', $todayStart)
            ->sum('total');

        $revenueInRange = (float) Order::query()
            ->whereNotIn('status', ['cancelled', 'refunded'])
            ->whereBetween('created_at', [$rangeStart, now()])
            ->sum('total');

        $ordersInRange = (int) Order::query()
            ->whereBetween('created_at', [$rangeStart, now()])
            ->count();

        $newCustomersInRange = (int) User::query()
            ->whereBetween('created_at', [$rangeStart, now()])
            ->count();

        $totalCustomers = (int) User::query()->count();
        $activeCustomers = (int) Order::query()->distinct('user_id')->count('user_id');

        $statusBreakdown = Order::query()
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->map(fn ($row) => [
                'status' => $row->status,
                'count' => (int) $row->count,
            ])
            ->values();

        $paymentMethodBreakdown = Order::query()
            ->selectRaw("COALESCE(payment_method, 'unknown') as payment_method, COUNT(*) as count")
            ->groupBy('payment_method')
            ->get()
            ->map(fn ($row) => [
                'payment_method' => $row->payment_method,
                'count' => (int) $row->count,
            ])
            ->values();

        $monthlySales = collect(range(11, 0))
            ->map(function (int $monthsAgo) {
                $monthStart = now()->startOfMonth()->subMonths($monthsAgo);
                $monthEnd = (clone $monthStart)->endOfMonth();

                $monthRevenue = (float) Order::query()
                    ->whereNotIn('status', ['cancelled', 'refunded'])
                    ->whereBetween('created_at', [$monthStart, $monthEnd])
                    ->sum('total');

                $monthOrders = (int) Order::query()
                    ->whereBetween('created_at', [$monthStart, $monthEnd])
                    ->count();

                return [
                    'month' => $monthStart->format('Y-m'),
                    'label' => $monthStart->format('M Y'),
                    'revenue' => round($monthRevenue, 2),
                    'orders' => $monthOrders,
                ];
            })
            ->values();

        $recentOrders = Order::query()
            ->with('user:id,first_name,last_name,email')
            ->withCount('items')
            ->latest()
            ->limit(12)
            ->get()
            ->map(fn (Order $order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'total' => (float) $order->total,
                'payment_status' => $order->payment_status,
                'items_count' => (int) $order->items_count,
                'created_at' => $order->created_at->toIso8601String(),
                'customer' => [
                    'name' => trim(($order->user?->first_name ?? '') . ' ' . ($order->user?->last_name ?? '')),
                    'email' => $order->user?->email,
                ],
            ])
            ->values();

        $topProducts = OrderItem::query()
            ->selectRaw('product_id, product_name, SUM(quantity) as units_sold, SUM(total) as revenue')
            ->groupBy('product_id', 'product_name')
            ->orderByDesc('units_sold')
            ->limit(8)
            ->get()
            ->map(fn ($row) => [
                'product_id' => (int) $row->product_id,
                'product_name' => $row->product_name,
                'units_sold' => (int) $row->units_sold,
                'revenue' => (float) $row->revenue,
            ])
            ->values();

        $averageOrderValue = $completedOrdersCount > 0
            ? round($totalRevenue / $completedOrdersCount, 2)
            : 0;

        return response()->json([
            'summary' => [
                'total_orders' => $totalOrders,
                'total_revenue' => round($totalRevenue, 2),
                'average_order_value' => $averageOrderValue,
                'today_orders' => $todayOrders,
                'today_revenue' => round($todayRevenue, 2),
                'total_customers' => $totalCustomers,
                'active_customers' => $activeCustomers,
                'new_customers_in_range' => $newCustomersInRange,
                'orders_in_range' => $ordersInRange,
                'revenue_in_range' => round($revenueInRange, 2),
            ],
            'status_breakdown' => $statusBreakdown,
            'payment_method_breakdown' => $paymentMethodBreakdown,
            'monthly_sales' => $monthlySales,
            'top_products' => $topProducts,
            'recent_orders' => $recentOrders,
            'filters' => [
                'range' => "{$rangeDays}d",
                'from' => $rangeStart->toDateString(),
                'to' => now()->toDateString(),
            ],
        ]);
    }

    private function resolveRangeDays(?string $range): int
    {
        return match ($range) {
            '7d' => 7,
            '90d' => 90,
            default => 30,
        };
    }
}
