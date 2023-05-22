import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { getParkData } from './features/parksSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.parkData);

  useEffect(() => {
    dispatch(getParkData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <HomePage />
    </>
  );
}
export default App;
