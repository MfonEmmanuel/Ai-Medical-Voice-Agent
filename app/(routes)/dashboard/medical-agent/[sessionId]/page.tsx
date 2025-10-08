"use client";

import { AiDoctorAgents } from "@/shared/list";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import Image from "next/image";

type SessionDetail = {
  id: string;
  notes: string;
  sectionId: string;
  report: string;
  selectedDoctor: string;
  createdOn: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof sessionId === "string" && sessionId) {
      GetSessionDetail();
    } else {
      setError("Invalid or missing session ID");
    }
  }, [sessionId]);

  const GetSessionDetail = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `/api/session-chat?sessionId=${sessionId}`
      );
      console.log("API Response:", result.data);
      if (!result.data?.selectedDoctor) {
        console.warn("Missing selectedDoctor in API response");
        setError("No doctor selected for this session");
      }
      setSessionDetail(result.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching session details:", err.message);
      setError("Failed to load session details");
    } finally {
      setIsLoading(false);
    }
  };

  const doctorDetails = sessionDetail?.selectedDoctor
    ? AiDoctorAgents.find(
        (doc) => doc.specialist === sessionDetail.selectedDoctor
      )
    : null;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle className="w-4 h-4" /> Not connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {doctorDetails ? (
        <div className="mt-4">
          <Image
            src={doctorDetails.image}
            alt={doctorDetails.specialist}
            width={80}
            height={80}
            className="rounded-full"
          />
          <p className="text-sm mt-2">{doctorDetails.specialist}</p>
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-500 mt-4">No doctor details available</p>
        )
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
