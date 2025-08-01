"use client";

import { useEffect, useState, useRef } from 'react';
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
  const printTriggered = useRef(false);

  useEffect(() => {
    setCycles(loadFromStorage('cycles', []));
    setNotes(loadFromStorage('notes', []));
    setSymptoms(loadFromStorage('symptoms', []));
    setIsReady(true);
  }, []);
  
  useEffect(() => {
    if (isReady && !printTriggered.current) {
      printTriggered.current = true;
      // Timeout to ensure content is rendered before printing
      setTimeout(() => {
        window.print();
        window.close();
      }, 500);
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
  ])].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const symptomLabels = ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'];

  return (
    <div className="p-8 font-sans">
        <style type="text/css" media="print">
        {`
            @page { 
              size: A4 portrait; 
              margin: 1cm;
            }
            body { 
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact;
            }
            .no-break { page-break-inside: avoid; }
            .page-break { page-break-before: always; }
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
                            <th className="p-2 border border-gray-300">Start Date</th>
                            <th className="p-2 border border-gray-300">End Date</th>
                            <th className="p-2 border border-gray-300">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="p-2 border border-gray-300">{format(cycle.start, 'MMM d, yyyy')}</td>
                                <td className="p-2 border border-gray-300">{format(cycle.end, 'MMM d, yyyy')}</td>
                                <td className="p-2 border border-gray-300">{(cycle.end.getTime() - cycle.start.getTime()) / (1000 * 3600 * 24) + 1} days</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>No cycle history recorded.</p>}
        </section>
        
        <section className="page-break">
             <h2 className="text-2xl font-bold mb-4 text-gray-700">Daily Log</h2>
             <div className="space-y-4">
                {allDates.map((dateStr) => {
                    const date = new Date(dateStr + 'T12:00:00'); // Use noon to avoid timezone issues
                    const cycle = cycles.find(c => {
                      const start = startOfDay(c.start);
                      const end = startOfDay(c.end);
                      const checkDate = startOfDay(date);
                      return checkDate >= start && checkDate <= end;
                    });
                    const note = notes.find(n => n.date === dateStr);
                    const symptom = symptoms.find(s => s.date === dateStr);
                    if (!cycle && !note && !symptom) return null;

                    return (
                        <div key={dateStr} className="p-4 border border-gray-200 rounded-lg no-break bg-white">
                            <h3 className="font-bold text-lg mb-2 flex justify-between items-center">
                                <span>{format(date, 'EEEE, MMMM d, yyyy')}</span>
                                {cycle && <span className="text-sm font-normal bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">Period Day</span>}
                            </h3>
                            {symptom && (
                                <div className="mb-2">
                                    <h4 className="font-semibold mb-1 text-gray-800">Symptoms:</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-700 pl-4">
                                        <li><span className="font-medium">Mood:</span> {symptom.mood}</li>
                                        <li><span className="font-medium">Cramps:</span> {symptomLabels[symptom.cramps]}</li>
                                        <li><span className="font-medium">Headaches:</span> {symptomLabels[symptom.headaches]}</li>
                                        <li><span className="font-medium">Bloating:</span> {symptomLabels[symptom.bloating]}</li>
                                        <li><span className="font-medium">Acne:</span> {symptomLabels[symptom.acne]}</li>
                                    </ul>
                                </div>
                            )}
                            {note && (
                                <div>
                                    <h4 className="font-semibold mb-1 text-gray-800">Note:</h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap pl-4">{note.text}</p>
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
