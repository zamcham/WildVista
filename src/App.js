import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import { getParkData } from './features/parksSlice';
import wvlogo from './images/wvlogo.png';

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
    <Router>
      <nav>
        <div className="back-button">
          <span>Back</span>
        </div>
        <div className="branding">
          <Link to="/">Wild Vista</Link>
          <img src={wvlogo} alt="logo" className="logo" />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}
export default App;
