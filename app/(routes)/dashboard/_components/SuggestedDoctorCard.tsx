"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export interface DoctorAgent {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
}

interface Props {
  doctorAgent: DoctorAgent;
  selectedDoctor?: DoctorAgent;
  setSelectedDoctor: (doctor: DoctorAgent) => void;
}

function SuggestedDoctorCard({
  doctorAgent,
  selectedDoctor,
  setSelectedDoctor,
}: Props) {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-all ${
        selectedDoctor?.id === doctorAgent?.id ? "border-2 border-primary" : ""
      }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={doctorAgent.image}
            alt={doctorAgent.specialist}
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
          <h2 className="font-bold text-sm text-center">
            {doctorAgent.specialist}
          </h2>
          <p className="text-xs text-center text-muted-foreground line-clamp-2">
            {doctorAgent.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button
          variant={
            selectedDoctor?.id === doctorAgent?.id ? "default" : "outline"
          }
          className="w-full"
        >
          {selectedDoctor?.id === doctorAgent?.id
            ? "Selected"
            : "Select Doctor"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SuggestedDoctorCard;
