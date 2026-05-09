import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useLanguage } from '../contexts/LanguageContext';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function MapSection() {
  const { t } = useLanguage();

  if (!hasValidKey) {
    return (
      <div className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">{t('contact.title')}</h2>
            <div className="aspect-video bg-gray-200 rounded-3xl flex items-center justify-center p-8">
                <div className="max-w-md text-center">
                   <p className="text-sm font-medium mb-4 text-gray-600">Google Maps Integration requires an API Key</p>
                   <p className="text-xs text-gray-400 leading-relaxed">
                     Please provide a GOOGLE_MAPS_PLATFORM_KEY in the app settings to view the interactive map showing our location in beautiful Karaköy.
                   </p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold-600 font-display font-medium tracking-widest uppercase text-xs mb-4 block">
            Location
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('contact.title')}</h2>
        </div>
        
        <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{lat: 41.0229, lng: 28.9818}}
              defaultZoom={15}
              mapId="D0C0A7B0D1E2F3G4" // Placeholder ID
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{width: '100%', height: '100%'}}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <AdvancedMarker position={{lat: 41.0229, lng: 28.9818}}>
                <div className="bg-gold-900 text-white p-3 rounded-full border-2 border-white shadow-xl transform -translate-y-full mb-1">
                   <div className="text-[10px] font-display font-bold uppercase tracking-widest">LALEZAR</div>
                </div>
                <Pin background="#8c5221" glyphColor="#fff" borderColor="#fff" />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}
