
"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays, format, isWithinInterval, startOfDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";
import { symptomAnalyzer, type SymptomAnalyzerInput } from '@/ai/flows/symptom-analyzer';
import { Bell, Droplets, FileDown, HeartPulse, Moon, Sparkles, Stethoscope, StickyNote, Trash2 } from 'lucide-react';
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

type Cycle = { start: Date; end: Date };
type Note = { date: string; text: string };
type Symptoms = z.infer<typeof symptomSchema> & { date: string };

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
                if ((k === 'start' || k === 'end') && value) return new Date(value);
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
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-primary/20">
        <Moon className="w-6 h-6 text-primary" />
      </div>
      <h1 className="text-2xl font-bold font-headline text-foreground">LunaCycle</h1>
    </div>
    <div className="flex items-center gap-2">
    </div>
  </header>
);

export default function Home() {
  const [cycles, setCycles] = useLocalStorage<Cycle[]>('cycles', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [symptoms, setSymptoms] = useLocalStorage<Symptoms[]>('symptoms', []);
  const [reminders, setReminders] = useLocalStorage('reminders', { period: true, ovulation: true });

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(startOfDay(new Date()));
  const [isClient, setIsClient] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cycleLength = useMemo(() => {
    if (cycles.length < 2) return 28;
    const lengths = cycles.slice(1).map((c, i) => (c.start.getTime() - cycles[i].start.getTime()) / (1000 * 3600 * 24));
    return Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
  }, [cycles]);

  const { menstruationDays, fertileDays, ovulationDay, predictedPeriod } = useMemo(() => {
    const menstruationDays = cycles.flatMap(c => {
      const dates = [];
      for (let d = startOfDay(c.start); d <= startOfDay(c.end); d = addDays(d, 1)) {
        dates.push(d);
      }
      return dates;
    });

    let fertileDays: Date[] = [];
    let ovulationDay: Date | undefined;
    let predictedPeriod: Date[] = [];

    const lastCycle = cycles.length > 0 ? cycles[cycles.length - 1] : undefined;
    if (lastCycle) {
      const nextCycleStart = addDays(lastCycle.start, cycleLength);
      ovulationDay = addDays(nextCycleStart, -14);
      fertileDays = Array.from({ length: 6 }, (_, i) => addDays(ovulationDay!, i - 4));
      predictedPeriod = Array.from({ length: 5 }, (_, i) => addDays(nextCycleStart, i));
    }

    return { menstruationDays, fertileDays, ovulationDay, predictedPeriod };
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
    if (typeof window !== "undefined") {
      window.localStorage.removeItem('cycles');
      window.localStorage.removeItem('notes');
      window.localStorage.removeItem('symptoms');
      window.localStorage.removeItem('reminders');
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
    } else {
      symptomForm.reset({ mood: "neutral", cramps: 0, headaches: 0, bloating: 0, acne: 0 });
    }
    setAiSuggestion(null);
  }, [selectedDay, symptoms]);

  async function onSymptomSubmit(values: z.infer<typeof symptomSchema>) {
    if (!selectedDay) return;
    const dateStr = format(selectedDay, 'yyyy-MM-dd');
    const otherSymptoms = symptoms.filter(s => s.date !== dateStr);
    setSymptoms([...otherSymptoms, { date: dateStr, ...values }]);
    
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
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "AI Analysis Failed", description: "Could not get suggestions." });
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

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-1 md:p-2 flex flex-col lg:flex-row gap-4">
                <Calendar
                  mode="single"
                  selected={selectedDay}
                  onSelect={setSelectedDay}
                  defaultMonth={selectedDay}
                  modifiers={{
                    menstruation: menstruationDays,
                    fertile: fertileDays,
                    ovulation: ovulationDay ? [ovulationDay] : [],
                    predicted: predictedPeriod,
                  }}
                  modifiersClassNames={{
                    menstruation: 'bg-accent/80 text-accent-foreground',
                    fertile: 'bg-primary/50 text-primary-foreground',
                    ovulation: 'bg-primary text-primary-foreground rounded-full',
                    predicted: 'bg-accent/50 opacity-70',
                    selected: 'border-2 border-primary rounded-md',
                  }}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-4 p-4 border-t lg:border-t-0 lg:border-l w-full lg:w-64 flex-shrink-0">
                    <h3 className="font-bold font-headline">Add Period</h3>
                    <p className="text-sm text-muted-foreground">Select a start date on the calendar.</p>
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleAddPeriod} disabled={!selectedDay}>Log Period Start</Button>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.open('/export', '_blank')} className="flex-1">
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
                      </div>
                    </div>
                    <Separator />
                    <h3 className="font-bold font-headline">Legend</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-accent/80"></div> Period</div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-accent/50 opacity-70"></div> Predicted</div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-primary/50"></div> Fertile</div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-primary"></div> Ovulation</div>
                    </div>
                </div>
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
                                <Label htmlFor={opt.value} className="px-3 py-1.5 border rounded-full cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors" data-state={field.value === opt.value ? 'checked' : 'unchecked'}>
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
