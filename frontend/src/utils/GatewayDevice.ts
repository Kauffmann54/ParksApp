import { Dispatch } from "react"
import { LocationActionTypes } from "../backend/constants/locationConstants"

export enum MessageType {
  Location = 'location'
}

export enum MessageSendType {
  ParkRidesHandler = 'parkRidesHandler',
  LocalStorageHandler = 'localStorageHandler'
}

declare global {
  interface Window {
    webkit: any;
  }
}

export const processMessage = (type: MessageType, value: any) => {
  return async(dispatch: Dispatch<any>) => {
    switch(type) {
      case MessageType.Location:
        dispatch({ type: LocationActionTypes.SET_LOCATION, payload: value })
    }
  }
}

export const sendMessageToNative = (type: MessageSendType, value: any) => {
  switch (type) {
    case MessageSendType.ParkRidesHandler:
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.parkRidesHandler.postMessage(value);
      }
      break;

    case MessageSendType.LocalStorageHandler:
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.localStorageHandler.postMessage(value);
      }
      break;

      default:
        break;
  }
}