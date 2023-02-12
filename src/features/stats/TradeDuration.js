import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Datetime from 'react-datetime';


import { setStartDate, setEndDate } from './statsSlice';

const TradeDuration = ({ trade }) => {
    const [newStartDate, setNewStartDate] = useState(new Date(trade.startDate));
    const [showPickers, setShowPickers] = useState(false);
    const [newEndDate, setNewEndDate] = useState(new Date(trade.endDate));
  
    const dispatch = useDispatch();
  
    const handleChangeDates = () => {
        if (newEndDate < newStartDate) {
            alert('End date cannot be before start date.');
            return;
        }
        // Dispatch setStartDate action
        if (newStartDate !== new Date(trade.startDate)) {
            dispatch(setStartDate({ id: trade.id, value: newStartDate.toISOString() }));
        }
    
        // Check if score is not 'in trade' before dispatching setEndDate action
        if (newEndDate !== new Date(trade.endDate) && trade.score !== 'in trade') {
            dispatch(setEndDate({ id: trade.id, value: newEndDate.toISOString() }));
        }
        setShowPickers(false);
      }
    
  
    return (
      <>
        <div className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
          {Math.ceil(trade.endDate ? ((new Date(trade.endDate).getTime() - new Date(trade.startDate).getTime()) / (1000 * 3600 * 24)) + 1 :
                                    (new Date().getTime() - new Date(trade.startDate).getTime()) / (1000 * 3600 * 24))}
          <button onClick={() => setShowPickers(!showPickers)}
                  className='button pink'>Edit</button>
        </div>
        {showPickers && (
          <>
            <Datetime value={newStartDate} 
                      timeFormat="H:mm" 
                      onChange={date => setNewStartDate(date)} />
            {trade.score !== 'in trade' && <Datetime value={newEndDate}
                                                     timeFormat="H:mm" 
                                                     onChange={date => setNewEndDate(date)} />}
            <button onClick={handleChangeDates} >Save</button>
            <button onClick={() => setShowPickers(false)}>Cancel</button>
          </>
        )}
      </>
    );
      
  }
  
  export default TradeDuration;
  