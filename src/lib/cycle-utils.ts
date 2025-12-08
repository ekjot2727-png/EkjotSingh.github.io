// Cycle prediction and fertility calculation utilities

import type { Profile, PeriodLog, CyclePrediction, FertilityWindow } from '@/types';
import { format, addDays, differenceInDays, parseISO, isAfter, isBefore, isWithinInterval } from 'date-fns';

/**
 * Predicts the next period date based on the last period and cycle length
 */
export function predictNextPeriod(profile: Profile, logs: PeriodLog[]): CyclePrediction | null {
  const lastPeriodDate = getLastPeriodStartDate(profile, logs);
  
  if (!lastPeriodDate) {
    return null;
  }

  const cycleLength = profile.cycleLength || 28;
  const nextPeriodDate = addDays(parseISO(lastPeriodDate), cycleLength);
  const today = new Date();
  const daysUntil = differenceInDays(nextPeriodDate, today);
  
  // Determine current phase
  const dayInCycle = cycleLength - daysUntil;
  const phase = getCyclePhase(dayInCycle, cycleLength, profile.periodLength);
  
  // Calculate fertility window
  const fertilityWindow = estimateFertilityWindow(nextPeriodDate, cycleLength);

  return {
    nextPeriodDate: format(nextPeriodDate, 'yyyy-MM-dd'),
    daysUntil: Math.max(0, daysUntil),
    phase,
    fertilityWindow,
  };
}

/**
 * Gets the most recent period start date from logs or profile
 */
function getLastPeriodStartDate(profile: Profile, logs: PeriodLog[]): string | null {
  // First check logs for the most recent entry
  if (logs.length > 0) {
    // Sort by date and find the most recent period log
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedLogs[0].date;
  }
  
  // Fall back to profile's last period date
  return profile.lastPeriodDate;
}

/**
 * Determines the current phase of the menstrual cycle
 */
function getCyclePhase(
  dayInCycle: number,
  cycleLength: number,
  periodLength: number
): 'menstrual' | 'follicular' | 'ovulation' | 'luteal' {
  if (dayInCycle <= 0) dayInCycle = cycleLength + dayInCycle;
  
  if (dayInCycle <= periodLength) {
    return 'menstrual';
  }
  
  const ovulationDay = cycleLength - 14;
  
  if (dayInCycle >= ovulationDay - 2 && dayInCycle <= ovulationDay + 1) {
    return 'ovulation';
  }
  
  if (dayInCycle < ovulationDay - 2) {
    return 'follicular';
  }
  
  return 'luteal';
}

/**
 * Estimates the fertility window based on next period date
 * Ovulation typically occurs 14 days before the next period
 * Fertile window is about 5 days before and 1 day after ovulation
 */
export function estimateFertilityWindow(
  nextPeriodDate: Date,
  cycleLength: number
): FertilityWindow {
  // Ovulation occurs approximately 14 days before next period
  const ovulationDate = addDays(nextPeriodDate, -14);
  
  // Fertile window: 5 days before ovulation to 1 day after
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = addDays(ovulationDate, 1);

  return {
    ovulationDate: format(ovulationDate, 'yyyy-MM-dd'),
    fertileStart: format(fertileStart, 'yyyy-MM-dd'),
    fertileEnd: format(fertileEnd, 'yyyy-MM-dd'),
  };
}

/**
 * Checks if a given date falls within the fertility window
 */
export function isInFertileWindow(date: Date, fertilityWindow: FertilityWindow): boolean {
  return isWithinInterval(date, {
    start: parseISO(fertilityWindow.fertileStart),
    end: parseISO(fertilityWindow.fertileEnd),
  });
}

/**
 * Calculates average cycle statistics from logs
 */
export function calculateCycleStats(logs: PeriodLog[]): {
  averagePain: number;
  mostCommonSymptoms: string[];
  flowPattern: Record<string, number>;
} {
  if (logs.length === 0) {
    return {
      averagePain: 0,
      mostCommonSymptoms: [],
      flowPattern: {},
    };
  }

  // Average pain level
  const totalPain = logs.reduce((sum, log) => sum + log.pain, 0);
  const averagePain = totalPain / logs.length;

  // Most common symptoms
  const symptomCounts: Record<string, number> = {};
  logs.forEach(log => {
    log.symptoms.forEach(symptom => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });
  
  const sortedSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([symptom]) => symptom);

  // Flow pattern
  const flowPattern: Record<string, number> = {
    light: 0,
    medium: 0,
    heavy: 0,
    spotting: 0,
  };
  
  logs.forEach(log => {
    flowPattern[log.flow] = (flowPattern[log.flow] || 0) + 1;
  });

  return {
    averagePain: Math.round(averagePain * 10) / 10,
    mostCommonSymptoms: sortedSymptoms,
    flowPattern,
  };
}

/**
 * Gets phase color for UI display
 */
export function getPhaseColor(phase: string): string {
  switch (phase) {
    case 'menstrual':
      return 'coral';
    case 'follicular':
      return 'mint';
    case 'ovulation':
      return 'lavender';
    case 'luteal':
      return 'peach';
    default:
      return 'muted';
  }
}

/**
 * Gets phase description
 */
export function getPhaseDescription(phase: string): string {
  switch (phase) {
    case 'menstrual':
      return 'Your period is here. Rest, stay hydrated, and be gentle with yourself.';
    case 'follicular':
      return 'Energy is rising! Great time for new projects and exercise.';
    case 'ovulation':
      return 'Peak fertility and energy. You may feel more social and confident.';
    case 'luteal':
      return 'Winding down. PMS symptoms may appear. Practice self-care.';
    default:
      return 'Track your cycle to get personalized insights.';
  }
}
