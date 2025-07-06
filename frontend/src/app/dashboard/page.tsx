"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/env";
import { sk } from "@/lib/socket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashPage() {
  const [u, setU] = useState<any>(null);
  const [emp, setEmp] = useState<any[]>([]);
  const [task, setTask] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [editEmpId, setEditEmpId] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskEmp, setTaskEmp] = useState("");
  const [editTaskId, setEditTaskId] = useState("");

  const nav = useRouter();

  useEffect(() => {
    const t =
      typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
    if (!t) return nav.push("/login");

    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d._id) return nav.push("/login");
        setU(d);
      });

    fetch(`${API}/api/employees`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((r) => r.json())
      .then(setEmp);

    fetch(`${API}/api/tasks`, {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((r) => r.json())
      .then(setTask);

    fetch(`${API}/api/att/logs`)
      .then((r) => r.json())
      .then(setLogs);

    sk.on("punch-log", (x) => setLogs((p) => [x, ...p]));
    return () => {
      sk.off("punch-log");
    };
  }, []);

  const token = () => localStorage.getItem("token") || "";

  const addOrUpdateEmp = async () => {
    if (editEmpId) {
      const res = await fetch(`${API}/api/employees/${editEmpId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ name: empName, email: empEmail }),
      });
      if (res.ok) {
        const updated = await res.json();
        setEmp((p) => p.map((e) => (e._id === editEmpId ? updated : e)));
        setEditEmpId("");
        setEmpName("");
        setEmpEmail("");
      }
    } else {
      const res = await fetch(`${API}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ name: empName, email: empEmail }),
      });
      if (res.ok) {
        const e = await res.json();
        setEmp((p) => [...p, e]);
        setEmpName("");
        setEmpEmail("");
      }
    }
  };

  const delEmp = async (id: string) => {
    await fetch(`${API}/api/employees/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    setEmp((p) => p.filter((e) => e._id !== id));
  };

  const addOrUpdateTask = async () => {
    if (editTaskId) {
      const res = await fetch(`${API}/api/tasks/${editTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ title: taskTitle, empId: taskEmp }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTask((p) => p.map((t) => (t._id === editTaskId ? updated : t)));
        setEditTaskId("");
        setTaskTitle("");
        setTaskEmp("");
      }
    } else {
      const res = await fetch(`${API}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ title: taskTitle, empId: taskEmp }),
      });
      if (res.ok) {
        const d = await res.json();
        setTask((p) => [...p, d]);
        setTaskTitle("");
        setTaskEmp("");
      }
    }
  };

  const delTask = async (id: string) => {
    await fetch(`${API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    setTask((p) => p.filter((x) => x._id !== id));
  };

  if (!u || !["admin", "superadmin"].includes(u.role))
    return <div className="p-4 text-white">Not authorized</div>;

  const isSuper = u.role === "superadmin";

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
        Dashboard{" "}
        <span className="text-sm bg-white text-black px-2 py-1 rounded border">
          {u.role}
        </span>
      </h1>

      {/* Employees */}
      <Card className="bg-[#0f172a] text-white border border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Employees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuper && (
            <div className="flex flex-wrap gap-3">
              <Input
                placeholder="Name"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={empEmail}
                onChange={(e) => setEmpEmail(e.target.value)}
              />
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={addOrUpdateEmp}
              >
                {editEmpId ? "Update" : "Add"}
              </Button>
            </div>
          )}
          <div className="grid gap-2">
            {emp.map((e) => (
              <div
                key={e._id}
                className="border border-gray-600 p-2 rounded flex justify-between items-center"
              >
                <span>
                  {e.name} ({e.email})
                </span>
                {isSuper && (
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                      onClick={() => {
                        setEmpName(e.name);
                        setEmpEmail(e.email);
                        setEditEmpId(e._id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => delEmp(e._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card className="bg-[#0f172a] text-white border border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuper && (
            <div className="flex flex-wrap gap-3">
              <Input
                placeholder="Task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Select value={taskEmp} onValueChange={setTaskEmp}>
                <SelectTrigger className="w-[180px] bg-white text-black">
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  {emp.map((e) => (
                    <SelectItem key={e._id} value={e._id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={addOrUpdateTask}
              >
                {editTaskId ? "Update" : "Add"}
              </Button>
            </div>
          )}
          <div className="grid gap-2">
            {task.map((t) => (
              <div
                key={t._id}
                className="border border-gray-600 p-2 rounded flex justify-between items-center"
              >
                <span>
                  {t.title} → {t.empId?.name || "unknown"}
                </span>
                {isSuper && (
                  <div className="flex gap-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                      onClick={() => {
                        setTaskTitle(t.title);
                        setTaskEmp(t.empId?._id || "");
                        setEditTaskId(t._id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => delTask(t._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs */}
      <Card className="bg-[#0f172a] text-white border border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Live Attendance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {logs.map((l, i) => (
            <div
              key={i}
              className="border border-gray-600 p-2 rounded text-white"
            >
              <div>Emp: {l.empId}</div>
              <div>Action: {l.action}</div>
              <div>{new Date(l.time).toLocaleString()}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
