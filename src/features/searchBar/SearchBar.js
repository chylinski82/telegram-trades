import React from 'react';
import { useDispatch } from 'react-redux';

import { updateSearchTerm } from '../tradeSignals/tradeSignalsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearchTermChange = event => {
    dispatch(updateSearchTerm({ searchTerm: event.target.value }));
  };

  return (
    <div>
      <input
      type="text"
      className="field"
      id="search-bar"
      placeholder="ALICE/BTC"
      defaultValue={''}
      onChange={handleSearchTermChange}
      />
    </div>
    
  );
};

export default SearchBar;