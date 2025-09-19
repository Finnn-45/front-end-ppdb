"use client"

import { mockStudents } from "@//lib/mock-data"

export default function PageVerifiedData() {
    const pending = mockStudents.filter((s) => s.status === "pending")

    return (
        <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Data untuk Diverifikasi</h2>
            {pending.length === 0 ? (
                <p className="text-gray-500">Tidak ada data pending.</p>
            ) : (
                <ul className="space-y-3">
                    {pending.map((s) => (
                        <li key={s.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{s.section1?.fullName}</h3>
                            <p className="text-sm text-gray-500">{s.section1?.birthPlace}, {s.section1?.birthDate}</p>
                            <p className="text-sm text-yellow-600 font-medium">PENDING</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
