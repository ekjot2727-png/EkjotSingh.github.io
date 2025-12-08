// Period Tracker page - Calendar, logging, predictions

import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Droplets, 
  ThermometerSun,
  Moon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isWithinInterval } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { getPeriodLogs, savePeriodLog, getProfile } from '@/lib/storage';
import { predictNextPeriod, getPhaseColor, getPhaseDescription } from '@/lib/cycle-utils';
import type { PeriodLog } from '@/types';

const FLOW_OPTIONS = ['spotting', 'light', 'medium', 'heavy'] as const;
const MOOD_OPTIONS = ['😊 Happy', '😢 Sad', '😠 Irritable', '😰 Anxious', '😴 Tired', '🥰 Loving'];
const SYMPTOM_OPTIONS = [
  'Cramps', 'Headache', 'Bloating', 'Breast tenderness', 
  'Backache', 'Nausea', 'Acne', 'Food cravings'
];

export default function TrackerPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLogging, setIsLogging] = useState(false);
  const [logs, setLogs] = useState<PeriodLog[]>(() => getPeriodLogs());
  
  // Form state for new log
  const [logForm, setLogForm] = useState({
    flow: 'medium' as PeriodLog['flow'],
    pain: 3,
    mood: '',
    symptoms: [] as string[],
    notes: '',
  });

  const profile = getProfile();
  const prediction = useMemo(() => predictNextPeriod(profile, logs), [profile, logs]);

  // Calendar days for current month
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start, end });
    
    // Pad start with empty days for alignment
    const startDay = start.getDay();
    const paddedDays = [...Array(startDay).fill(null), ...days];
    
    return paddedDays;
  }, [currentMonth]);

  // Check if a day has a log
  const getLogForDay = (date: Date): PeriodLog | undefined => {
    return logs.find(log => isSameDay(parseISO(log.date), date));
  };

  // Check if day is in fertility window
  const isInFertileWindow = (date: Date): boolean => {
    if (!prediction?.fertilityWindow) return false;
    return isWithinInterval(date, {
      start: parseISO(prediction.fertilityWindow.fertileStart),
      end: parseISO(prediction.fertilityWindow.fertileEnd),
    });
  };

  // Handle saving a log
  const handleSaveLog = () => {
    if (!selectedDate) return;
    
    const newLog: PeriodLog = {
      id: `log-${Date.now()}`,
      date: format(selectedDate, 'yyyy-MM-dd'),
      flow: logForm.flow,
      pain: logForm.pain,
      mood: logForm.mood,
      symptoms: logForm.symptoms,
      notes: logForm.notes,
    };

    savePeriodLog(newLog);
    setLogs(getPeriodLogs());
    setIsLogging(false);
    setSelectedDate(null);
    setLogForm({ flow: 'medium', pain: 3, mood: '', symptoms: [], notes: '' });
  };

  return (
    <>
      <Helmet>
        <title>Period Tracker - Luna</title>
        <meta name="description" content="Track your menstrual cycle, log symptoms, and get predictions for your next period and fertility window." />
      </Helmet>

      <main className="min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Period Tracker</h1>
            <p className="text-muted-foreground">Log your cycle and track patterns</p>
          </motion.div>

          {/* Prediction card */}
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card variant="gradient" className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Next period */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-coral mb-2">
                      <CalendarIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Next Period</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {prediction.daysUntil === 0 
                        ? "Today or very soon!" 
                        : `In ${prediction.daysUntil} days`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expected: {format(parseISO(prediction.nextPeriodDate), 'MMMM d, yyyy')}
                    </p>
                  </div>

                  {/* Current phase */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-lavender mb-2">
                      <Moon className="w-5 h-5" />
                      <span className="text-sm font-medium">Current Phase</span>
                    </div>
                    <p className="text-xl font-bold capitalize">{prediction.phase}</p>
                    <p className="text-sm text-muted-foreground">
                      {getPhaseDescription(prediction.phase).slice(0, 60)}...
                    </p>
                  </div>

                  {/* Fertility window */}
                  {prediction.fertilityWindow && (
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-mint mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium">Fertile Window</span>
                      </div>
                      <p className="text-lg font-bold">
                        {format(parseISO(prediction.fertilityWindow.fertileStart), 'MMM d')} - {format(parseISO(prediction.fertilityWindow.fertileEnd), 'MMM d')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ovulation: {format(parseISO(prediction.fertilityWindow.ovulationDate), 'MMMM d')}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <h2 className="text-xl font-bold">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const log = getLogForDay(day);
                    const isFertile = isInFertileWindow(day);
                    const isToday = isSameDay(day, new Date());
                    const isSelected = selectedDate && isSameDay(day, selectedDate);

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => {
                          setSelectedDate(day);
                          if (log) {
                            setLogForm({
                              flow: log.flow,
                              pain: log.pain,
                              mood: log.mood,
                              symptoms: log.symptoms,
                              notes: log.notes,
                            });
                          }
                          setIsLogging(true);
                        }}
                        className={`
                          aspect-square rounded-xl flex flex-col items-center justify-center text-sm
                          transition-all duration-200 relative
                          ${isToday ? 'ring-2 ring-primary' : ''}
                          ${isSelected ? 'bg-primary text-primary-foreground' : ''}
                          ${log && !isSelected ? 'bg-coral-light text-coral' : ''}
                          ${isFertile && !log && !isSelected ? 'bg-mint-light' : ''}
                          ${!log && !isFertile && !isSelected ? 'hover:bg-muted' : ''}
                        `}
                      >
                        <span className="font-medium">{format(day, 'd')}</span>
                        {log && (
                          <div className="flex gap-0.5 mt-1">
                            {[...Array(Math.min(log.pain, 3))].map((_, i) => (
                              <div key={i} className="w-1 h-1 rounded-full bg-coral" />
                            ))}
                          </div>
                        )}
                        {isFertile && !log && (
                          <Sparkles className="w-3 h-3 text-mint absolute bottom-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-coral-light" />
                    <span className="text-muted-foreground">Period logged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-mint-light flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-mint" />
                    </div>
                    <span className="text-muted-foreground">Fertile window</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded ring-2 ring-primary" />
                    <span className="text-muted-foreground">Today</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Side panel - Quick log or recent logs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-coral" />
                    Recent Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {logs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No logs yet</p>
                      <p className="text-sm">Tap a date to start logging</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-soft">
                      {logs.slice(0, 10).map((log) => (
                        <div
                          key={log.id}
                          className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedDate(parseISO(log.date));
                            setLogForm({
                              flow: log.flow,
                              pain: log.pain,
                              mood: log.mood,
                              symptoms: log.symptoms,
                              notes: log.notes,
                            });
                            setIsLogging(true);
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">
                              {format(parseISO(log.date), 'MMM d, yyyy')}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize
                              ${log.flow === 'heavy' ? 'bg-coral text-primary-foreground' : ''}
                              ${log.flow === 'medium' ? 'bg-coral-light text-coral' : ''}
                              ${log.flow === 'light' ? 'bg-lavender-light text-lavender' : ''}
                              ${log.flow === 'spotting' ? 'bg-mint-light text-mint' : ''}
                            `}>
                              {log.flow}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            {log.mood && <span>{log.mood.split(' ')[0]}</span>}
                            <span>Pain: {log.pain}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Logging modal */}
        <AnimatePresence>
          {isLogging && selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsLogging(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-2xl shadow-hover w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      Log for {format(selectedDate, 'MMMM d, yyyy')}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLogging(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Flow selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Flow</label>
                    <div className="grid grid-cols-4 gap-2">
                      {FLOW_OPTIONS.map((flow) => (
                        <button
                          key={flow}
                          onClick={() => setLogForm({ ...logForm, flow })}
                          className={`p-3 rounded-xl text-sm capitalize transition-all
                            ${logForm.flow === flow 
                              ? 'bg-coral text-primary-foreground' 
                              : 'bg-muted hover:bg-muted/80'}
                          `}
                        >
                          {flow}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pain level */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">
                      Pain Level: {logForm.pain}/5
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <button
                          key={level}
                          onClick={() => setLogForm({ ...logForm, pain: level })}
                          className={`flex-1 py-2 rounded-lg transition-all
                            ${logForm.pain >= level 
                              ? 'bg-coral text-primary-foreground' 
                              : 'bg-muted hover:bg-muted/80'}
                          `}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mood */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Mood</label>
                    <div className="grid grid-cols-3 gap-2">
                      {MOOD_OPTIONS.map((mood) => (
                        <button
                          key={mood}
                          onClick={() => setLogForm({ ...logForm, mood })}
                          className={`p-2 rounded-xl text-sm transition-all
                            ${logForm.mood === mood 
                              ? 'bg-lavender text-primary-foreground' 
                              : 'bg-muted hover:bg-muted/80'}
                          `}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Symptoms</label>
                    <div className="flex flex-wrap gap-2">
                      {SYMPTOM_OPTIONS.map((symptom) => {
                        const isSelected = logForm.symptoms.includes(symptom);
                        return (
                          <button
                            key={symptom}
                            onClick={() => {
                              setLogForm({
                                ...logForm,
                                symptoms: isSelected
                                  ? logForm.symptoms.filter(s => s !== symptom)
                                  : [...logForm.symptoms, symptom]
                              });
                            }}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all
                              ${isSelected 
                                ? 'bg-mint text-accent-foreground' 
                                : 'bg-muted hover:bg-muted/80'}
                            `}
                          >
                            {symptom}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-3">Notes</label>
                    <textarea
                      value={logForm.notes}
                      onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
                      className="w-full p-3 rounded-xl bg-muted border-none resize-none h-24 focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Any additional notes..."
                    />
                  </div>

                  {/* Save button */}
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleSaveLog}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Save Log
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
