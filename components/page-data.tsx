"use client"

import { mockStudents } from "@/lib/mock-data"

export default function PageData() {
    return (
        <div className="p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Semua Data Pendaftar</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3">No Reg</th>
                        <th className="p-3">Nama Lengkap</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Tanggal Daftar</th>
                    </tr>
                </thead>
                <tbody>
                    {mockStudents.map((s) => (
                        <tr key={s.id} className="border-b">
                            <td className="p-3">{s.registrationNumber}</td>
                            <td className="p-3">{s.section1?.fullName}</td>
                            <td className="p-3 capitalize">{s.status}</td>
                            <td className="p-3">{new Date(s.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
