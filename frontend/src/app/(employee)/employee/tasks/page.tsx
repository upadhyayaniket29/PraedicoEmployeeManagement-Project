"use client";

import { useState, useEffect } from "react";
import AuthCheck from "../_components/AuthCheck";
import { AlertCircle, Clock, CheckCircle2, FileText, Send, Paperclip } from "lucide-react";
import SubmitTaskModal from "./_components/SubmitTaskModal";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    taskId: string;
    deadline?: string;
    createdAt: string;
}

export default function EmployeeTasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("employeeToken");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/tasks/my-tasks`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setTasks(data.data);
            } else {
                setError(data.message || "Failed to load tasks");
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Error loading tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    if (loading) {
        return (
            <AuthCheck>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </AuthCheck>
        );
    }

    return (
        <AuthCheck>
            <div className="space-y-8 animate-in fade-in duration-700 pb-10">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 p-10 border border-slate-700 shadow-2xl">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Assigned Tasks</h1>
                    <p className="text-slate-400 mt-2 text-lg">Manage and submit your daily reports</p>
                </div>

                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        <AlertCircle size={20} />
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div key={task._id} className="rounded-2xl bg-[#0f172a] p-6 border border-slate-800 shadow-lg hover:border-slate-700 transition-all group">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{task.title}</h3>
                                                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Task ID: {task.taskId}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.status === "Pending" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                                                    task.status === "Work In Progress" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                                        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                }`}>
                                                {task.status}
                                            </span>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed">{task.description}</p>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                <Clock size={16} />
                                                <span>Assigned: {new Date(task.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            {task.deadline && (
                                                <div className="flex items-center gap-2 text-orange-400 text-sm">
                                                    <Clock size={16} />
                                                    <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <button
                                            onClick={() => handleOpenModal(task)}
                                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20"
                                        >
                                            <Send size={18} />
                                            Submit Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 rounded-3xl bg-slate-800/20 border border-dashed border-slate-700">
                            <FileText size={48} className="mx-auto text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-400">No tasks assigned yet</h3>
                            <p className="text-slate-500 mt-1">Check back later for new assignments</p>
                        </div>
                    )}
                </div>

                {selectedTask && (
                    <SubmitTaskModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        task={selectedTask}
                        onSuccess={fetchTasks}
                    />
                )}
            </div>
        </AuthCheck>
    );
}
