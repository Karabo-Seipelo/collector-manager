"use client";

import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { ProgressIndicator } from "../../molecules/progress-indicator/progress-indicator";
import { Card, CardContent, CardHeader } from "../../molecules/card/card";

const exercises = [
  { name: "Warm up", duration: "5 min" },
  { name: "Squats", duration: "3 × 12" },
  { name: "Push ups", duration: "3 × 10" },
  { name: "Plank", duration: "60 sec" },
];

export function WorkoutTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      <header className="flex items-center gap-3 border-b border-stroke-weak bg-fill-inverse px-4 py-4">
        <ButtonIcon
          aria-label="Back"
          icon={<FeatherIcon name="arrow-left" size={24} />}
          variant="tertiary"
          tone="neutral"
        />
        <h1 className="flex-1 text-heading-4 font-semibold text-fg-strong">Full body workout</h1>
        <ButtonIcon
          aria-label="More"
          icon={<FeatherIcon name="more-horizontal" size={24} />}
          variant="tertiary"
          tone="neutral"
        />
      </header>
      <main className="flex flex-1 flex-col gap-6 p-4">
        <ProgressIndicator currentStep={2} totalSteps={5} backLabel="Overview" onBack={() => {}} />
        <div className="flex flex-col gap-3">
          {exercises.map((exercise) => (
            <Card key={exercise.name}>
              <CardContent className="flex flex-row items-center justify-between p-4">
                <CardHeader heading={exercise.name} description={exercise.duration} />
                <FeatherIcon name="chevron-right" size={24} className="text-fg-weak" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t border-stroke-weak bg-fill-inverse p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button className="w-full">Start workout</Button>
      </footer>
    </div>
  );
}
