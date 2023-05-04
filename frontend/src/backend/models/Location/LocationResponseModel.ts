import { LocationActionTypes } from "../../constants/locationConstants";

export interface LocationModel {
  longitude: number;
  latitude: number;
}

// Action
export interface LocationSetAction {
  type: LocationActionTypes.SET_LOCATION;
  payload: LocationModel;
}

export type LocationResponseAction = 
LocationSetAction;

// Response state
export interface LocationResponseState {
  type?: string;
  loading?: boolean;
  data?: LocationModel;
}