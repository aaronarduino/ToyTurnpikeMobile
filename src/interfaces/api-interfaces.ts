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
