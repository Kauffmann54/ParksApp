import { ParkActionTypes } from "../constants/parkContants";
import { ParkResponseAction, ParkRideMessageResponseState, ParkRideResponseState } from "../models/ParkRide/ParkRideResponseModel";

export const parkRideReducer = (state = {}, action: ParkResponseAction): ParkRideResponseState => {
  switch (action.type) {
    case ParkActionTypes.PARK_GET_REQUEST:
      return { loading: true };

    case ParkActionTypes.PARK_GET_SUCCESS:
      return { loading: false, data: action.payload };

    case ParkActionTypes.PARK_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}

export const parkRideSavesReducer = (state = {}, action: ParkResponseAction): ParkRideMessageResponseState => {
  switch (action.type) {
    case ParkActionTypes.PARK_SAVE_FAVORITES_REQUEST:
    case ParkActionTypes.PARK_SAVE_VISITEDS_REQUEST:
    case ParkActionTypes.PARK_SAVE_PRIORITIES_REQUEST:
    case ParkActionTypes.PARK_SAVE_NOTIFICATION_REQUEST:
    case ParkActionTypes.PARK_CANCEL_NOTIFICATION_REQUEST:
      return { loading: true };

    case ParkActionTypes.PARK_SAVE_FAVORITES_SUCCESS:
    case ParkActionTypes.PARK_SAVE_VISITEDS_SUCCESS:
    case ParkActionTypes.PARK_SAVE_PRIORITIES_SUCCESS:
    case ParkActionTypes.PARK_SAVE_NOTIFICATION_SUCCESS:
    case ParkActionTypes.PARK_CANCEL_NOTIFICATION_SUCCESS:
      return { loading: false, data: action.payload };

    case ParkActionTypes.PARK_SAVE_FAVORITES_FAIL:
    case ParkActionTypes.PARK_SAVE_VISITEDS_FAIL:
    case ParkActionTypes.PARK_SAVE_PRIORITIES_FAIL:
    case ParkActionTypes.PARK_SAVE_NOTIFICATION_FAIL:
    case ParkActionTypes.PARK_CANCEL_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };

    case ParkActionTypes.PARK_SAVE_RESET:
      return {};

    default:
      return state;
  }
}