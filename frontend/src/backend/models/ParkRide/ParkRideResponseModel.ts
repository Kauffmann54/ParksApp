import { ParkActionTypes } from "../../constants/parkContants";
import { ErrorResponseModel } from "../Error/ErrorResponseModel";

export enum ParkRideStatus {
  Operating = "Operating",
  Closed = "Closed",
  Refurbishment = "Refurbishment",
}

export enum ParkRideType {
  Restaurant = "RESTAURANT",
  Attraction = "ATTRACTION",
}

export interface ParkRideModel {
  id: string;
  waitTime?: number | null;
  status?: ParkRideStatus | null;
  active: boolean;
  lastUpdate?: Date | null;
  name: string;
  fastPass: boolean;
  meta: {
    type: ParkRideType;
    longitude: number;
    latitude: number;
    singleRider: boolean;
  }
  favorite: boolean;
  priority: number;
  checked: boolean;
  distance?: number;
  visited?: boolean;
  notificationTime?: number;
}

export interface ParkRideResponseModel {
  success: boolean;
  messages: string[];
}

// Action
// Get park detais
export interface ParkGetRequestAction {
  type: ParkActionTypes.PARK_GET_REQUEST;
}

export interface ParkGetSuccessAction {
  type: ParkActionTypes.PARK_GET_SUCCESS;
  payload: ParkRideModel[];
}

export interface ParkGetFailAction {
  type: ParkActionTypes.PARK_GET_FAIL;
  payload: ErrorResponseModel;
}

// Save park ride favorites
export interface ParkRideSaveFavoritesRequestAction {
  type: ParkActionTypes.PARK_SAVE_FAVORITES_REQUEST;
}

export interface ParkRideSaveFavoritesSuccessAction {
  type: ParkActionTypes.PARK_SAVE_FAVORITES_SUCCESS;
  payload: ParkRideResponseModel;
}

export interface ParkRideSaveFavoritesFailAction {
  type: ParkActionTypes.PARK_SAVE_FAVORITES_FAIL;
  payload: ErrorResponseModel;
}

// Save park ride visiteds
export interface ParkRideSaveVisitedsRequestAction {
  type: ParkActionTypes.PARK_SAVE_VISITEDS_REQUEST;
}

export interface ParkRideSaveVisitedsSuccessAction {
  type: ParkActionTypes.PARK_SAVE_VISITEDS_SUCCESS;
  payload: ParkRideResponseModel;
}

export interface ParkRideSaveVisitedsFailAction {
  type: ParkActionTypes.PARK_SAVE_VISITEDS_FAIL;
  payload: ErrorResponseModel;
}

// Save park ride priorities
export interface ParkRideSavePrioritiesRequestAction {
  type: ParkActionTypes.PARK_SAVE_PRIORITIES_REQUEST;
}

export interface ParkRideSavePrioritiesSuccessAction {
  type: ParkActionTypes.PARK_SAVE_PRIORITIES_SUCCESS;
  payload: ParkRideResponseModel;
}

export interface ParkRideSavePrioritiesFailAction {
  type: ParkActionTypes.PARK_SAVE_PRIORITIES_FAIL;
  payload: ErrorResponseModel;
}

// Save park ride schedule
export interface ParkRideSaveScheduleRequestAction {
  type: ParkActionTypes.PARK_SAVE_NOTIFICATION_REQUEST;
}

export interface ParkRideSaveScheduleSuccessAction {
  type: ParkActionTypes.PARK_SAVE_NOTIFICATION_SUCCESS;
  payload: ParkRideResponseModel;
}

export interface ParkRideSaveScheduleFailAction {
  type: ParkActionTypes.PARK_SAVE_NOTIFICATION_FAIL;
  payload: ErrorResponseModel;
}

// Cancel park ride schedule
export interface ParkRideCancelScheduleRequestAction {
  type: ParkActionTypes.PARK_CANCEL_NOTIFICATION_REQUEST;
}

export interface ParkRideCancelScheduleSuccessAction {
  type: ParkActionTypes.PARK_CANCEL_NOTIFICATION_SUCCESS;
  payload: ParkRideResponseModel;
}

export interface ParkRideCancelScheduleFailAction {
  type: ParkActionTypes.PARK_CANCEL_NOTIFICATION_FAIL;
  payload: ErrorResponseModel;
}

// Reset saves
export interface ParkRideSaveResetAction {
  type: ParkActionTypes.PARK_SAVE_RESET;
}

export type ParkResponseAction = 
ParkGetRequestAction | ParkGetSuccessAction | ParkGetFailAction |
ParkRideSaveFavoritesRequestAction | ParkRideSaveFavoritesSuccessAction | ParkRideSaveFavoritesFailAction |
ParkRideSaveVisitedsRequestAction | ParkRideSaveVisitedsSuccessAction | ParkRideSaveVisitedsFailAction |
ParkRideSavePrioritiesRequestAction | ParkRideSavePrioritiesSuccessAction | ParkRideSavePrioritiesFailAction |
ParkRideSaveScheduleRequestAction | ParkRideSaveScheduleSuccessAction | ParkRideSaveScheduleFailAction |
ParkRideCancelScheduleRequestAction | ParkRideCancelScheduleSuccessAction | ParkRideCancelScheduleFailAction |
ParkRideSaveResetAction;

// Response state
export interface ParkRideResponseState {
  type?: string;
  loading?: boolean;
  error?: ErrorResponseModel;
  data?: ParkRideModel[];
}

export interface ParkRideMessageResponseState {
  type?: string;
  loading?: boolean;
  error?: ErrorResponseModel;
  data?: ParkRideResponseModel;
}