import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter
} from 'recharts';
import { MONTH_DATA, TEMP_EQUATION, SUN_EQUATION } from '../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Explicitly find the data based on dataKey to ensure accuracy
    // 'val' is the actual data (Scatter)
    // 'modelVal' is the calculated data (Line)
    const actualItem = payload.find((p: any) => p.dataKey === 'val');
    const modelItem = payload.find((p: any) => p.dataKey === 'modelVal');

    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md text-sm">
        <p className="font-bold text-montreal-blue mb-1">{label}</p>
        <p>Actual: {actualItem ? Number(actualItem.value).toFixed(2) : '--'}</p>
        <p className="text-gray-500 text-xs">
          Model: {modelItem ? Number(modelItem.value).toFixed(2) : '--'}
        </p>
      </div>
    );
  }
  return null;
};

export const MathSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'temp' | 'sun'>('temp');

  const currentData = MONTH_DATA.map(d => {
    const x = d.monthIndex;
    let modelVal = 0;
    
    if (activeTab === 'temp') {
       // y = 15.5 cos(pi/6(x - 7)) + 5.75
       modelVal = 15.5 * Math.cos((Math.PI / 6) * (x - 7)) + 5.75;
    } else {
       // y = 3.5 sin(pi/6(x - 3)) + 12.2
       modelVal = 3.5 * Math.sin((Math.PI / 6) * (x - 3)) + 12.2;
    }

    return {
      x: d.monthIndex,
      name: d.month,
      val: activeTab === 'temp' ? d.temp : d.sunlight,
      modelVal: modelVal
    };
  });

  const currentEq = activeTab === 'temp' ? TEMP_EQUATION : SUN_EQUATION;

  return (
    <section id="math-analysis" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-montreal-dark mb-4">
            The Trigonometry of Travel
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Here are models of Montreal's climate using sinusoidal functions. 
            Select a dataset below to see the math in action.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('temp')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'temp' 
                ? 'bg-montreal-blue text-white shadow-lg' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Avg Temperature (°C)
          </button>
          <button
            onClick={() => setActiveTab('sun')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'sun' 
                ? 'bg-yellow-500 text-white shadow-lg' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Sunlight Hours
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Chart */}
          <div className="md:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={currentData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="x" 
                    type="number" 
                    domain={[1, 12]} 
                    tickFormatter={(tick) => MONTH_DATA[tick - 1]?.month || ''} 
                    tickCount={12}
                  />
                  <YAxis unit={activeTab === 'temp' ? '°C' : 'h'} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Scatter name="Actual Data" dataKey="val" fill={activeTab === 'temp' ? '#ED1B2F' : '#EAB308'} />
                  <Line 
                    type="monotone" 
                    dataKey="modelVal" 
                    stroke="#0F172A" 
                    strokeWidth={2} 
                    dot={false} 
                    name="Sine/Cos Model"
                    strokeDasharray="5 5"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              * Dashed line represents the fitted trigonometric curve
            </p>
          </div>

          {/* Equation Analysis */}
          <div className="bg-montreal-dark text-white p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-serif mb-4 text-montreal-ice">Mathematical Model</h3>
            
            <div className="bg-white/10 p-4 rounded-lg mb-6 backdrop-blur-sm">
              <p className="font-mono text-sm text-gray-300 mb-1">Equation:</p>
              <p className="font-mono text-lg md:text-xl font-bold text-white break-all">
                {currentEq.label}
              </p>
            </div>

            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Amplitude (A)</span>
                <span className="font-mono text-white">{currentEq.A}</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Period (2π/B)</span>
                <span className="font-mono text-white">12 Months</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Phase Shift (C)</span>
                <span className="font-mono text-white">{currentEq.C}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Vertical Shift (D)</span>
                <span className="font-mono text-white">{currentEq.D}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};