import React, { useEffect, useLayoutEffect, useState } from 'react'
import './ParkSelectedConfigureScreen.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Parks } from '../../backend';
import { getParkDetails, saveParkPriorities } from '../../backend/actions/parkActions';
import { ParkRideModel } from '../../backend/models/ParkRide/ParkRideResponseModel';
import HeaderPark from '../../components/Header/HeaderPark';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import ParkSelectedConfigureItem from './components/parkSelectedItem/parkSelectedConfigureItem';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import LoadingViewFull from '../../components/Loading/LoadingViewFull';

export default function ParkSelectedConfigureScreen() {
  const dispatch = useDispatch();
  const { parkId } = useParams();

  const [parkRides, setParkRides] = useState<ParkRideModel[]>([]);

  const parkRide = useTypedSelector(state => state.parkRide);
  const { data: parkRideData, loading } = parkRide;

  const locationUser = useTypedSelector(state => state.locationUser);
  const { data: userLocationData } = locationUser;

  useLayoutEffect(() => {
    if (parkId && userLocationData) {
      dispatch(getParkDetails(parkId as Parks, userLocationData));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, parkId]);

  useEffect(() => {
    if (parkRideData) {
        setParkRides(parkRideData);
    }
  }, [parkRideData]);

  const reorder = (list: ParkRideModel[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
        return;
    }

    const items = reorder(
        parkRides,
        result.source.index,
        result.destination.index
    );

    setParkRides(items);
    dispatch(saveParkPriorities(parkId as Parks, items));
  }

  return (
    <div>
      <HeaderPark title={parkId ? parkId.split(/(?=[A-Z])/).join(' ') : ''} hasArrowBack />
      <div className='park-selected-configure-content'>
        <div className='park-selected-configure-rides'>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                <Droppable droppableId='droppable' direction='vertical'>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                        className='park-selected-configure-container'
                        {...provided.droppableProps}
                        >
                        {parkRides && parkRides.map((park, index) => {
                            return (
                            <Draggable key={park.id} draggableId={park.id} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                    >
                                        <ParkSelectedConfigureItem key={park.id} park={park} parkId={parkId as Parks} />
                                    </div>
                                )}
                            </Draggable>
                            )
                        })}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
      </div>

      <LoadingViewFull show={loading || false} />
    </div>
  )
}
