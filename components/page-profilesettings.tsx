"use client"

import { useState, useEffect } from "react"

export default function PageProfileSettings() {
    const [profile, setProfile] = useState({
        name: "Admin",
        email: "admin@ppdb.com",
    })

    useEffect(() => {
        const stored = localStorage.getItem("admin_profile")
        if (stored) setProfile(JSON.parse(stored))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        localStorage.setItem("admin_profile", JSON.stringify(profile))
        alert("Profil berhasil diperbarui!")
    }

    return (
        <div className="p-6 bg-white rounded-2xl shadow max-w-lg">
            <h2 className="text-xl font-bold mb-6">Pengaturan Profil</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nama</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Simpan
                </button>
            </div>
        </div>
    )
}
