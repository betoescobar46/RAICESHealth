import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Se mantienen las declaraciones de tipos para Leaflet.heat
declare module 'leaflet' {
  interface HeatLayerOptions {
    minOpacity?: number;
    maxZoom?: number;
    max?: number;
    radius?: number;
    blur?: number;
    gradient?: { [key: number]: string };
  }

  interface HeatLayer extends L.Layer {
    setLatLngs(latlngs: L.HeatLatLngTuple[] | L.LatLngExpression[]): this;
    addLatLng(latlng: L.HeatLatLngTuple | L.LatLngExpression): this;
    setOptions?(options: HeatLayerOptions): this;
  }

  interface HeatLatLngTuple extends LatLngTuple {
    2?: number; // Intensidad opcional
  }

  function heatLayer(latlngs: (L.HeatLatLngTuple | L.LatLngExpression)[], options?: HeatLayerOptions): HeatLayer;
}

interface HeatmapLayerProps {
  positions: (L.HeatLatLngTuple | L.LatLngExpression)[];
  options?: L.HeatLayerOptions;
}

/**
 * Componente funcional de React para la capa de calor.
 * Este enfoque es más simple y directo que usar createLayerComponent.
 */
const HeatmapLayer = ({ positions, options }: HeatmapLayerProps) => {
  const map = useMap();

  useEffect(() => {
    // Validar que las posiciones sean un array y tengan datos.
    if (!Array.isArray(positions) || positions.length === 0) {
      return;
    }

    // Crear la capa de calor con los datos y opciones.
    // Asegurarse de que L.heatLayer está disponible.
    if (typeof L.heatLayer !== 'function') {
      console.error("Leaflet.heat no está cargado correctamente.");
      return;
    }
    
    const heatLayer = L.heatLayer(positions, options);

    // Añadir la capa al mapa.
    map.addLayer(heatLayer);

    // Función de limpieza para eliminar la capa cuando el componente se desmonte o las props cambien.
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, positions, options]); // El efecto se vuelve a ejecutar si el mapa, las posiciones o las opciones cambian.

  // Este componente no renderiza ningún elemento DOM por sí mismo.
  return null;
};

export default HeatmapLayer;
