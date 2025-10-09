'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import proj4 from 'proj4';
import { KENYA } from '@/assets/kenya';
import { VALUATION } from '@/assets/valuation';
import Sidebar from './MapSidebar';

// --- Define projections ---
proj4.defs(
  'EPSG:21037',
  '+proj=utm +zone=37 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs'
);
const fromProjection = proj4('EPSG:21037');
const toProjection = proj4('EPSG:4326');

function transformCoords(coordinates: any): any {
  if (!coordinates) return coordinates;
  return coordinates.map((polygon: any) =>
    polygon.map((ring: any) =>
      ring.map(([x, y, z]: [number, number, number]) => {
        const [lon, lat] = proj4(fromProjection, toProjection, [x, y]);
        return [lon, lat];
      })
    )
  );
}

export default function ValuationIndexMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [search, setSearch] = useState('');

  // ✅ Convert valuation GeoJSON
  const val_features = useMemo(() => 
    VALUATION.map((ent, index) => {
      if (!ent.geom) return null;
      const transformedGeom = {
        ...ent.geom,
        coordinates: transformCoords(ent?.geom?.coordinates),
      };
      return {
        type: 'Feature',
        id: index,
        properties: {
          registry: ent.registry,
          parcel_number: ent.parcel_number,
          area: ent.area,
          valuation_value: Number(ent.valuation_value),
          area_units: ent.area_units,
        },
        geometry: transformedGeom,
      };
    }).filter(Boolean),
  [VALUATION]);

  const valuationGeoJSON = {
    type: 'FeatureCollection',
    features: val_features,
  };

  const filteredFeatures = useMemo(() => 
    valuationGeoJSON.features.filter((f: any) =>
      f.properties.parcel_number.toLowerCase().includes(search.toLowerCase())
    ), 
  [search, valuationGeoJSON.features]);

  useEffect(() => {
    if (mapRef.current) return;

    const firstFeature = valuationGeoJSON.features[0];
    let centerCoord = [36.8219, -1.2921];
    if (firstFeature?.geometry?.coordinates?.[0]?.[0]?.[0]) {
      centerCoord = firstFeature.geometry.coordinates[0][0][0];
    }

    const map = new maplibregl.Map({
      container: mapContainer.current!,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: centerCoord,
      zoom: 18,
    });
    mapRef.current = map;

    map.on('load', () => {
      map.addSource('kenya_admin', { type: 'geojson', data: KENYA });
      map.addLayer({
        id: 'kenya_admin_layer',
        type: 'line',
        source: 'kenya_admin',
        paint: { 'line-color': '#0a0dccff', 'line-width': 1 },
      });

      map.addSource('valuation_parcels', {
        type: 'geojson',
        data: valuationGeoJSON,
      });

      map.addLayer({
        id: 'valuation_fill',
        type: 'fill',
        source: 'valuation_parcels',
        paint: {
          'fill-color': [
            'case',
            ['<', ['get', 'valuation_value'], 2000000], '#e8f5e9',
            ['<', ['get', 'valuation_value'], 5000000], '#c8e6c9',
            ['<', ['get', 'valuation_value'], 10000000], '#a5d6a7',
            ['<', ['get', 'valuation_value'], 20000000], '#81c784',
            ['<', ['get', 'valuation_value'], 50000000], '#66bb6a',
            ['<', ['get', 'valuation_value'], 100000000], '#4caf50',
            '#2e7d32'
          ],
          'fill-opacity': 0.7,
        },
      });

      map.addLayer({
        id: 'valuation_borders',
        type: 'line',
        source: 'valuation_parcels',
        paint: { 'line-color': '#1b3f1cff', 'line-width': 1 },
      });

      map.addLayer({
        id: 'valuation_labels_combined',
        type: 'symbol',
        source: 'valuation_parcels',
        layout: {
          'text-field': [
            'format',
            ['get', 'parcel_number'],
            { 'font-scale': 1.0, 'text-font': ['literal', ['Open Sans Bold']] },
            '\n',
            'Value: ',
            { 'font-scale': 0.9 },
            ['get', 'valuation_value'],
            { 'font-scale': 0.9 },
            '\n',
            'Area: ',
            { 'font-scale': 0.9 },
            ['get', 'area'],
            { 'font-scale': 0.9 },
          ],
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-size': 10,
          'text-anchor': 'center',
          'text-justify': 'center',
        },
        paint: { 'text-color': '#000000' },
      });
    });

    return () => map.remove();
  }, []);

  // 🔍 Handle clicking sidebar item
  const handleZoomToParcel = (feature: any) => {
    if (!feature.geometry?.coordinates?.[0]?.[0]?.[0]) return;
    const coord = feature.geometry.coordinates[0][0][0];
    mapRef.current?.flyTo({ center: coord, zoom: 20});
  };

  return (
    <div className="flex w-full h-[100vh]">
      {/* 🧭 Sidebar */}
        {/* <div className="w-80 bg-white border-r border-gray-300 shadow-lg overflow-y-auto p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-1 text-gray-900 tracking-wide">
            Valuation map index
        </h2>
        <div className="mb-4 text-sm text-gray-600 italic">
            Registry: Nairobi
        </div>

        
        <div className="mb-5 p-3 rounded bg-gradient-to-r from-green-50 via-green-100 to-green-50 border border-green-300 shadow-inner">
            <div className="text-green-800 font-semibold text-base mb-1">Summary Valuation</div>
            <div className="text-gray-700 text-sm">
            Total Parcels: <span className="font-semibold">{filteredFeatures.length}</span><br />
            Total Value: <span className="font-semibold">Ksh {filteredFeatures.reduce((acc, f) => acc + Number(f.properties.valuation_value), 0).toLocaleString()}</span>
            </div>
        </div>

        <input
            type="text"
            placeholder="Search parcel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-green-600 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
            />

        <ul className="space-y-3 flex-1 overflow-y-auto">
            {filteredFeatures.map((f: any) => {
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
        </div> */}

        <Sidebar filteredFeatures={filteredFeatures} search={search} setSearch={setSearch} handleZoomToParcel={handleZoomToParcel}/>


      {/* 🗺️ Map */}
      <div ref={mapContainer} className="flex-1 h-full" />
    </div>
  );
}
