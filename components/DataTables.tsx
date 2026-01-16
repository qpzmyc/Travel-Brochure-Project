import React from 'react';
import { MONTH_DATA, SOURCES } from '../constants';

export const DataTables: React.FC = () => {
  return (
    <section id="data" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-serif font-bold text-montreal-dark mb-8 text-center">
          Project Data and Documentation
        </h2>

        <div className="overflow-x-auto shadow-md rounded-lg border border-slate-200 mb-12">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3">Month (x)</th>
                <th scope="col" className="px-6 py-3 text-right">Avg Temp (°C)</th>
                <th scope="col" className="px-6 py-3 text-right">Sunlight (Hours)</th>
              </tr>
            </thead>
            <tbody>
              {MONTH_DATA.map((row, index) => (
                <tr key={row.month} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {index + 1} - {row.month}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-montreal-red">
                    {row.temp}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-yellow-600">
                    {row.sunlight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Sources Cited</h3>
          <ul className="space-y-2">
            {SOURCES.map((source) => (
              <li key={source.name}>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-montreal-blue hover:underline flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-montreal-red rounded-full"></span>
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};