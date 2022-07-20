import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { packageActions } from '../controllers/_actions'

export default function usePackage() {
  const [data, setData] = useState([])
  const dataStore = useSelector(state => state.packages);
  const dispatch = useDispatch()

  const initFetch = useCallback((param, type) => {
    if (type === 'list') {
      dispatch(packageActions.list(param));
    } else if (type === 'create') {
      dispatch(packageActions.create(param));
    } else if (type === 'update') {
      dispatch(packageActions.update(param));
    } else if (type === 'remove') {
      dispatch(packageActions.remove(param));
    } else if (type === 'select') {
      dispatch(packageActions.select(param));
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
