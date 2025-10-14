"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PageForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    nisn: "",
    nik: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    schoolOrigin: "",
    graduationYear: "",
    npsn: "",
    childOrder: "",
    parentStatus: "",
    familyStatus: "",
    socialAid: "",
    livingWith: "",
    phone: "",
    socialMedia: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-50 rounded-xl p-8 shadow-sm">
      {/* Header Progress */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-6">
          Registration Form
        </h1>

        <div className="flex justify-center items-center space-x-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E3A8A] text-white font-semibold">
              1
            </div>
            <p className="mt-2 text-sm font-medium text-[#1E3A8A]">
              Personal Data
            </p>
          </div>
          <div className="flex-1 h-[2px] bg-gray-300 max-w-[60px]" />
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold">
              2
            </div>
            <p className="mt-2 text-sm font-medium text-gray-500">Achievements</p>
          </div>
          <div className="flex-1 h-[2px] bg-gray-300 max-w-[60px]" />
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-semibold">
              3
            </div>
            <p className="mt-2 text-sm font-medium text-gray-500">Parent/Guardian</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section: Personal Data */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-lg font-semibold px-6 py-3">
            Personal Data
          </h2>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="nisn"
              placeholder="NISN"
              value={formData.nisn}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="nik"
              placeholder="NIK"
              value={formData.nik}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </section>

        {/* Section: Birth */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-lg font-semibold px-6 py-3">
            Birth
          </h2>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="birthPlace"
              placeholder="Birth Place"
              value={formData.birthPlace}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              value={formData.birthDate}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="address"
              placeholder="Current City or District"
              value={formData.address}
              onChange={handleChange}
              className="input-field md:col-span-2"
            />
          </div>
        </section>

        {/* Section: School Info */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-lg font-semibold px-6 py-3">
            School Information
          </h2>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="schoolOrigin"
              placeholder="School Name"
              value={formData.schoolOrigin}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="npsn"
              placeholder="School NPSN"
              value={formData.npsn}
              onChange={handleChange}
              className="input-field md:col-span-2"
            />
          </div>
        </section>

        {/* Section: Family Info */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-lg font-semibold px-6 py-3">
            Family Information
          </h2>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="childOrder"
              placeholder="Child number (e.g., 2 of 4 siblings)"
              value={formData.childOrder}
              onChange={handleChange}
              className="input-field md:col-span-2"
            />

            <select
              name="parentStatus"
              value={formData.parentStatus}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Parent Condition</option>
              <option value="alive">Alive</option>
              <option value="deceased">Deceased</option>
            </select>

            <select
              name="familyStatus"
              value={formData.familyStatus}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Family Status</option>
              <option value="complete">Complete</option>
              <option value="single-parent">Single Parent</option>
            </select>

            <select
              name="socialAid"
              value={formData.socialAid}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Receiving Social Aid?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <select
              name="livingWith"
              value={formData.livingWith}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Currently Living With?</option>
              <option value="parents">Parents</option>
              <option value="guardian">Guardian</option>
              <option value="alone">Alone</option>
            </select>
          </div>
        </section>

        {/* Section: Social Media */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <h2 className="bg-[#1E3A8A] text-white text-lg font-semibold px-6 py-3">
            Social Media
          </h2>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <input
              type="tel"
              name="phone"
              placeholder="Phone/WhatsApp (+62...)"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="socialMedia"
              placeholder="Instagram / Facebook / Twitter"
              value={formData.socialMedia}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          Make sure all forms are filled in correctly before proceeding.
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#1E3A8A] text-white font-medium px-8 py-2 rounded-full hover:bg-[#162d66] transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;

/* ✅ Tailwind helper class (tambahkan di globals.css):
.input-field {
  @apply w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none;
}
*/
