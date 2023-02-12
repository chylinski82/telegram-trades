import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { collection, query, onSnapshot, FieldPath } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import { store } from './store';
import { db } from '../firestore';
import './App.css';

import TradeTile from '../features/tradeTile/TradeTile';
import TradeSignals from '../features/tradeSignals/TradeSignals';
import Stats from '../features/stats/Stats';
import MyStats from '../features/stats/MyStats';
import SelectPeriod from '../features/header/selectPeriod/SelectPeriod';
import SearchBar from '../features/searchBar/SearchBar';
import SignIn from '../features/header/SignIn';
import BtcPrice from '../features/header/BtcPrice';
import Menu from '../features/header/Menu';
import { setMyTrades } from '../features/stats/statsSlice';
import { updateTradeTiles, updatePeriod } from '../features/tradeSignals/tradeSignalsSlice';



const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const ROUTES = {
    HOME: "/",
    STATS: "/Stats",
    MYSTATS: "/MyStats"
  };
  
  const fetchTiles = () => {
    const q = query(collection(db, 'trades'))
    onSnapshot(q, (snapshot) => {
      const tiles = snapshot.docs.map(doc => ({
        ...doc.data(),
      }));
      console.log('snapshot tiles', tiles)
      // Dispatch an action for adding Firestore tiles to the state
      dispatch(updateTradeTiles(tiles));
      // Dispatch an action for filtering the tiles for the default period
      dispatch(updatePeriod({ period: '6m' }));
    })
  }
  
  const fetchMyTrades = () => {       
    const q = query(collection(db, 'my trades')); 
    onSnapshot(q, (snapshot) => {
        const myTrades = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log('myTrades', myTrades);
        // Dispatch an action for adding Firestore myTrades to the state
        dispatch(setMyTrades(myTrades));
    })
  } 

  useEffect(() => {
          
    Promise.all([
      fetchTiles(),
      fetchMyTrades()
    ]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setWidth(window.innerWidth);
      }, 0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
  

  if (isLoading) { return (
    <div>Loading...</div>
  )};

  return (
    <Provider store={store}>
    <div className="App">
    <Router>
      <header>
        {width > 600 && 
        <Link to={ROUTES.HOME}>
          <p className="header-field">Home</p>
        </Link>}
        <BtcPrice />
        <SearchBar />     
        {width > 600 && <SignIn />}      
        {width > 768 && (
          <>
            <SelectPeriod />
            <Link to={ROUTES.STATS}>
              <p className='header-field'>Stats</p>
            </Link>
          </>
        )}
        {width > 992 && 
          <Link to={ROUTES.MYSTATS}>
            <p className="header-field">My Stats</p>
          </Link>}
        <Menu ROUTES={ROUTES}/>
      </header>
      <main>
        <Routes>
        <Route path={ROUTES.HOME}
               element={
                <>
                  <TradeTile />
                  <br /><br />
                  <TradeSignals />
                </>}>
        </Route>
        <Route path={ROUTES.STATS}
               element={<Stats />} >
        </Route>
        <Route path={ROUTES.MYSTATS}
               element={<MyStats />} >
        </Route>
        </Routes>
      </main>
    </Router>
    </div>
    </Provider>
  );
}

export default App;

