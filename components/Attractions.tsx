import React from 'react';
import { ATTRACTIONS } from '../constants';
import { MapPin, Calendar, Activity } from 'lucide-react';

export const Attractions: React.FC = () => {
  return (
    <section id="attractions" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-montreal-dark mb-4">
            Strategic Itinerary
          </h2>
          <p className="text-slate-600">
            Strategic travel planning based on trigonometric analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ATTRACTIONS.map((spot) => (
            <div key={spot.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={spot.image} 
                  alt={spot.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-montreal-blue flex items-center gap-1">
                  <Calendar size={12} />
                  Best: Month {spot.bestMonthIndex + 1}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-montreal-red" />
                  {spot.name}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-1">
                  {spot.description}
                </p>
                
                <div className="bg-montreal-ice/50 p-4 rounded-lg border border-montreal-blue/10">
                  <div className="flex items-center gap-2 text-montreal-blue font-bold text-xs uppercase mb-2">
                    <Activity size={14} />
                    Mathematical Reasoning
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {spot.mathRelation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};