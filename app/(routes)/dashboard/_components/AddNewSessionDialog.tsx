"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import type { DoctorAgent } from "./SuggestedDoctorCard";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent>();
  const router = useRouter();

  const onClickNext = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });
      setSuggestedDoctors(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: selectedDoctor?.specialist,
      });
      console.log(result.data);
      if (result.data?.sessionId) {
        console.log("Navigating to session:", result.data.sessionId);
        router.push(`/dashboard/medical-agent/` + result.data.sessionId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <h2>Add Symptoms or Any Other Details</h2>
              <Textarea
                placeholder="Add Detail Here"
                className="h-[200px]"
                onChange={(e) => setNote(e.target.value)}
                disabled={loading}
                value={note}
              />
              {suggestedDoctors.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {suggestedDoctors.map((doctor) => (
                    <SuggestedDoctorCard
                      key={doctor.id}
                      doctorAgent={doctor}
                      selectedDoctor={selectedDoctor}
                      setSelectedDoctor={setSelectedDoctor}
                    />
                  ))}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          {suggestedDoctors.length === 0 ? (
            <Button onClick={onClickNext} disabled={!note || loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Next <ArrowRight className="ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onStartConsultation}
              disabled={!selectedDoctor || loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Start Consultation"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
