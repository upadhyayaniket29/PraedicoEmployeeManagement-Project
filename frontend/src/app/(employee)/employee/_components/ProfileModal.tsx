"use client";

import React, { useState } from "react";
import { X, Mail, Phone, Calendar, Briefcase, Building2, User, Shield } from "lucide-react";
import { Employee } from "./employeeData";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee | null;
}

export default function ProfileModal({ isOpen, onClose, employee }: ProfileModalProps) {
    const [imgError, setImgError] = useState(false);

    if (!isOpen || !employee) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-[#0f172a] rounded-[2.5rem] shadow-2xl border border-slate-700 p-10 animate-in zoom-in-95 duration-300 overflow-hidden">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700 z-20 group"
                >
                    <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
                        <div className="h-1 text-blue-500 w-12 rounded-full hidden md:block"></div>
                        Profile Summary
                    </h2>

                    <div className="flex flex-col md:flex-row gap-10">
                        {/* Avatar Section */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-4">
                            <div className="relative h-40 w-40 p-[4px] rounded-3xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-xl shadow-blue-500/20">
                                <div className="h-full w-full rounded-[1.3rem] bg-[#0f172a] overflow-hidden flex items-center justify-center">
                                    {!imgError ? (
                                        <img
                                            src={employee.avatar}
                                            alt={employee.name}
                                            className="h-full w-full object-cover"
                                            onError={() => setImgError(true)}
                                        />
                                    ) : (
                                        <span className="font-bold text-white text-5xl bg-gradient-to-br from-indigo-500 to-purple-600 w-full h-full flex items-center justify-center">
                                            {employee.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-500 border-4 border-[#0f172a] rounded-full"></div>
                            </div>
                            <div className="text-center md:hidden">
                                <h3 className="text-2xl font-bold text-white tracking-tight">{employee.name}</h3>
                                <p className="text-blue-400 text-sm font-medium uppercase tracking-wider">{employee.designation}</p>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 space-y-8">
                            <div className="hidden md:block">
                                <h3 className="text-4xl font-extrabold text-white tracking-tight">{employee.name}</h3>
                                <p className="text-blue-400 text-lg font-medium mt-1 uppercase tracking-widest">{employee.designation}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InfoItem icon={Mail} label="Email Address" value={employee.email} />
                                <InfoItem icon={Phone} label="Contact Number" value={employee.phone} />
                                <InfoItem icon={Building2} label="Department" value={employee.department} />
                                <InfoItem icon={Briefcase} label="Job Category" value={employee.category} />
                                <InfoItem icon={User} label="Employee ID" value={employee.id} />
                                <InfoItem icon={Calendar} label="Joining Date" value={new Date(employee.joinDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} />
                            </div>

                            {/* Employee Type Badge */}
                            <div className="pt-6 border-t border-slate-800/50">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Shield size={18} />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Employment Status:</span>
                                    </div>
                                    <span className={`w-fit px-6 py-2 rounded-xl text-xs font-black uppercase tracking-[0.1em] border shadow-lg ${employee.employeeType === "Regular"
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5"
                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-500/5"
                                        }`}>
                                        {employee.employeeType === "Regular" ? "FULL-TIME REGULAR" : `TEMPORARY - ${employee.temporaryType}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300 group">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mb-1">{label}</p>
                <p className="text-sm text-white font-semibold truncate">{value}</p>
            </div>
        </div>
    );
}
