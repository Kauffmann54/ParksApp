import { LocationActionTypes } from "../constants/locationConstants";
import { LocationResponseAction, LocationResponseState } from "../models/Location/LocationResponseModel";

export const locationReducer = (state = {}, action: LocationResponseAction): LocationResponseState => {
  switch (action.type) {
    case LocationActionTypes.SET_LOCATION:
      return { data: action.payload };

    default:
      return state;
  }
}