"use client"

import { mockStudents } from "@/lib/mock-data"

export default function PageAcceptedData() {
    const approved = mockStudents.filter((s) => s.status === "approved")

    return (
        <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Data Diterima</h2>
            {approved.length === 0 ? (
                <p className="text-gray-500">Belum ada siswa yang diterima.</p>
            ) : (
                <ul className="space-y-3">
                    {approved.map((s) => (
                        <li key={s.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{s.section1?.fullName}</h3>
                            <p className="text-sm text-gray-500">{s.section1?.email}</p>
                            <p className="text-sm text-green-600 font-medium">DITERIMA</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
