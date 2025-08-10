
"use client";

import { useEffect, useState, useRef, useMemo } from 'react';
import { format, startOfDay, addDays, getDaysInMonth, startOfMonth, getDay, eachMonthOfInterval, startOfYear, endOfYear, isSameMonth } from 'date-fns';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        if ((k === 'start' || k === 'end' || k === 'lastPeriodStart') && value) return new Date(value);
        return value;
    });
}

function useCycleCalculations(cycles: Cycle[], userCycleLength: number | null) {
    const cycleLength = (() => {
        if (userCycleLength) return userCycleLength;
        if (cycles.length < 2) return 28;
        const lengths = cycles.slice(1).map((c, i) => (c.start.getTime() - cycles[i].start.getTime()) / (1000 * 3600 * 24));
        return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
    })();

    const menstruationDays = cycles.flatMap(c => {
        const dates = [];
        for (let d = startOfDay(new Date(c.start)); d <= startOfDay(new Date(c.end)); d = addDays(d, 1)) {
            dates.push(d);
        }
        return dates;
    });

    const allFertileDays: Date[] = [];
    const allOvulationDays: Date[] = [];
    const allPredictedPeriods: Date[] = [];
    const allLutealDays: Date[] = [];

    const lastCycle = cycles.length > 0 ? cycles[cycles.length - 1] : null;
    if (lastCycle) {
        for (let i = -6; i <= 6; i++) {
            const cycleStartDate = addDays(lastCycle.start, i * cycleLength);
            const overlapsWithLogged = cycles.some(c =>
                cycleStartDate >= addDays(c.start, -7) && cycleStartDate <= addDays(c.end, 7)
            );
            if (i <= 0 && overlapsWithLogged) continue;

            const ovulationDay = addDays(cycleStartDate, cycleLength - 14);
            const fertileStart = addDays(ovulationDay, -5);
            const fertileEnd = addDays(ovulationDay, 0);
            
            for (let d = fertileStart; d <= fertileEnd; d = addDays(d, 1)) allFertileDays.push(d);
            allOvulationDays.push(ovulationDay);

            const periodStart = cycleStartDate;
            const periodEnd = addDays(periodStart, 4);
            for (let d = periodStart; d <= periodEnd; d = addDays(d, 1)) allPredictedPeriods.push(d);
            
            const lutealStart = addDays(ovulationDay, 1);
            const lutealEnd = addDays(cycleStartDate, cycleLength -1);
            for (let d = lutealStart; d <= lutealEnd; d = addDays(d, 1)) allLutealDays.push(d);
        }
    }

    return { menstruationDays, fertileDays: allFertileDays, ovulationDays: allOvulationDays, predictedPeriod: allPredictedPeriods, lutealDays: allLutealDays };
}


const CalendarMonth = ({ month, cycles, notes, symptoms, cycleCalcs }: { 
    month: Date, 
    cycles: Cycle[], 
    notes: Note[], 
    symptoms: Symptoms[],
    cycleCalcs: ReturnType<typeof useCycleCalculations>
}) => {
    const { menstruationDays, fertileDays, ovulationDays, predictedPeriod, lutealDays } = cycleCalcs;
    const daysInMonth = getDaysInMonth(month);
    const firstDayOfMonth = getDay(startOfMonth(month));
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDayStyle = (day: Date) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        let style = 'bg-white';
        if (menstruationDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) style = 'bg-pink-300 text-pink-800';
        else if (predictedPeriod.some(d => format(d, 'yyyy-MM-dd') === dateStr)) style = 'bg-pink-200 text-pink-700';
        else if (ovulationDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) style = 'bg-purple-300 text-purple-800';
        else if (fertileDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) style = 'bg-yellow-200 text-yellow-800';
        else if (lutealDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) style = 'bg-green-200 text-green-800';
        return style;
    };
    
    const symptomLabels: {[key: string]: string} = {
      'happy': '😊', 'neutral': '😐', 'sad': '😢', 'anxious': '😟', 'irritable': '😠'
    };

    return (
        <div className="mb-8 no-break">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{format(month, 'MMMM yyyy')}</h3>
            <div className="grid grid-cols-7 border-t border-l border-gray-300">
                {weekDays.map(day => <div key={day} className="p-1 text-center font-semibold text-xs border-b border-r border-gray-300 bg-gray-100">{day}</div>)}
                {blanks.map(i => <div key={`blank-${i}`} className="border-b border-r border-gray-300"></div>)}
                {days.map(dayNumber => {
                    const date = new Date(month.getFullYear(), month.getMonth(), dayNumber);
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const note = notes.find(n => n.date === dateStr);
                    const symptom = symptoms.find(s => s.date === dateStr);
                    return (
                        <div key={dayNumber} className={cn("border-b border-r border-gray-300 p-1 min-h-[100px] flex flex-col", getDayStyle(date))}>
                            <div className="font-bold text-sm">{dayNumber}</div>
                            <div className="text-xs mt-1 flex-grow">
                                {symptom && (
                                    <div className="mb-1" title={`Mood: ${symptom.mood}`}>
                                        {symptomLabels[symptom.mood] || symptom.mood}
                                    </div>
                                )}
                                {note && <p className="line-clamp-3" title={note.text}>📝 Note</p>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default function ExportPage() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [symptoms, setSymptoms] = useState<Symptoms[]>([]);
  const [userCycleLength, setUserCycleLength] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const printTriggered = useRef(false);

  useEffect(() => {
    setCycles(loadFromStorage('cycles', []));
    setNotes(loadFromStorage('notes', []));
    setSymptoms(loadFromStorage('symptoms', []));
    setUserCycleLength(loadFromStorage('userCycleLength', null));
    setIsReady(true);
  }, []);
  
  useEffect(() => {
    if (isReady && !printTriggered.current) {
      printTriggered.current = true;
      setTimeout(() => {
        window.print();
        window.close();
      }, 1000); // Increased timeout to allow calendar rendering
    }
  }, [isReady]);

  const cycleCalcs = useCycleCalculations(cycles, userCycleLength);

  const monthsToRender = useMemo(() => {
    if (cycles.length === 0 && notes.length === 0 && symptoms.length === 0) return [];
    
    const allDatesWithData = [
        ...cycles.flatMap(c => [new Date(c.start), new Date(c.end)]),
        ...notes.map(n => new Date(n.date)),
        ...symptoms.map(s => new Date(s.date)),
    ].filter(d => !isNaN(d.getTime()));

    if (allDatesWithData.length === 0) return [];

    const firstDate = new Date(Math.min(...allDatesWithData.map(d => d.getTime())));
    const lastDate = new Date(Math.max(...allDatesWithData.map(d => d.getTime())));
    
    return eachMonthOfInterval({
        start: startOfYear(firstDate),
        end: endOfYear(lastDate)
    }).filter(month => {
        const allDatesInMonth = [
            ...cycles.flatMap(c => {
                const dates = [];
                for (let d = new Date(c.start); d <= new Date(c.end); d.setDate(d.getDate() + 1)) {
                    dates.push(startOfDay(new Date(d)));
                }
                return dates;
            }),
            ...notes.map(n => startOfDay(new Date(n.date))),
            ...symptoms.map(s => startOfDay(new Date(s.date)))
        ].filter(d => !isNaN(d.getTime()));

        return allDatesInMonth.some(d => isSameMonth(d, month));
    });
}, [cycles, notes, symptoms]);

  if (!isReady) {
    return <div className="p-8">Loading your data for export...</div>;
  }
  
  const legendItems = [
      { label: "Period", color: "bg-pink-300" },
      { label: "Predicted", color: "bg-pink-200" },
      { label: "Fertile", color: "bg-yellow-200" },
      { label: "Ovulation", color: "bg-purple-300" },
      { label: "Luteal", color: "bg-green-200" },
  ];

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
            .line-clamp-3 {
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }
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
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Legend</h2>
             <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {legendItems.map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div className={cn("w-4 h-4 rounded-full border border-gray-400", item.color)}></div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </section>

        <section className="page-break">
             <h2 className="text-2xl font-bold mb-4 text-gray-700">Calendar View</h2>
             {monthsToRender.length > 0 ? (
                monthsToRender.map(month => (
                    <CalendarMonth key={format(month, 'yyyy-MM')} month={month} cycles={cycles} notes={notes} symptoms={symptoms} cycleCalcs={cycleCalcs} />
                ))
             ) : (
                <p>No data available to display in calendar.</p>
             )}
        </section>
        
    </div>
  );
}
