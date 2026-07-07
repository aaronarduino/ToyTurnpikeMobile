import { useState, useEffect } from "react";
import { vehiclesRepository } from "@/lib/repositories/vehicles-repository";
import type { IVehicles, IToytags } from "@/interfaces/api-interfaces";

interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useVehicles(): UseQueryResult<IVehicles> {
  const [data, setData] = useState<IVehicles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    vehiclesRepository
      .getAll()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}

export function useToytags(): UseQueryResult<IToytags> {
  const [data, setData] = useState<IToytags | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    vehiclesRepository
      .getToytags()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}
