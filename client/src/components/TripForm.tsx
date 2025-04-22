import React, { useState } from 'react';

interface TripFormProps {
  onSubmit: (trip: { destination: string; date: string }) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ destination, date });
    setDestination(''); // Clear input
    setDate(''); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label htmlFor='destination' className='block text-sm font-medium'>
          Destination
        </label>
        <input
          id='destination'
          name='destination'
          type='text'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className='mt-1 p-2 border border-gray-300 rounded w-full'
          required
        />
      </div>
      <div>
        <label htmlFor='date' className='block text-sm font-medium'>
          Date
        </label>
        <input
          id='date'
          name='date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='mt-1 p-2 border border-gray-300 rounded w-full'
          required
        />
      </div>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white p-2 rounded'
      >
        Submit Trip
      </button>
    </form>
  );
};

export default TripForm;
