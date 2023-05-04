/* eslint-disable eqeqeq */
import { Dispatch } from "react";
import { Parks } from "..";
import { ParkActionTypes } from "../constants/parkContants";
import { LocationModel } from "../models/Location/LocationResponseModel";
import { ParkResponseAction, ParkRideModel, ParkRideResponseModel } from "../models/ParkRide/ParkRideResponseModel";
import { APICallRequest, formatError, HTTPMethod, makeAPICall } from "../utils/APICall";

const URL_BASE = 'https://parks.vendigo.com.br';

export const getParkDetails = (park: Parks, userLocationData: LocationModel) => {
  return async (dispatch: Dispatch<ParkResponseAction>) => {
    dispatch({ type: ParkActionTypes.PARK_GET_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.GET,
        path: `${URL_BASE}/park/${park}?latitude=${userLocationData.latitude}&longitude=${userLocationData.longitude}`
      }

      const response = await makeAPICall<ParkRideModel[]>(request);

      dispatch({ type: ParkActionTypes.PARK_GET_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({ type: ParkActionTypes.PARK_GET_FAIL, payload: errorResponse });
    }
  }
}

export const saveParkPriorities = (park: Parks, parkRides: ParkRideModel[]) => {
  return async (dispatch: Dispatch<ParkResponseAction>) => {
    dispatch({ type: ParkActionTypes.PARK_SAVE_PRIORITIES_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.POST,
        path: `${URL_BASE}/priorities/${park}`,
        body: {
          parkRides: parkRides
        }
      }

      const response = await makeAPICall<ParkRideResponseModel>(request);

      dispatch({ type: ParkActionTypes.PARK_SAVE_PRIORITIES_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({ type: ParkActionTypes.PARK_SAVE_PRIORITIES_FAIL, payload: errorResponse });
    }
  }
}

export const saveParkRideFavorite = (park: Parks, parkRide: ParkRideModel, isFavorite: boolean) => {
  return async (dispatch: Dispatch<ParkResponseAction>) => {
    dispatch({ type: ParkActionTypes.PARK_SAVE_FAVORITES_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.POST,
        path: `${URL_BASE}/favorites/${park}/${parkRide.id}?isFavorite=${isFavorite}`
      }

      const response = await makeAPICall<ParkRideResponseModel>(request);

      dispatch({ type: ParkActionTypes.PARK_SAVE_FAVORITES_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({ type: ParkActionTypes.PARK_SAVE_FAVORITES_FAIL, payload: errorResponse });
    }
  }
}

export const saveParkRideVisited = (park: Parks, parkRide: ParkRideModel, isVisited: boolean) => {
  return async (dispatch: Dispatch<ParkResponseAction>) => {
    dispatch({ type: ParkActionTypes.PARK_SAVE_VISITEDS_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.POST,
        path: `${URL_BASE}/visiteds/${park}/${parkRide.id}?isVisited=${isVisited}`
      }

      const response = await makeAPICall<ParkRideResponseModel>(request);

      dispatch({ type: ParkActionTypes.PARK_SAVE_VISITEDS_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({ type: ParkActionTypes.PARK_SAVE_VISITEDS_FAIL, payload: errorResponse });
    }
  }
}

export const saveParkRideNotification = (parkId: String, parkRideId: String, time: number) => {
  return async (dispatch: Dispatch<ParkResponseAction>) => {
    dispatch({ type: ParkActionTypes.PARK_SAVE_NOTIFICATION_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.POST,
        path: `${URL_BASE}/notifications/${parkId}/${parkRideId}?time=${time}`
      }

      const response = await makeAPICall<ParkRideResponseModel>(request);

      dispatch({ type: ParkActionTypes.PARK_SAVE_NOTIFICATION_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({ type: ParkActionTypes.PARK_SAVE_NOTIFICATION_FAIL, payload: errorResponse });
    }
  }
}

export const cancelParkRideNotification = (parkId: String, parkRideId: String) => {
  return async (dispatch: Dispatch<ParkResponseAction>) => {
    dispatch({ type: ParkActionTypes.PARK_CANCEL_NOTIFICATION_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.PUT,
        path: `${URL_BASE}/notifications/${parkId}/${parkRideId}`
      }

      const response = await makeAPICall<ParkRideResponseModel>(request);

      dispatch({ type: ParkActionTypes.PARK_CANCEL_NOTIFICATION_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({ type: ParkActionTypes.PARK_CANCEL_NOTIFICATION_FAIL, payload: errorResponse });
    }
  }
}