import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../controllers/_actions'

export default function useUser() {
  const [data, setData] = useState([])
  const dataStore = useSelector(state => state.users);
  const dispatch = useDispatch()

  const initFetch = useCallback((param, type) => {
    if (type === 'list') {
      dispatch(userActions.list(param));
    } else if (type === 'create') {
      dispatch(userActions.create(param));
    } else if (type === 'update') {
      dispatch(userActions.update(param));
    } else if (type === 'remove') {
      dispatch(userActions.remove(param));
    } else if (type === 'select') {
      dispatch(userActions.select(param));
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
