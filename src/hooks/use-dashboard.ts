import { useState, useEffect } from "react";
import { dashboardRepository } from "@/lib/repositories/dashboard-repository";
import type {
  IDashboardPayments,
  IDashboardPaymentMethods,
  IVehiclesToytags,
  IActivity,
} from "@/interfaces/api-interfaces";

interface UseQueryResult<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}

export function useDashboardPayments(): UseQueryResult<IDashboardPayments> {
  const [data, setData] = useState<IDashboardPayments>({
    statement_balance: 0,
    auto_pay_date: "",
    current_account_balance: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardRepository
      .getPayments()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}

export function useDashboardPaymentMethods(): UseQueryResult<IDashboardPaymentMethods> {
  const [data, setData] = useState<IDashboardPaymentMethods>({
    primary: { card_number: 0, expiration_date: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardRepository
      .getPaymentMethods()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}

export function useDashboardVehiclesToytags(): UseQueryResult<IVehiclesToytags> {
  const [data, setData] = useState<IVehiclesToytags>({
    vehicles: 0,
    toytags: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardRepository
      .getVehiclesToytags()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}

export function useDashboardActivity(): UseQueryResult<IActivity> {
  const [data, setData] = useState<IActivity>({
    tolls: 0,
    fees: 0,
    payments: 0,
    adjustments: 0,
    refunds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardRepository
      .getActivity()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}
