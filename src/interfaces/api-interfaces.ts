export interface IVehicles {
  vehicles: IVehicle[];
}

export interface IVehicle {
  _id: string;
  plate_number: string;
  state: string;
}

export interface IToytags {
  toytags: IToytag[];
}

export interface IToytag {
  _id: string;
  toytag_number: string;
  vehicles: IVehicle[];
}

export interface IDashboardOverview {
  account: { holder: string; id: number };
}

export interface IDashboardPayments {
  statement_balance: number;
  auto_pay_date: string;
  current_account_balance: number;
}

export interface IPaymentMethod {
  card_number: number;
  expiration_date: string;
}

export interface IDashboardPaymentMethods {
  primary: IPaymentMethod;
}

export interface IVehiclesToytags {
  vehicles: number;
  toytags: number;
}

export interface IActivity {
  tolls: number;
  fees: number;
  payments: number;
  adjustments: number;
  refunds: number;
}
