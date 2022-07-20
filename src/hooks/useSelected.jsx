import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hotelActions } from '../controllers/_actions'

export default function useHotels(dataType) {
  const [data, setData] = useState([])
  const selectedHotel = useSelector(state => state.selectedHotel);
  const selectedRoom = useSelector(state => state.selectedRoom);
  const dispatch = useDispatch()

  const initFetch = useCallback((param, type) => {
    if (type === 'hotel') {
      dispatch(hotelActions.getSelected(param));
    } else if (type === 'room') {
      dispatch(hotelActions.getSelectedRoom(param));
    } else if (type === 'empty-all') {
      dispatch(hotelActions.getSelectedRoom({}));
      dispatch(hotelActions.getSelected({}));
      dispatch(hotelActions.getSelectedGuest({}));
      dispatch(hotelActions.getSelectedBook({}));
    }
  }, [dispatch]);

  useEffect(() => {
    const DataHotelLoaded = selectedHotel?.items?.data ?? {};
    const DataRoomLoaded = selectedRoom?.items?.data ?? {};
    const DataLoaded = dataType === 'room'
      ? DataRoomLoaded
      : DataHotelLoaded;
    setData(DataLoaded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotel])

  return [data, initFetch]
}
