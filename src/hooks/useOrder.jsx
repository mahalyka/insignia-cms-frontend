import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { orderActions } from '../controllers/_actions'

export default function useOrder() {
  const [data, setData] = useState([])
  const dataStore = useSelector(state => state.orders);
  const dispatch = useDispatch()

  const initFetch = useCallback((param, type) => {
    if (type === 'list') {
      dispatch(orderActions.list(param));
    } else if (type === 'create') {
      dispatch(orderActions.create(param));
    } else if (type === 'update') {
      dispatch(orderActions.update(param));
    } else if (type === 'remove') {
      dispatch(orderActions.remove(param));
    } else if (type === 'select') {
      dispatch(orderActions.select(param));
    }
  }, [dispatch]);

  useEffect(() => {
    const respData = dataStore.items?.data ?? [];
    const DataLoaded = respData;
    setData(DataLoaded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStore])

  return [data, initFetch]
}
