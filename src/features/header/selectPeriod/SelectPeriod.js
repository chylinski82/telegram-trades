import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePeriod } from '../../tradeSignals/tradeSignalsSlice';
import { SelectPeriodPresentation } from './SelectPeriodPresentation';

export const SelectPeriod = () => {
  const dispatch = useDispatch();
  const [isCustom, setIsCustom] = useState(false);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 16));
  const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 16));

  useEffect(() => {
    dispatch(updatePeriod({ period: '6m', startDate, endDate }));
  }, [dispatch, startDate, endDate]);

  const handlePeriodChange = (e) => {
    const period = e.target.value;
    if (period === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
    }
    dispatch(updatePeriod({ period, startDate, endDate }));
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handlePeriodSubmit = () => {
    dispatch(updatePeriod({ period: 'custom', startDate, endDate }));
  };

  return (
    <SelectPeriodPresentation
      isCustom={isCustom}
      startDate={startDate}
      endDate={endDate}
      handlePeriodChange={handlePeriodChange}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      handlePeriodSubmit={handlePeriodSubmit}
    />
  );
};

export default SelectPeriod;
