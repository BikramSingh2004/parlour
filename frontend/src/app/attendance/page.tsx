"use client";

import { useEffect, useState } from "react";
import { sk } from "@/lib/socket";
import { API } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AttPage() {
  type Log = {
    empId: string;
    action: "in" | "out";
    time: string;
  };

  type Emp = {
    _id: string;
    name: string;
    email: string;
  };

  const [logs, setLogs] = useState<Log[]>([]);
  const [list, setList] = useState<Emp[]>([]);

  useEffect(() => {
    fetch(`${API}/api/employees/public`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setList(d);
        else {
          console.error("Invalid employee list response:", d);
          setList([]);
        }
      });

    fetch(`${API}/api/att/logs`)
      .then((r) => r.json())
      .then(setLogs);

    sk.on("punch-log", (x) => setLogs((p) => [x, ...p]));
    return () => {
      sk.off("punch-log");
    };
  }, []);

  const punch = (id: string) => {
    fetch(`${API}/api/att/punch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empId: id, action: nextAction(id) }),
    });
  };

  const nextAction = (id: string) => {
    const last = logs.find((l) => l.empId === id);
    return last?.action === "in" ? "out" : "in";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-white">
          Employee Attendance
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {list.map((e) => {
            const last = logs.find((l) => l.empId === e._id);
            const mode = last?.action === "in" ? "out" : "in";

            return (
              <Card
                key={e._id}
                className="bg-[#0f172a] text-white shadow-lg border border-gray-700"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{e.name}</CardTitle>
                  <p className="text-sm text-gray-400">{e.email}</p>
                </CardHeader>
                <CardContent className="flex justify-center mt-2">
                  <Button
                    size="lg"
                    className={`w-full text-lg font-semibold ${
                      mode === "in"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                    onClick={() => punch(e._id)}
                  >
                    Punch {mode.toUpperCase()}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
