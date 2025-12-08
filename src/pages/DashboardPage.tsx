// Dashboard page - Profile, logs, pattern detection

import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { User, Calendar, TrendingUp, Settings, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { getProfile, saveProfile, getPeriodLogs } from '@/lib/storage';
import { calculateCycleStats } from '@/lib/cycle-utils';
import { toast } from '@/hooks/use-toast';
import type { Profile } from '@/types';

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile>(() => getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const logs = getPeriodLogs();
  const stats = useMemo(() => calculateCycleStats(logs), [logs]);

  const handleSave = () => {
    saveProfile(profile);
    setIsEditing(false);
    toast({ title: "Profile saved!", description: "Your settings have been updated." });
  };

  return (
    <>
      <Helmet>
        <title>Your Profile - Luna</title>
        <meta name="description" content="View your profile, cycle settings, and health patterns." />
      </Helmet>

      <main className="min-h-screen pb-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-muted-foreground">Manage your cycle settings and view patterns</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Settings */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-coral" /> Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg bg-muted border-none disabled:opacity-60"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <input
                      type="number"
                      value={profile.age || ''}
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg bg-muted border-none disabled:opacity-60"
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cycle Length (days)</label>
                    <input
                      type="number"
                      value={profile.cycleLength}
                      onChange={(e) => setProfile({ ...profile, cycleLength: parseInt(e.target.value) || 28 })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg bg-muted border-none disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Period Length (days)</label>
                    <input
                      type="number"
                      value={profile.periodLength}
                      onChange={(e) => setProfile({ ...profile, periodLength: parseInt(e.target.value) || 5 })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg bg-muted border-none disabled:opacity-60"
                    />
                  </div>
                  <div className="pt-2">
                    {isEditing ? (
                      <Button onClick={handleSave} variant="hero" className="w-full">
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </Button>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                        <Settings className="w-4 h-4 mr-2" /> Edit Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats & Patterns */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-lavender" /> Your Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-coral-light text-center">
                      <p className="text-2xl font-bold text-coral">{logs.length}</p>
                      <p className="text-sm text-muted-foreground">Days Logged</p>
                    </div>
                    <div className="p-4 rounded-xl bg-lavender-light text-center">
                      <p className="text-2xl font-bold text-lavender">{stats.averagePain}/5</p>
                      <p className="text-sm text-muted-foreground">Avg Pain</p>
                    </div>
                  </div>

                  {stats.mostCommonSymptoms.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Most Common Symptoms:</p>
                      <div className="flex flex-wrap gap-2">
                        {stats.mostCommonSymptoms.map((symptom, i) => (
                          <span key={i} className="px-3 py-1 bg-mint-light text-mint text-sm rounded-full">{symptom}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-2">Flow Distribution:</p>
                    <div className="space-y-2">
                      {Object.entries(stats.flowPattern).map(([flow, count]) => (
                        <div key={flow} className="flex items-center gap-2">
                          <span className="text-sm capitalize w-16">{flow}</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-coral h-full rounded-full transition-all"
                              style={{ width: `${logs.length ? (count / logs.length) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
