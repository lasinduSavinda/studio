"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Moon } from 'lucide-react';

type Cycle = { start: Date; end: Date };
type Note = { date: string; text: string };
type Symptoms = {
  date: string;
  mood: string;
  cramps: number;
  headaches: number;
  bloating: number;
  acne: number;
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue;
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item, (k, value) => {
        if ((k === 'start' || k === 'end') && value) return new Date(value);
        return value;
    });
}

export default function ExportPage() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [symptoms, setSymptoms] = useState<Symptoms[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setCycles(loadFromStorage('cycles', []));
    setNotes(loadFromStorage('notes', []));
    setSymptoms(loadFromStorage('symptoms', []));
    setIsReady(true);
  }, []);
  
  useEffect(() => {
    if (isReady) {
      setTimeout(() => window.print(), 500);
    }
  }, [isReady]);

  if (!isReady) {
    return <div className="p-8">Loading your data for export...</div>;
  }
  
  const allDates = [...new Set([
      ...cycles.flatMap(c => {
          const dates = [];
          for (let d = new Date(c.start); d <= new Date(c.end); d.setDate(d.getDate() + 1)) {
              dates.push(format(d, 'yyyy-MM-dd'));
          }
          return dates;
      }),
      ...notes.map(n => n.date),
      ...symptoms.map(s => s.date)
  ])].sort();

  const symptomLabels = ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'];

  return (
    <div className="p-8 font-sans">
        <style type="text/css" media="print">
        {`
            @page { size: auto; margin: 0.5in; }
            body { -webkit-print-color-adjust: exact; }
            .no-break { page-break-inside: avoid; }
        `}
        </style>
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-300 no-break">
            <div className="flex items-center gap-3">
            <Moon className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-800">LunaCycle Report</h1>
            </div>
            <p className="text-gray-600">Generated on: {format(new Date(), 'MMMM d, yyyy')}</p>
        </header>

        <section className="mb-8 no-break">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Cycle History Summary</h2>
            {cycles.length > 0 ? (
                 <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">Start Date</th>
                            <th className="p-2 border">End Date</th>
                            <th className="p-2 border">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle, index) => (
                            <tr key={index} className="border">
                                <td className="p-2 border">{format(cycle.start, 'MMM d, yyyy')}</td>
                                <td className="p-2 border">{format(cycle.end, 'MMM d, yyyy')}</td>
                                <td className="p-2 border">{(cycle.end.getTime() - cycle.start.getTime()) / (1000 * 3600 * 24) + 1} days</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>No cycle history recorded.</p>}
        </section>
        
        <section>
             <h2 className="text-2xl font-bold mb-4 text-gray-700">Daily Log</h2>
             <div className="space-y-6">
                {allDates.map((dateStr) => {
                    const date = new Date(dateStr + 'T12:00:00'); // Use noon to avoid timezone issues
                    const cycle = cycles.find(c => date >= c.start && date <= c.end);
                    const note = notes.find(n => n.date === dateStr);
                    const symptom = symptoms.find(s => s.date === dateStr);
                    if (!cycle && !note && !symptom) return null;

                    return (
                        <div key={dateStr} className="p-4 border border-gray-200 rounded-lg no-break">
                            <h3 className="font-bold text-lg mb-2 flex justify-between">
                                <span>{format(date, 'EEEE, MMMM d, yyyy')}</span>
                                {cycle && <span className="text-sm font-normal bg-pink-200 text-pink-800 px-2 py-0.5 rounded-full">Period Day</span>}
                            </h3>
                            {symptom && (
                                <div className="mb-2">
                                    <h4 className="font-semibold mb-1">Symptoms:</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-700">
                                        <li>Mood: {symptom.mood}</li>
                                        <li>Cramps: {symptomLabels[symptom.cramps]}</li>
                                        <li>Headaches: {symptomLabels[symptom.headaches]}</li>
                                        <li>Bloating: {symptomLabels[symptom.bloating]}</li>
                                        <li>Acne: {symptomLabels[symptom.acne]}</li>
                                    </ul>
                                </div>
                            )}
                            {note && (
                                <div>
                                    <h4 className="font-semibold mb-1">Note:</h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.text}</p>
                                </div>
                            )}
                        </div>
                    )
                })}
             </div>
        </section>
    </div>
  );
}
