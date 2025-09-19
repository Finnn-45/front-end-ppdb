export interface PPDBStudent {
  id: string
  registrationNumber: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
  section1?: PersonalData
  section2?: FamilyData
  section3?: EducationData
  section4?: HealthData
  section5?: AchievementData
  section6?: DocumentData
  section7?: EconomicData
  section8?: MotivationData
  section9?: AdditionalData
}

export interface PersonalData {
  fullName: string
  nickname: string
  birthPlace: string
  birthDate: string
  gender: "L" | "P"
  religion: string
  nationality: string
  address: string
  phone: string
  email: string
}

export interface FamilyData {
  fatherName: string
  fatherJob: string
  fatherEducation: string
  motherName: string
  motherJob: string
  motherEducation: string
  guardianName?: string
  guardianRelation?: string
  guardianPhone?: string
}

export interface EducationData {
  previousSchool: string
  graduationYear: string
  nisn: string
  averageGrade: number
  favoriteSubject: string
  achievements: string[]
}

export interface HealthData {
  height: number
  weight: number
  bloodType: string
  allergies: string[]
  chronicDiseases: string[]
  disabilities: string[]
}

export interface AchievementData {
  academicAchievements: Achievement[]
  nonAcademicAchievements: Achievement[]
  organizationExperience: Organization[]
}

export interface Achievement {
  title: string
  level: "sekolah" | "kecamatan" | "kabupaten" | "provinsi" | "nasional" | "internasional"
  year: string
  rank: string
}

export interface Organization {
  name: string
  position: string
  period: string
}

export interface DocumentData {
  familyCard: string
  birthCertificate: string
  recentPhoto: string
  povertyLetter: string
  recommendationLetter: string
  housePhotos: string[]
}

export interface EconomicData {
  fatherIncome: number
  motherIncome: number
  familyExpenses: number
  houseOwnership: "milik_sendiri" | "sewa" | "menumpang"
  vehicleOwnership: string[]
  electricityBill: number
}

export interface MotivationData {
  whyChooseSchool: string
  futureGoals: string
  strengths: string[]
  weaknesses: string[]
  hobbies: string[]
}

export interface AdditionalData {
  specialNeeds: string[]
  transportation: string
  distanceToSchool: number
  additionalInfo: string
}

// Mock data for demonstration
export const mockStudents: PPDBStudent[] = [
  {
    id: "1",
    registrationNumber: "PPDB2026001",
    createdAt: "2024-01-15T08:30:00Z",
    status: "pending",
    section1: {
      fullName: "Ahmad Rizki Pratama",
      nickname: "Rizki",
      birthPlace: "Jakarta",
      birthDate: "2008-05-15",
      gender: "L",
      religion: "Islam",
      nationality: "Indonesia",
      address: "Jl. Merdeka No. 123, Jakarta Selatan",
      phone: "081234567890",
      email: "rizki.pratama@email.com",
    },
    section2: {
      fatherName: "Budi Pratama",
      fatherJob: "Pegawai Swasta",
      fatherEducation: "S1",
      motherName: "Siti Nurhaliza",
      motherJob: "Ibu Rumah Tangga",
      motherEducation: "SMA",
    },
    section6: {
      familyCard: "kk_rizki.pdf",
      birthCertificate: "akta_rizki.pdf",
      recentPhoto: "foto_rizki.jpg",
      povertyLetter: "sktm_rizki.pdf",
      recommendationLetter: "rekomendasi_rizki.pdf",
      housePhotos: ["rumah1.jpg", "rumah2.jpg"],
    },
  },
  {
    id: "2",
    registrationNumber: "PPDB2026002",
    createdAt: "2024-01-16T09:15:00Z",
    status: "approved",
    section1: {
      fullName: "Sari Dewi Lestari",
      nickname: "Sari",
      birthPlace: "Bandung",
      birthDate: "2008-08-22",
      gender: "P",
      religion: "Islam",
      nationality: "Indonesia",
      address: "Jl. Sudirman No. 456, Bandung",
      phone: "081987654321",
      email: "sari.dewi@email.com",
    },
    section2: {
      fatherName: "Dedi Lestari",
      fatherJob: "Guru",
      fatherEducation: "S1",
      motherName: "Rina Sari",
      motherJob: "Perawat",
      motherEducation: "D3",
    },
  },
  {
    id: "3",
    registrationNumber: "PPDB2026003",
    createdAt: "2024-01-17T10:45:00Z",
    status: "rejected",
    section1: {
      fullName: "Muhammad Fajar Sidiq",
      nickname: "Fajar",
      birthPlace: "Surabaya",
      birthDate: "2008-03-10",
      gender: "L",
      religion: "Islam",
      nationality: "Indonesia",
      address: "Jl. Pahlawan No. 789, Surabaya",
      phone: "081122334455",
      email: "fajar.sidiq@email.com",
    },
  },
]

export const sectionNames = [
  "Data Pribadi",
  "Data Keluarga",
  "Data Pendidikan",
  "Data Kesehatan",
  "Data Prestasi",
  "Upload Dokumen",
  "Data Ekonomi",
  "Data Motivasi",
  "Data Tambahan",
]
