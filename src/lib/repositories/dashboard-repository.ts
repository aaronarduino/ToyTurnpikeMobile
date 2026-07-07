import { apiClient } from "../api-client";
import type {
  IDashboardOverview,
  IDashboardPayments,
  IDashboardPaymentMethods,
  IVehiclesToytags,
  IActivity,
} from "@/interfaces/api-interfaces";

export const dashboardRepository = {
  getOverview(): Promise<IDashboardOverview> {
    return apiClient.get<IDashboardOverview>("/dashboard");
  },

  getPayments(): Promise<IDashboardPayments> {
    return apiClient.get<IDashboardPayments>("/dashboard/payments");
  },

  getPaymentMethods(): Promise<IDashboardPaymentMethods> {
    return apiClient.get<IDashboardPaymentMethods>(
      "/dashboard/payment_methods",
    );
  },

  getVehiclesToytags(): Promise<IVehiclesToytags> {
    return apiClient.get<IVehiclesToytags>("/dashboard/vehicles_toytags");
  },

  getActivity(): Promise<IActivity> {
    return apiClient.get<IActivity>("/dashboard/activity");
  },
};
