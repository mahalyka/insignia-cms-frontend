import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { customerActions } from '../controllers/_actions'

export default function useCustomer() {
  const [data, setData] = useState([])
  const dataStore = useSelector(state => state.customers);
  const dispatch = useDispatch()

  const initFetch = useCallback((param, type) => {
    if (type === 'list') {
      dispatch(customerActions.list(param));
    } else if (type === 'create') {
      dispatch(customerActions.create(param));
    } else if (type === 'update') {
      dispatch(customerActions.update(param));
    } else if (type === 'remove') {
      dispatch(customerActions.remove(param));
    } else if (type === 'select') {
      dispatch(customerActions.select(param));
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
