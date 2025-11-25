import React, { useMemo, useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import HeatmapLayer from './HeatmapLayer';
import { Patient, Prestacion } from '../types';

// --- Componente: Modal para la lista de pacientes ---
const PatientListModal = ({ isOpen, onClose, patients }: { isOpen: boolean, onClose: () => void, patients: Patient[] }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Pacientes en la Zona ({patients.length})</h3>
                    <button onClick={onClose} className="text-black text-2xl">&times;</button>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                    {patients.map((p, index) => (
                        <li key={p.id || index} className="py-2 border-b last:border-b-0">
                            {`${p.nombre} ${p.apellidoPaterno || ''}`.trim()}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


// --- Componente de Tooltip y Eventos con Delegación de Eventos para el Click ---
const MapEventsAndTooltip: React.FC<{ 
    patients: Patient[],
    onShowMoreClick: (patients: Patient[]) => void 
}> = ({ patients, onShowMoreClick }) => {
    const map = useMap();
    const tooltipRef = useRef<L.Tooltip | null>(null);
    const nearbyPatientsRef = useRef<Patient[]>([]);

    useEffect(() => {
        if (!tooltipRef.current) {
            tooltipRef.current = L.tooltip({
                permanent: true,
                direction: "top",
                offset: [0, -10],
                opacity: 0.95,
                interactive: true,
            });
        }
        
        const mapContainer = map.getContainer();
        const handleClick = (e: MouseEvent) => {
            let target = e.target as HTMLElement;
            if (target.id === 'show-more-patients') {
                e.stopPropagation();
                onShowMoreClick(nearbyPatientsRef.current);
            }
        };

        mapContainer.addEventListener('click', handleClick);

        return () => {
            mapContainer.removeEventListener('click', handleClick);
            if (tooltipRef.current) {
                map.closeTooltip(tooltipRef.current);
                tooltipRef.current = null;
            }
        };
    }, [map, onShowMoreClick]);

    useMapEvents({
        click: (e) => {
            if (!tooltipRef.current) return;
            if ((e.originalEvent.target as HTMLElement).closest('.leaflet-tooltip')) {
                return;
            }

            const HEAT_RADIUS_PX = 30;
            const metrosPorPixel = 40075016 * Math.cos((e.latlng.lat * Math.PI) / 180) / Math.pow(2, map.getZoom() + 8);
            const searchRadiusMeters = HEAT_RADIUS_PX * metrosPorPixel;

            nearbyPatientsRef.current = patients.filter(p => 
                p.lat && p.lon && haversineDistance(e.latlng.lat, e.latlng.lng, p.lat, p.lon) < searchRadiusMeters
            );

            const nearbyPatientNames = nearbyPatientsRef.current.map(p => `${p.nombre} ${p.apellidoPaterno || ''}`.trim());

            if (nearbyPatientNames.length === 0) {
                 if (tooltipRef.current) map.closeTooltip(tooltipRef.current);
                 return;
            }
            
            const showMoreLink = nearbyPatientNames.length > 5 
                ? `<br/><span id="show-more-patients" style="cursor: pointer; color: #3b82f6; text-decoration: underline;">...y ${nearbyPatientNames.length - 5} más</span>` 
                : '';

            const content = `<strong>Pacientes en la zona (${nearbyPatientNames.length}):</strong><br/>${nearbyPatientNames.slice(0, 5).join('<br/>')}${showMoreLink}`;
            
            tooltipRef.current.setLatLng(e.latlng).setContent(content).openOn(map);
        }
    });

    return null;
};


function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const HeatmapGeograficoView: React.FC<{ prestaciones: Prestacion[], patients: Patient[] }> = ({ prestaciones, patients }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPatients, setModalPatients] = useState<Patient[]>([]);
    const mapRef = useRef<any>(null);

    const handleShowMoreClick = (patientsToShow: Patient[]) => {
        setModalPatients(patientsToShow);
        setIsModalOpen(true);
    };

    const filteredPatients = useMemo(() => {
        if (!prestaciones || prestaciones.length === 0) {
            return patients.filter(p => p.lat && p.lon);
        }
        const patientIdsInFilter = new Set(prestaciones.map(p => p.pacienteId));
        return patients.filter(p => patientIdsInFilter.has(p.id) && p.lat && p.lon);
    }, [patients, prestaciones]);

    const heatmapPoints = useMemo(() => {
        return filteredPatients.map(p => [p.lat!, p.lon!, 1]);
    }, [filteredPatients]);

    const heatmapOptions = useMemo(() => ({
        radius: 30, blur: 25, max: 1.0, gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' }
    }), []);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && isFullscreen && setIsFullscreen(false);
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    useEffect(() => {
        if (mapRef.current) setTimeout(() => mapRef.current.invalidateSize(), 200);
    }, [isFullscreen]);

    const fullscreenClasses = isFullscreen ? 'fixed inset-0 z-[1000] bg-white' : 'relative h-96 w-full rounded-lg overflow-hidden border';

    return (
        <div className={fullscreenClasses}>
            <PatientListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} patients={modalPatients} />
            <button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                className="absolute top-2 right-2 z-[1001] bg-white p-2 rounded-md shadow-lg opacity-100 hover:opacity-75 transition-opacity duration-300"
            >
                {isFullscreen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5v3a1 1 0 11-2 0V4zm2 8a1 1 0 011 1v3h3a1 1 0 110 2H4a1 1 0 01-1-1v-4a1 1 0 011-1zm10-8a1 1 0 011 1v3a1 1 0 11-2 0V5h-3a1 1 0 110-2h4zm-2 8a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h3v-3a1 1 0 011-1z" clipRule="evenodd" /></svg>
                )}
            </button>
            <MapContainer ref={mapRef} center={[-35.5, -71.6]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {heatmapPoints.length > 0 && <HeatmapLayer positions={heatmapPoints} options={heatmapOptions} />}
                <MapEventsAndTooltip patients={filteredPatients} onShowMoreClick={handleShowMoreClick} />
            </MapContainer>
        </div>
    );
};

export default HeatmapGeograficoView;
