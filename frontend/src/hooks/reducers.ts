import { combineReducers } from 'redux';
import { parkRideReducer, parkRideSavesReducer } from '../backend/reducers/parkRideReducers';
import { locationReducer } from '../backend/reducers/locationReducers';

const reducers = combineReducers({
    parkRide: parkRideReducer,
    locationUser: locationReducer,
    parkRideSaves: parkRideSavesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;