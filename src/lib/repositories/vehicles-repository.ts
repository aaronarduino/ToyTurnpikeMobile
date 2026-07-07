import { apiClient } from "../api-client";
import type { IVehicles, IToytags } from "@/interfaces/api-interfaces";

export const vehiclesRepository = {
  getAll(): Promise<IVehicles> {
    return apiClient.get<IVehicles>("/vehicles");
  },

  getToytags(): Promise<IToytags> {
    return apiClient.get<IToytags>("/vehicles/toytags");
  },
};
