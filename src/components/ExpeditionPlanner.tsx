import React, { useState, useEffect } from 'react';
import { Target, Clock, TrendingUp, Coins, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExpeditionPlannerProps {
  stashValue: number;
}

export function ExpeditionPlanner({ stashValue }: ExpeditionPlannerProps) {
  const [coinsInBank, setCoinsInBank] = useState(0);
  const [expeditionGoal, setExpeditionGoal] = useState(5000000);
  const [expeditionName, setExpeditionName] = useState('Operation: Shadow Strike');
  
  // Simulated expedition data
  const [timeRemaining, setTimeRemaining] = useState({ days: 3, hours: 14 });
  
  const totalProgression = coinsInBank + stashValue;
  const progressPercent = Math.min(100, (totalProgression / expeditionGoal) * 100);
  const coinsNeeded = Math.max(0, expeditionGoal - totalProgression);
  const exceededBy = totalProgression - expeditionGoal;
  
  const avgCoinsPerRaid = 50000;
  const raidsNeeded = Math.ceil(coinsNeeded / avgCoinsPerRaid);
  const hoursPerRaid = 0.5;
  const estimatedHours = raidsNeeded * hoursPerRaid;

  // Milestone markers
  const milestones = [25, 50, 75, 100];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Expedition <span className="text-gradient-secondary">Planner</span>
          </h2>
          <p className="text-muted-foreground">Track your progress toward expedition goals</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Expedition Status Card */}
          <div className="card-tactical rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">Current Expedition</span>
                </div>
                <Input
                  value={expeditionName}
                  onChange={(e) => setExpeditionName(e.target.value)}
                  className="bg-transparent border-none text-xl font-bold text-foreground p-0 h-auto focus-visible:ring-0"
                />
              </div>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-mono">Next reset</span>
                  <Clock className="w-4 h-4 text-warning"/>
                  <span className="font-mono">{timeRemaining.days}d {timeRemaining.hours}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="bg-transparent border-none text-1xl font-bold text-foreground font-mono p-0 h-auto focus-visible:ring-0">{expeditionGoal}</span>
                </div>
              </div>
            </div>

            {/* Main Progress Bar */}
            <div className="relative mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground font-mono">
                  {totalProgression.toLocaleString()} / {expeditionGoal.toLocaleString()} coins
                </span>
              </div>
              
              <div className="progress-tactical h-8 rounded-lg relative overflow-hidden">
                <div 
                  className="absolute inset-0 h-full transition-all duration-700"
                  style={{ 
                    width: `${progressPercent}%`,
                    background: progressPercent >= 100 
                      ? 'linear-gradient(90deg, hsl(160 84% 39%), hsl(120 60% 50%))' 
                      : 'linear-gradient(90deg, hsl(337 100% 50%), hsl(280 100% 60%))'
                  }}
                />
                
                {/* Milestone markers */}
                {milestones.map(m => (
                  <div
                    key={m}
                    className="absolute top-0 bottom-0 w-0.5 bg-foreground/30"
                    style={{ left: `${m}%` }}
                  />
                ))}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground drop-shadow-lg">
                    {progressPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Milestone labels */}
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Status Message */}
            <div className={`rounded-lg p-4 mb-6 ${
              exceededBy > 0 
                ? 'bg-success/20 border border-success/50' 
                : 'bg-warning/20 border border-warning/50'
            }`}>
              {exceededBy > 0 ? (
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                  <div>
                    <p className="font-bold text-success">Goal Exceeded!</p>
                    <p className="text-sm text-success/80">
                      You've exceeded the goal by {exceededBy.toLocaleString()} coins!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-warning flex-shrink-0" />
                  <div>
                    <p className="font-bold text-warning">Keep Grinding!</p>
                    <p className="text-sm text-warning/80">
                      You need {coinsNeeded.toLocaleString()} more coins (~{raidsNeeded} raids at {avgCoinsPerRaid}/run)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Coins className="w-3 h-3"/> Coins in Bank
                </div>
                <Input
                    type="number"
                    value={coinsInBank}
                    onChange={(e) => setCoinsInBank(parseInt(e.target.value) || 0)}
                    className="w-24 h-8 bg-muted border-border font-mono"
                />
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Stash Value
                </div>
                <div className="text-2xl font-bold text-primary font-mono">
                  {stashValue.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 border border-primary/30">
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Total Progression
                </div>
                <div className="text-2xl font-bold text-foreground font-mono">
                  {totalProgression.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
