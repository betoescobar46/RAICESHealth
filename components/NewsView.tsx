import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

interface NewsItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    source: string;
    date: string;
    pubDate?: string;
}

const NewsView: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                // Intentar cargar noticias desde Firestore
                const newsQuery = query(
                    collection(db, 'psychiatryNews'),
                    orderBy('pubDate', 'desc'),
                    limit(20)
                );

                const unsubscribe = onSnapshot(
                    newsQuery,
                    (snapshot) => {
                        const newsData = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        })) as NewsItem[];

                        if (newsData.length > 0) {
                            setNews(newsData);
                            setError(null);
                        } else {
                            // Mostrar noticias de ejemplo
                            setNews(getExampleNews());
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.warn('No se pudieron cargar noticias desde Firebase, mostrando contenido de ejemplo:', error);
                        // No mostrar error al usuario, simplemente usar datos de ejemplo
                        setNews(getExampleNews());
                        setError(null);
                        setLoading(false);
                    }
                );

                return () => unsubscribe();
            } catch (error) {
                console.warn('Error al inicializar noticias:', error);
                setNews(getExampleNews());
                setError(null);
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    const getExampleNews = (): NewsItem[] => [
        {
            id: '1',
            title: 'Nuevos avances en tratamiento de depresión resistente',
            summary: 'Estudios recientes muestran eficacia prometedora de terapias combinadas en pacientes con depresión mayor resistente al tratamiento.',
            url: 'https://www.medscape.com/psychiatry',
            source: 'Medscape Psychiatry',
            date: new Date().toLocaleDateString('es-CL', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        },
        {
            id: '2',
            title: 'Actualización en guías de manejo de trastorno bipolar',
            summary: 'Las nuevas directrices internacionales enfatizan el abordaje personalizado y la importancia del seguimiento a largo plazo.',
            url: 'https://www.medscape.com/psychiatry',
            source: 'Medscape Psychiatry',
            date: new Date().toLocaleDateString('es-CL', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        },
        {
            id: '3',
            title: 'Impacto del sueño en salud mental',
            summary: 'Investigación demuestra la relación bidireccional entre trastornos del sueño y condiciones psiquiátricas.',
            url: 'https://www.medscape.com/psychiatry',
            source: 'Medscape Psychiatry',
            date: new Date().toLocaleDateString('es-CL', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })
        }
    ];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? news.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === news.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
                <p className="mt-4 text-gray-600">Cargando noticias...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-600">
                <p className="text-lg font-semibold">Error al cargar noticias</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        );
    }

    const currentNews = news[currentIndex];

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Carrusel Medscape Psychiatry - 1/5 del contenedor */}
            <div className="h-1/5 relative bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                {news.length > 0 && (
                    <>
                        {/* Contenido de la noticia */}
                        <div className="h-full flex flex-col p-5">
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-zinc-200 text-zinc-700 text-xs font-semibold rounded-full">
                                            {currentNews.source}
                                        </span>
                                        <span className="text-xs text-gray-500">{currentNews.date}</span>
                                    </div>
                                    <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                                        {currentNews.title}
                                    </h2>
                                    <p className="text-sm text-gray-700 leading-tight line-clamp-2 mb-2">
                                        {currentNews.summary}
                                    </p>
                                </div>
                                <a
                                    href={currentNews.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-zinc-700 hover:text-zinc-900 font-semibold transition-colors w-fit text-xs"
                                >
                                    Leer más
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Botones de navegación */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white hover:bg-slate-100 rounded-full shadow-md transition-all duration-200 z-10"
                            aria-label="Noticia anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white hover:bg-slate-100 rounded-full shadow-md transition-all duration-200 z-10"
                            aria-label="Siguiente noticia"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Indicadores */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center items-center gap-1.5">
                            {news.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-300 rounded-full ${
                                        index === currentIndex
                                            ? 'w-6 h-1.5 bg-slate-700'
                                            : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'
                                    }`}
                                    aria-label={`Ir a noticia ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Espacio para otros carruseles */}
            <div className="flex-1 text-center text-gray-500 text-sm py-8">
                Otros carruseles serán añadidos aquí
            </div>
        </div>
    );
};

export default NewsView;
