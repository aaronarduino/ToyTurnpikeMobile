import { apiClient } from "../api-client";
import type { IVehicles, IVehicle, IToytags } from "@/interfaces/api-interfaces";
import type { Vehicle } from "@/models/apimodels";

export const vehiclesRepository = {
  getAll(): Promise<IVehicles> {
    return apiClient.get<IVehicles>("/vehicles");
  },

  getToytags(): Promise<IToytags> {
    return apiClient.get<IToytags>("/vehicles/toytags");
  },

  createVehicle(vehicle: Vehicle): Promise<IVehicle> {
    return apiClient.post<IVehicle>("/vehicles", vehicle);
  },
};
