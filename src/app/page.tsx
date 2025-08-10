"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays, format, isWithinInterval, startOfDay, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { symptomAnalyzer, type SymptomAnalyzerInput } from '@/ai/flows/symptom-analyzer';
import { Bell, Droplets, FileDown, HeartPulse, Moon, Sparkles, Stethoscope, StickyNote, Trash2, Minus, Plus, CalendarIcon, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Link from 'next/link';


type Cycle = { start: Date; end: Date };
type Note = { date: string; text: string };
type Symptoms = z.infer<typeof symptomSchema> & { date: string; analysis?: string };

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
            setStoredValue(JSON.parse(item, (k, value) => {
                if ((k === 'start' || k === 'end' || k === 'lastPeriodStart') && value) return new Date(value);
                return value;
            }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, isMounted]);

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
       if (isMounted) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const symptomSchema = z.object({
  mood: z.string({ required_error: "Please select your mood." }),
  cramps: z.number().min(0).max(4),
  headaches: z.number().min(0).max(4),
  bloating: z.number().min(0).max(4),
  acne: z.number().min(0).max(4),
});

const Header = () => (
    <header className="flex items-center justify-between p-4 border-b bg-card">
        <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
                <div className="p-2 rounded-full bg-primary/20">
                    <Moon className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold font-headline text-foreground">Free Period Tracker Online</h1>
            </div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/blog">Blog</Link>
            </Button>
        </nav>
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <nav className="flex flex-col gap-4 mt-8">
                         <Button variant="ghost" asChild>
                            <Link href="/">Home</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/about">About</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/privacy">Privacy</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/contact">Contact</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/blog">Blog</Link>
                        </Button>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </header>
);


const OnboardingWizard = ({ onComplete }: { onComplete: (cycles: Cycle[], cycleLength: number) => void }) => {
    
    const [lastPeriodStart, setLastPeriodStart] = useState<Date>(startOfDay(new Date()));
    const [periodLength, setPeriodLength] = useState(5);
    const [cycleLength, setCycleLength] = useState(28);

    const handleSubmit = () => {
        const startDate = startOfDay(lastPeriodStart);
        const endDate = addDays(startDate, periodLength - 1);
        const firstCycle: Cycle = { start: startDate, end: endDate };
        onComplete([firstCycle], cycleLength);
    };

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <Card className="w-full max-w-2xl p-6 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <Label className="text-base font-normal text-muted-foreground">Date of your last period?</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant="ghost" className="text-2xl text-primary font-semibold">
                                    <CalendarIcon className="mr-2 h-6 w-6" />
                                    {format(lastPeriodStart, "MMM do")}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={lastPeriodStart}
                                        onSelect={(d) => d && setLastPeriodStart(d)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                         <div className="flex flex-col items-center gap-3">
                            <Label className="text-base font-normal text-muted-foreground">How long did it last?</Label>
                            <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" onClick={() => setPeriodLength(v => Math.max(1, v - 1))}>
                                    <Minus className="h-6 w-6"/>
                                </Button>
                                <span className="text-2xl text-primary font-semibold">{periodLength} Days</span>
                                <Button variant="ghost" size="icon" onClick={() => setPeriodLength(v => v + 1)}>
                                    <Plus className="h-6 w-6"/>
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <Label className="text-base font-normal text-muted-foreground">What's your usual cycle length?</Label>
                             <div className="flex items-center gap-4">
                                <Button variant="ghost" size="icon" onClick={() => setCycleLength(v => Math.max(15, v - 1))}>
                                    <Minus className="h-6 w-6"/>
                                </Button>
                                <span className="text-2xl text-primary font-semibold">{cycleLength} Days</span>
                                <Button variant="ghost" size="icon" onClick={() => setCycleLength(v => Math.min(60, v + 1))}>
                                    <Plus className="h-6 w-6"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <Button onClick={handleSubmit} size="lg" className="text-lg px-10 py-6">Track Now</Button>
                    </div>
                </Card>
            </main>
        </div>
    );
};

const TrackerView = ({ 
    menstruationDays,
    fertileDays,
    ovulationDays,
    lutealDays,
    predictedPeriod,
    selectedDay,
    onSelectDay
 } : {
    menstruationDays: Date[],
    fertileDays: Date[],
    ovulationDays: Date[],
    lutealDays: Date[],
    predictedPeriod: Date[],
    selectedDay?: Date,
    onSelectDay: (day: Date | undefined) => void
}) => {
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDay || new Date()));

    const monthsToDisplay = useMemo(() => {
        return [subMonths(currentMonth, 1), currentMonth, addMonths(currentMonth, 1)];
    }, [currentMonth]);
    
    const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

    const getDayProps = (day: Date) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const props: { className: string, isSelected: boolean, isToday: boolean } = {
            className: 'w-8 h-8 flex items-center justify-center rounded-full',
            isSelected: !!selectedDay && format(selectedDay, 'yyyy-MM-dd') === dateStr,
            isToday: format(new Date(), 'yyyy-MM-dd') === dateStr,
        };

        if (menstruationDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) props.className = cn(props.className, 'bg-[#FF75A6] text-white');
        else if (predictedPeriod.some(d => format(d, 'yyyy-MM-dd') === dateStr)) props.className = cn(props.className, 'bg-[#FFC0D3] text-[#FF75A6]');
        else if (ovulationDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) props.className = cn(props.className, 'bg-[#A694FF] text-white');
        else if (fertileDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) props.className = cn(props.className, 'bg-[#FFE699] text-[#FFA900]');
        else if (lutealDays.some(d => format(d, 'yyyy-MM-dd') === dateStr)) props.className = cn(props.className, 'bg-[#82E0AA] text-white');

        if (props.isSelected) props.className = cn(props.className, 'ring-2 ring-offset-2 ring-primary');
        if (props.isToday && !props.className.includes('bg-')) props.className = cn(props.className, 'bg-gray-200');

        return props;
    };


    const renderMonth = (month: Date) => {
        const daysInMonth = getDaysInMonth(month);
        const firstDayOfMonth = getDay(startOfMonth(month));
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
        return (
            <div key={format(month, 'yyyy-MM')} className="flex-1">
                <div className="flex justify-between items-center bg-primary/20 text-primary-foreground p-2 rounded-t-md">
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/30" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h3 className="font-bold">{format(month, 'MMMM yyyy')}</h3>
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-primary/30" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
                <div className="grid grid-cols-7 gap-y-1 p-2 bg-gray-100 text-center text-sm">
                    {weekDays.map((day, i) => <div key={`${day}-${i}`} className="font-medium text-gray-600">{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-y-2 p-2 bg-white rounded-b-md shadow">
                    {blanks.map(i => <div key={`blank-${i}`}></div>)}
                    {days.map(day => {
                        const date = new Date(month.getFullYear(), month.getMonth(), day);
                        const { className, isSelected } = getDayProps(date);
                        return (
                            <button key={day} onClick={() => onSelectDay(date)} className={className}>
                                {day}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    };

    const legendItems = [
      { label: "Period", color: "bg-[#FF75A6]" },
      { label: "Predicted", color: "bg-[#FFC0D3]" },
      { label: "Fertile", color: "bg-[#FFE699]" },
      { label: "Ovulation", color: "bg-[#A694FF]" },
      { label: "Luteal", color: "bg-[#82E0AA]" },
    ];

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <CardTitle>Your Tracker</CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                        <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 3))} className="text-xs px-2 h-8">
                            <ChevronLeft className="mr-1 h-4 w-4" /> Prev 3
                        </Button>
                        <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 3))} className="text-xs px-2 h-8">
                             Next 3 <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col lg:flex-row gap-4 p-2 md:p-4">
                {monthsToDisplay.map(month => renderMonth(month))}
            </CardContent>
             <CardFooter className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground p-4 bg-gray-50 rounded-b-md">
                {legendItems.map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}

export default function Home() {
  const [cycles, setCycles] = useLocalStorage<Cycle[]>('cycles', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [symptoms, setSymptoms] = useLocalStorage<Symptoms[]>('symptoms', []);
  const [reminders, setReminders] = useLocalStorage('reminders', { period: true, ovulation: true });
  const [userCycleLength, setUserCycleLength] = useLocalStorage<number | null>('userCycleLength', null);
  
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(startOfDay(new Date()));
  const [isClient, setIsClient] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cycleLength = useMemo(() => {
    if (userCycleLength) return userCycleLength;
    if (cycles.length < 2) return 28;
    const lengths = cycles.slice(1).map((c, i) => (c.start.getTime() - cycles[i].start.getTime()) / (1000 * 3600 * 24));
    return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
  }, [cycles, userCycleLength]);

  const { menstruationDays, fertileDays, ovulationDays, predictedPeriod, lutealDays } = useMemo(() => {
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
        // Generate predictions for -6 to +6 months from last cycle start
        for (let i = -6; i <= 6; i++) {
            const cycleStartDate = addDays(lastCycle.start, i * cycleLength);

            // Skip if this predicted cycle overlaps with a logged one
            const overlapsWithLogged = cycles.some(c =>
                cycleStartDate >= addDays(c.start, -7) && cycleStartDate <= addDays(c.end, 7)
            );
            if (i <= 0 && overlapsWithLogged) continue;


            const ovulationDay = addDays(cycleStartDate, cycleLength - 14);
            const fertileStart = addDays(ovulationDay, -5);
            const fertileEnd = addDays(ovulationDay, 0);
            
            for (let d = fertileStart; d <= fertileEnd; d = addDays(d, 1)) {
                allFertileDays.push(d);
            }
            
            allOvulationDays.push(ovulationDay);

            const periodStart = cycleStartDate;
            const periodEnd = addDays(periodStart, 4); // Assuming 5 day period
            for (let d = periodStart; d <= periodEnd; d = addDays(d, 1)) {
                allPredictedPeriods.push(d);
            }
            
            const lutealStart = addDays(ovulationDay, 1);
            const lutealEnd = addDays(cycleStartDate, cycleLength -1);
            for (let d = lutealStart; d <= lutealEnd; d = addDays(d, 1)) {
                 allLutealDays.push(d);
            }
        }
    }

    return { 
        menstruationDays, 
        fertileDays: allFertileDays, 
        ovulationDays: allOvulationDays,
        predictedPeriod: allPredictedPeriods, 
        lutealDays: allLutealDays
    };
}, [cycles, cycleLength]);

  const handleAddPeriod = () => {
    if (selectedDay) {
      const startDate = startOfDay(selectedDay);
      // Assume a 5-day period for simplicity
      const endDate = addDays(startDate, 4);
      const newCycles = [...cycles, { start: startDate, end: endDate }];
      newCycles.sort((a, b) => a.start.getTime() - b.start.getTime());
      setCycles(newCycles);
      toast({ title: "Success", description: "Period dates saved." });
    }
  };

  const selectedNote = selectedDay ? notes.find(n => n.date === format(selectedDay, 'yyyy-MM-dd'))?.text || '' : '';
  const handleNoteChange = (text: string) => {
    if (!selectedDay) return;
    const dateStr = format(selectedDay, 'yyyy-MM-dd');
    const otherNotes = notes.filter(n => n.date !== dateStr);
    if (text) {
      setNotes([...otherNotes, { date: dateStr, text }]);
    } else {
      setNotes(otherNotes);
    }
  };

  const handleClearAllData = () => {
    setCycles([]);
    setNotes([]);
    setSymptoms([]);
    setReminders({ period: true, ovulation: true });
    setUserCycleLength(null);
    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.location.reload();
    }
    toast({ title: "Data Cleared", description: "All your data has been removed." });
  };


  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const symptomForm = useForm<z.infer<typeof symptomSchema>>({
    resolver: zodResolver(symptomSchema),
    defaultValues: { mood: "neutral", cramps: 0, headaches: 0, bloating: 0, acne: 0 },
  });

  useEffect(() => {
    if (!selectedDay) return;
    const dateStr = format(selectedDay, 'yyyy-MM-dd');
    const daySymptoms = symptoms.find(s => s.date === dateStr);
    if (daySymptoms) {
      symptomForm.reset(daySymptoms);
      setAiSuggestion(daySymptoms.analysis || null);
    } else {
      symptomForm.reset({ mood: "neutral", cramps: 0, headaches: 0, bloating: 0, acne: 0 });
      setAiSuggestion(null);
    }
  }, [selectedDay, symptoms]);

  async function onSymptomSubmit(values: z.infer<typeof symptomSchema>) {
    if (!selectedDay) return;
    const dateStr = format(selectedDay, 'yyyy-MM-dd');
    const otherSymptoms = symptoms.filter(s => s.date !== dateStr);
    
    setIsAnalyzing(true);
    setAiSuggestion(null);
    try {
      const input: SymptomAnalyzerInput = {
        mood: values.mood,
        cramps: ['none', 'mild', 'moderate', 'severe', 'very severe'][values.cramps],
        headaches: ['none', 'mild', 'moderate', 'severe', 'very severe'][values.headaches],
        bloating: ['none', 'mild', 'moderate', 'severe', 'very severe'][values.bloating],
        acne: ['none', 'mild', 'moderate', 'severe', 'very severe'][values.acne],
      };
      const result = await symptomAnalyzer(input);
      setAiSuggestion(result.suggestions);
      setSymptoms([...otherSymptoms, { date: dateStr, ...values, analysis: result.suggestions }]);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "AI Analysis Failed", description: "Could not get suggestions." });
      setSymptoms([...otherSymptoms, { date: dateStr, ...values, analysis: undefined }]);
    } finally {
      setIsAnalyzing(false);
    }
    toast({ title: "Success", description: `Symptoms for ${format(selectedDay, 'MMM d')} saved.`});
  }
  
  const moodOptions = [
    { value: 'happy', label: '😊 Happy' }, { value: 'neutral', label: '😐 Neutral' },
    { value: 'sad', label: '😢 Sad' }, { value: 'anxious', label: '😟 Anxious' }, { value: 'irritable', label: '😠 Irritable' },
  ];
  const sliderLabels = ['None', 'Mild', 'Moderate', 'Severe', 'Very Severe'];

  if (!isClient) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div>Loading...</div>
        </main>
      </div>
    );
  }
  
  if (isClient && cycles.length === 0) {
    return <OnboardingWizard onComplete={(newCycles, newCycleLength) => {
        setCycles(newCycles);
        setUserCycleLength(newCycleLength);
    }} />;
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto p-2 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <TrackerView 
                menstruationDays={menstruationDays}
                fertileDays={fertileDays}
                ovulationDays={ovulationDays}
                lutealDays={lutealDays}
                predictedPeriod={predictedPeriod}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
            />
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Log Your Period</CardTitle>
                    <CardDescription>Select a start date on the calendar and click the button to log your period.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={handleAddPeriod} disabled={!selectedDay} className="flex-1">Log Period Start</Button>
                    <Button variant="outline" onClick={() => window.open('/export', '_blank')} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                        <FileDown className="h-4 w-4 mr-2" />
                        Download PDF
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all your cycle, symptom, and note data from this browser.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleClearAllData}>Yes, delete everything</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
             </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Stethoscope className="w-6 h-6 text-primary"/>Symptom Tracker</CardTitle>
                <CardDescription>For {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'today'}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...symptomForm}>
                  <form onSubmit={symptomForm.handleSubmit(onSymptomSubmit)} className="space-y-6">
                    <FormField control={symptomForm.control} name="mood" render={({ field }) => (
                      <FormItem className="space-y-3"><FormLabel>Mood</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-wrap gap-2">
                            {moodOptions.map(opt => (
                              <FormItem key={opt.value} className="flex items-center">
                                <FormControl>
                                  <RadioGroupItem value={opt.value} id={opt.value} className="sr-only" />
                                </FormControl>
                                <Label htmlFor={opt.value} className="px-3 py-1.5 border rounded-full cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors text-xs" data-state={field.value === opt.value ? 'checked' : 'unchecked'}>
                                  {opt.label}
                                </Label>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl><FormMessage /></FormItem>
                      )} />
                    
                    {['cramps', 'headaches', 'bloating', 'acne'].map(symptomName => (
                      <FormField key={symptomName} control={symptomForm.control} name={symptomName as 'cramps'} render={({ field }) => (
                        <FormItem><FormLabel className="capitalize flex justify-between"><span>{symptomName}</span> <span className="text-muted-foreground">{sliderLabels[field.value]}</span></FormLabel>
                          <FormControl><Slider onValueChange={(v) => field.onChange(v[0])} value={[field.value]} max={4} step={1} /></FormControl>
                        </FormItem>
                      )} />
                    ))}
                    <Button type="submit" disabled={isAnalyzing}>{isAnalyzing ? 'Analyzing...' : 'Save & Analyze Symptoms'}</Button>
                  </form>
                </Form>
                {aiSuggestion && (
                  <Card className="mt-4 bg-primary/10 border-primary/20"><CardHeader><CardTitle className="text-base text-primary-foreground">AI Suggestions</CardTitle></CardHeader><CardContent><p className="text-sm">{aiSuggestion}</p></CardContent></Card>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg"><CardHeader><CardTitle className="flex items-center gap-2"><StickyNote className="w-6 h-6 text-primary"/>Daily Note</CardTitle><CardDescription>For {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'today'}</CardDescription></CardHeader><CardContent><Textarea placeholder="How are you feeling today?" value={selectedNote} onChange={(e) => handleNoteChange(e.target.value)} className="min-h-[100px]"/></CardContent></Card>
            
            <Card className="shadow-lg"><CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-6 h-6 text-primary"/>Reminders</CardTitle><CardDescription>Get notified about your cycle.</CardDescription></CardHeader><CardContent className="space-y-4">
                <div className="flex items-center justify-between"><Label htmlFor="period-reminder" className="flex items-center gap-2"><Droplets className="w-4 h-4"/> Period Start</Label><Switch id="period-reminder" checked={reminders.period} onCheckedChange={(c) => setReminders({...reminders, period: c})} /></div>
                <div className="flex items-center justify-between"><Label htmlFor="ovulation-reminder" className="flex items-center gap-2"><Sparkles className="w-4 h-4"/> Ovulation Day</Label><Switch id="ovulation-reminder" checked={reminders.ovulation} onCheckedChange={(c) => setReminders({...reminders, ovulation: c})} /></div>
              </CardContent></Card>
          </div>
        </div>
      </main>
    </div>
  );
}
