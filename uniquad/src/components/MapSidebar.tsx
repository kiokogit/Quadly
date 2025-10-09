"use client"

import { useState, useMemo } from 'react';

function Sidebar({ filteredFeatures, search, setSearch, handleZoomToParcel }) {
  const valuations = filteredFeatures.map(f => Number(f.properties.valuation_value));
  const minValue = Math.min(...valuations);
  const maxValue = Math.max(...valuations);

  const [maxValuation, setMaxValuation] = useState(maxValue);
  const [sortAsc, setSortAsc] = useState(true);

  const filteredAndSortedParcels = useMemo(() => {
    return filteredFeatures
      .filter(f => {
        const val = Number(f.properties.valuation_value);
        return (
          f.properties.parcel_number.toLowerCase().includes(search.toLowerCase()) &&
          val >= minValue &&
          val <= maxValuation
        );
      })
      .sort((a, b) =>
        sortAsc
          ? a.properties.valuation_value - b.properties.valuation_value
          : b.properties.valuation_value - a.properties.valuation_value
      );
  }, [filteredFeatures, search, maxValuation, sortAsc]);

  return (
    <div className="w-80 bg-white border-r border-gray-300 shadow-lg overflow-y-auto p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-1 text-gray-900 tracking-wide">
        Valuation map index
      </h2>
      <div className="mb-4 text-sm text-gray-600 italic">Registry: Nairobi</div>

      <div className="mb-5 p-3 rounded bg-gradient-to-r from-green-50 via-green-100 to-green-50 border border-green-300 shadow-inner">
        <div className="text-green-800 font-semibold text-base mb-1">Summary Valuation</div>
        <div className="text-gray-700 text-sm">
          Total Parcels: <span className="font-semibold">{filteredAndSortedParcels.length}</span>
          <br />
          Total Value:{' '}
          <span className="font-semibold">
            Ksh{' '}
            {filteredAndSortedParcels
              .reduce((acc, f) => acc + Number(f.properties.valuation_value), 0)
              .toLocaleString()}
          </span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search parcel..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      />

      {/* <div className="mb-4">
        <label className="block text-gray-700 mb-1 font-semibold">Filter by Max Value (Ksh)</label>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={maxValuation}
          onChange={(e) => setMaxValuation(Number(e.target.value))}
          className="w-full"
          step={10000}
        />
        <div className="text-sm text-gray-600 mt-1">
          Showing parcels valued up to Ksh {maxValuation.toLocaleString()}
        </div>
      </div> */}

      <div className="mb-4 flex items-center space-x-2 text-gray-700">
        <span className="font-semibold">Sort by Land Value:</span>
        <button
          onClick={() => setSortAsc(true)}
          className={`px-2 py-1 rounded border ${
            sortAsc ? 'bg-green-200 border-green-400' : 'border-gray-300'
          }`}
        >
          Asc
        </button>
        <button
          onClick={() => setSortAsc(false)}
          className={`px-2 py-1 rounded border ${
            !sortAsc ? 'bg-green-200 border-green-400' : 'border-gray-300'
          }`}
        >
          Desc
        </button>
      </div>

      <ul className="space-y-3 flex-1 overflow-y-auto">
        {filteredAndSortedParcels.map(f => {
          const { parcel_number, valuation_value, area, area_units } = f.properties;
          const clickable = !!f.geometry?.coordinates?.[0]?.[0]?.[0];

          return (
            <li
              key={parcel_number}
              className={`p-3 border rounded-lg cursor-pointer transition duration-200 ease-in-out ${
                clickable
                  ? 'bg-white hover:bg-green-50 border-green-200 hover:border-green-400 text-gray-900'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200'
              } shadow-sm`}
              onClick={() => clickable && handleZoomToParcel(f)}
            >
              <div className="font-semibold text-base truncate">{parcel_number}</div>
              <div className="text-green-700 font-semibold text-sm mt-1">
                Ksh {Number(valuation_value).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Area: {area} {area_units}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
