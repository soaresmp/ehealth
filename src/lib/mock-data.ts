// Mock data for EHealth Africa prototype

export const mockPatient = {
  id: 'pat-001',
  healthId: 'GH-2024-0001234',
  nationalId: 'GHA-123456789',
  firstName: 'Amara',
  lastName: 'Mensah',
  dateOfBirth: '1988-05-14',
  gender: 'FEMALE',
  bloodType: 'O_POSITIVE',
  nationality: 'Ghana',
  region: 'Greater Accra',
  district: 'Accra Metropolitan',
  address: '12 Independence Ave, Accra',
  phone: '+233 24 456 7890',
  email: 'amara.mensah@email.com',
  photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
  emergencyContact: {
    name: 'Kofi Mensah',
    phone: '+233 20 123 4567',
    relation: 'Spouse',
  },
}

export const mockVitals = [
  {
    id: 'v-001',
    recordedAt: '2024-03-01T09:00:00Z',
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 76,
    heartRate: 72,
    temperature: 36.8,
    oxygenSaturation: 98,
    weight: 65,
    height: 165,
    bmi: 23.9,
    bloodGlucose: 5.4,
    source: 'manual',
  },
  {
    id: 'v-002',
    recordedAt: '2024-02-15T10:30:00Z',
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 79,
    heartRate: 78,
    temperature: 37.0,
    oxygenSaturation: 97,
    weight: 65.5,
    height: 165,
    bmi: 24.1,
    bloodGlucose: 5.8,
    source: 'wearable',
  },
  {
    id: 'v-003',
    recordedAt: '2024-01-20T08:45:00Z',
    bloodPressureSystolic: 115,
    bloodPressureDiastolic: 74,
    heartRate: 68,
    temperature: 36.6,
    oxygenSaturation: 99,
    weight: 64,
    height: 165,
    bmi: 23.5,
    bloodGlucose: 5.1,
    source: 'device',
  },
]

export const mockAllergies = [
  { id: 'a-001', allergen: 'Penicillin', type: 'drug', severity: 'severe', reaction: 'Anaphylaxis', isActive: true },
  { id: 'a-002', allergen: 'Peanuts', type: 'food', severity: 'moderate', reaction: 'Hives, swelling', isActive: true },
  { id: 'a-003', allergen: 'Dust mites', type: 'environmental', severity: 'mild', reaction: 'Rhinitis', isActive: true },
]

export const mockDiagnoses = [
  {
    id: 'd-001',
    icdCode: 'E11',
    description: 'Type 2 Diabetes Mellitus',
    type: 'chronic',
    onsetDate: '2020-03-10',
    isActive: true,
    notes: 'Controlled with oral medication',
  },
  {
    id: 'd-002',
    icdCode: 'I10',
    description: 'Essential Hypertension',
    type: 'chronic',
    onsetDate: '2021-06-15',
    isActive: true,
    notes: 'Managed with lifestyle changes and medication',
  },
  {
    id: 'd-003',
    icdCode: 'J06.9',
    description: 'Acute Upper Respiratory Infection',
    type: 'acute',
    onsetDate: '2024-02-10',
    resolvedDate: '2024-02-24',
    isActive: false,
    notes: 'Resolved with antibiotics',
  },
]

export const mockPrescriptions = [
  {
    id: 'rx-001',
    prescriptionCode: 'RX-GH-20240301-001',
    digitalToken: 'tok-abc-123-xyz',
    status: 'PENDING',
    issuedAt: '2024-03-01T10:00:00Z',
    expiresAt: '2024-04-01T10:00:00Z',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante', specialization: 'Internal Medicine' },
    facility: 'Korle-Bu Teaching Hospital',
    refillsAllowed: 3,
    refillsUsed: 1,
    medications: [
      {
        medicationName: 'Metformin',
        genericName: 'Metformin HCl',
        dosage: '500mg',
        form: 'tablet',
        frequency: 'Twice daily with meals',
        duration: '30 days',
        quantity: 60,
        instructions: 'Take with food to reduce stomach upset',
      },
      {
        medicationName: 'Lisinopril',
        genericName: 'Lisinopril',
        dosage: '10mg',
        form: 'tablet',
        frequency: 'Once daily in the morning',
        duration: '30 days',
        quantity: 30,
        instructions: 'Monitor blood pressure regularly',
      },
    ],
  },
  {
    id: 'rx-002',
    prescriptionCode: 'RX-GH-20240215-089',
    digitalToken: 'tok-def-456-uvw',
    status: 'DISPENSED',
    issuedAt: '2024-02-15T14:30:00Z',
    expiresAt: '2024-03-15T14:30:00Z',
    provider: { firstName: 'Dr. Ama', lastName: 'Boateng', specialization: 'Pulmonology' },
    facility: 'Trust Hospital, Accra',
    refillsAllowed: 0,
    refillsUsed: 0,
    medications: [
      {
        medicationName: 'Amoxicillin',
        genericName: 'Amoxicillin Trihydrate',
        dosage: '500mg',
        form: 'capsule',
        frequency: 'Three times daily',
        duration: '7 days',
        quantity: 21,
        instructions: 'Complete full course. Take at regular intervals',
      },
    ],
  },
]

export const mockAppointments = [
  {
    id: 'apt-001',
    type: 'IN_PERSON',
    status: 'CONFIRMED',
    scheduledAt: '2024-03-15T09:00:00Z',
    duration: 30,
    reason: 'Diabetes follow-up',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante', specialization: 'Internal Medicine' },
    facility: 'Korle-Bu Teaching Hospital',
  },
  {
    id: 'apt-002',
    type: 'TELEMEDICINE',
    status: 'SCHEDULED',
    scheduledAt: '2024-03-20T14:00:00Z',
    duration: 20,
    reason: 'Blood pressure review',
    provider: { firstName: 'Dr. Ama', lastName: 'Boateng', specialization: 'Cardiology' },
    meetingLink: 'https://meet.ehealth-africa.gh/room/apt-002',
    facility: 'Virtual Clinic',
  },
  {
    id: 'apt-003',
    type: 'IN_PERSON',
    status: 'COMPLETED',
    scheduledAt: '2024-02-10T11:00:00Z',
    duration: 45,
    reason: 'Annual health checkup',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante', specialization: 'Internal Medicine' },
    facility: 'Korle-Bu Teaching Hospital',
  },
]

type LabTest = {
  testName: string
  testCode: string
  result: string | null
  unit: string | null
  referenceRange: string | null
  isAbnormal: boolean | null
  interpretation: string | null
}

type LabResult = {
  id: string
  status: string
  orderDate: string
  completedDate: string | null
  urgency: string
  provider: { firstName: string; lastName: string }
  facility: string
  tests: LabTest[]
}

export const mockLabResults: LabResult[] = [
  {
    id: 'lab-001',
    status: 'COMPLETED',
    orderDate: '2024-02-10T11:00:00Z',
    completedDate: '2024-02-12T16:00:00Z',
    urgency: 'routine',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante' },
    facility: 'Korle-Bu Lab',
    tests: [
      { testName: 'HbA1c', testCode: 'HBA1C', result: '7.2', unit: '%', referenceRange: '<7.0', isAbnormal: true, interpretation: 'Slightly elevated - diabetes management review needed' },
      { testName: 'Fasting Blood Glucose', testCode: 'FBG', result: '126', unit: 'mg/dL', referenceRange: '70-100', isAbnormal: true, interpretation: 'Elevated fasting glucose' },
      { testName: 'Total Cholesterol', testCode: 'CHOL', result: '185', unit: 'mg/dL', referenceRange: '<200', isAbnormal: false, interpretation: 'Within normal range' },
      { testName: 'HDL Cholesterol', testCode: 'HDL', result: '52', unit: 'mg/dL', referenceRange: '>50', isAbnormal: false, interpretation: 'Acceptable' },
      { testName: 'LDL Cholesterol', testCode: 'LDL', result: '110', unit: 'mg/dL', referenceRange: '<130', isAbnormal: false, interpretation: 'Within normal range' },
    ],
  },
  {
    id: 'lab-002',
    status: 'COMPLETED',
    orderDate: '2024-01-05T09:00:00Z',
    completedDate: '2024-01-07T14:00:00Z',
    urgency: 'routine',
    provider: { firstName: 'Dr. Ama', lastName: 'Boateng' },
    facility: 'Trust Hospital Lab',
    tests: [
      { testName: 'Full Blood Count', testCode: 'FBC', result: 'Normal', unit: null, referenceRange: null, isAbnormal: false, interpretation: 'All parameters within normal limits' },
      { testName: 'Kidney Function Test', testCode: 'KFT', result: 'Normal', unit: null, referenceRange: null, isAbnormal: false, interpretation: 'Creatinine and BUN within normal range' },
    ],
  },
  {
    id: 'lab-003',
    status: 'IN_PROGRESS',
    orderDate: '2024-03-01T10:00:00Z',
    completedDate: null,
    urgency: 'urgent',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante' },
    facility: 'Korle-Bu Lab',
    tests: [
      { testName: 'Thyroid Function Test', testCode: 'TFT', result: null, unit: null, referenceRange: null, isAbnormal: null, interpretation: null },
      { testName: 'Vitamin D Level', testCode: 'VITD', result: null, unit: null, referenceRange: null, isAbnormal: null, interpretation: null },
    ],
  },
]

export const mockVaccinations = [
  { id: 'vac-001', vaccineName: 'COVID-19 (AstraZeneca)', doseNumber: 2, administeredAt: '2021-08-20', batchNumber: 'AZ-2021-089', facility: 'Accra Sports Stadium Vaccination Center' },
  { id: 'vac-002', vaccineName: 'Influenza', doseNumber: 1, administeredAt: '2023-11-05', batchNumber: 'FLU-2023-456', facility: 'Korle-Bu Teaching Hospital' },
  { id: 'vac-003', vaccineName: 'Hepatitis B', doseNumber: 3, administeredAt: '2019-03-14', batchNumber: 'HEP-2019-123', facility: 'Trust Hospital' },
  { id: 'vac-004', vaccineName: 'Yellow Fever', doseNumber: 1, administeredAt: '2018-01-10', batchNumber: 'YF-2018-007', facility: 'Noguchi Memorial Institute' },
]

export const mockConsultations = [
  {
    id: 'con-001',
    date: '2024-03-01T10:00:00Z',
    chiefComplaint: 'Routine diabetes and hypertension review',
    assessment: 'Diabetes mellitus type 2 - fair control. Hypertension - good control.',
    plan: 'Continue current medications. Increase physical activity. Dietary counseling.',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante', specialization: 'Internal Medicine' },
    facility: 'Korle-Bu Teaching Hospital',
    isTelemedicine: false,
    followUpDate: '2024-06-01',
  },
  {
    id: 'con-002',
    date: '2024-02-10T11:00:00Z',
    chiefComplaint: 'Cough and fever for 3 days',
    assessment: 'Acute upper respiratory tract infection',
    plan: 'Antibiotics, rest, adequate hydration. Follow up in 1 week if no improvement.',
    provider: { firstName: 'Dr. Ama', lastName: 'Boateng', specialization: 'Pulmonology' },
    facility: 'Trust Hospital',
    isTelemedicine: false,
    followUpDate: '2024-02-17',
  },
  {
    id: 'con-003',
    date: '2024-01-05T14:00:00Z',
    chiefComplaint: 'Annual health review',
    assessment: 'Overall health status satisfactory. Recommend lifestyle modifications.',
    plan: 'Lab tests ordered. Dietary and exercise counseling provided.',
    provider: { firstName: 'Dr. Kwame', lastName: 'Asante', specialization: 'Internal Medicine' },
    facility: 'Virtual Clinic',
    isTelemedicine: true,
    followUpDate: null,
  },
]

type Referral = {
  id: string
  status: string
  reason: string
  urgency: string
  referralDate: string
  completedDate: string | null
  notes?: string
  referringProvider: { firstName: string; lastName: string }
  receivingProvider: { firstName: string; lastName: string; specialization: string } | null
  facility: string
}

export const mockReferrals: Referral[] = [
  {
    id: 'ref-001',
    status: 'COMPLETED',
    reason: 'Ophthalmology review for diabetic retinopathy screening',
    urgency: 'routine',
    referralDate: '2024-01-05T14:00:00Z',
    completedDate: '2024-01-20',
    referringProvider: { firstName: 'Dr. Kwame', lastName: 'Asante' },
    receivingProvider: { firstName: 'Dr. Akosua', lastName: 'Darkwah', specialization: 'Ophthalmology' },
    facility: 'Eye Centre, Korle-Bu',
  },
  {
    id: 'ref-002',
    status: 'PENDING',
    reason: 'Cardiology consultation for hypertension management optimization',
    urgency: 'routine',
    referralDate: '2024-03-01T10:00:00Z',
    completedDate: null,
    referringProvider: { firstName: 'Dr. Kwame', lastName: 'Asante' },
    receivingProvider: null,
    facility: 'Cardiology Unit, Korle-Bu',
  },
]

// Provider mock data
export const mockProviderDashboard = {
  todayAppointments: 12,
  pendingPrescriptions: 8,
  pendingLabResults: 5,
  pendingReferrals: 3,
  recentPatients: [
    { id: 'pat-001', name: 'Amara Mensah', healthId: 'GH-2024-0001234', age: 35, condition: 'Diabetes, Hypertension', lastVisit: '2024-03-01' },
    { id: 'pat-002', name: 'Kweku Boateng', healthId: 'GH-2023-0005678', age: 52, condition: 'Malaria', lastVisit: '2024-03-01' },
    { id: 'pat-003', name: 'Abena Owusu', healthId: 'GH-2022-0009012', age: 28, condition: 'Prenatal Care', lastVisit: '2024-02-28' },
    { id: 'pat-004', name: 'Yaw Asante', healthId: 'GH-2021-0003456', age: 67, condition: 'Heart Failure', lastVisit: '2024-02-27' },
    { id: 'pat-005', name: 'Ama Tetteh', healthId: 'GH-2024-0007890', age: 41, condition: 'Type 2 Diabetes', lastVisit: '2024-02-27' },
  ],
}

// Pharmacy mock data
export const mockPharmacyPrescriptions = [
  {
    id: 'rx-001',
    prescriptionCode: 'RX-GH-20240301-001',
    status: 'PENDING',
    patient: { name: 'Amara Mensah', healthId: 'GH-2024-0001234', dob: '1988-05-14' },
    provider: { name: 'Dr. Kwame Asante', facility: 'Korle-Bu Teaching Hospital' },
    issuedAt: '2024-03-01T10:00:00Z',
    expiresAt: '2024-04-01T10:00:00Z',
    medications: [
      { name: 'Metformin 500mg', quantity: 60, form: 'tablet', instructions: 'Twice daily with meals' },
      { name: 'Lisinopril 10mg', quantity: 30, form: 'tablet', instructions: 'Once daily' },
    ],
    insuranceScheme: 'NHIS',
    memberId: 'NHIS-789012',
  },
  {
    id: 'rx-005',
    prescriptionCode: 'RX-GH-20240301-089',
    status: 'PENDING',
    patient: { name: 'Kweku Boateng', healthId: 'GH-2023-0005678', dob: '1972-11-23' },
    provider: { name: 'Dr. Ama Boateng', facility: 'Trust Hospital' },
    issuedAt: '2024-03-01T11:30:00Z',
    expiresAt: '2024-04-01T11:30:00Z',
    medications: [
      { name: 'Artemether-Lumefantrine 80/480mg', quantity: 24, form: 'tablet', instructions: 'Twice daily for 3 days' },
    ],
    insuranceScheme: 'NHIS',
    memberId: 'NHIS-345678',
  },
]

// Public health analytics mock data
export const mockPublicHealthData = {
  diseaseStats: [
    { disease: 'Malaria', cases: 15420, change: -12, severity: 'high' },
    { disease: 'Hypertension', cases: 45200, change: +5, severity: 'medium' },
    { disease: 'Diabetes', cases: 32100, change: +8, severity: 'medium' },
    { disease: 'Tuberculosis', cases: 2340, change: -18, severity: 'high' },
    { disease: 'HIV/AIDS', cases: 8970, change: -7, severity: 'high' },
    { disease: 'COVID-19', cases: 456, change: -45, severity: 'low' },
  ],
  vaccinationCoverage: [
    { vaccine: 'COVID-19', coverage: 68, target: 80 },
    { vaccine: 'Polio', coverage: 92, target: 95 },
    { vaccine: 'Measles', coverage: 87, target: 90 },
    { vaccine: 'BCG', coverage: 94, target: 95 },
    { vaccine: 'Hepatitis B', coverage: 78, target: 85 },
    { vaccine: 'Yellow Fever', coverage: 71, target: 80 },
  ],
  monthlyTrend: [
    { month: 'Oct', malaria: 1842, hypertension: 3801, diabetes: 2678 },
    { month: 'Nov', malaria: 1620, hypertension: 3920, diabetes: 2750 },
    { month: 'Dec', malaria: 1380, hypertension: 3750, diabetes: 2690 },
    { month: 'Jan', malaria: 1250, hypertension: 3890, diabetes: 2820 },
    { month: 'Feb', malaria: 1190, hypertension: 4010, diabetes: 2910 },
    { month: 'Mar', malaria: 1100, hypertension: 4100, diabetes: 2980 },
  ],
  regionalData: [
    { region: 'Greater Accra', cases: 28450, facilities: 245, providers: 1890 },
    { region: 'Ashanti', cases: 21340, facilities: 198, providers: 1540 },
    { region: 'Northern', cases: 12300, facilities: 89, providers: 430 },
    { region: 'Western', cases: 9870, facilities: 112, providers: 670 },
    { region: 'Eastern', cases: 8920, facilities: 98, providers: 590 },
    { region: 'Central', cases: 7650, facilities: 87, providers: 520 },
  ],
  antibioticUsage: {
    total: 124500,
    byClass: [
      { class: 'Penicillins', count: 45200, percentage: 36 },
      { class: 'Macrolides', count: 28900, percentage: 23 },
      { class: 'Fluoroquinolones', count: 18700, percentage: 15 },
      { class: 'Cephalosporins', count: 16400, percentage: 13 },
      { class: 'Others', count: 15300, percentage: 12 },
    ],
  },
}

export const mockWearableData = [
  { date: '2024-03-01', heartRate: 72, steps: 7234, sleep: 7.2, bloodGlucose: 5.4, bloodPressure: '118/76' },
  { date: '2024-02-29', heartRate: 75, steps: 8901, sleep: 6.8, bloodGlucose: 5.7, bloodPressure: '120/78' },
  { date: '2024-02-28', heartRate: 70, steps: 6543, sleep: 7.5, bloodGlucose: 5.2, bloodPressure: '116/74' },
  { date: '2024-02-27', heartRate: 78, steps: 9102, sleep: 6.5, bloodGlucose: 5.9, bloodPressure: '122/80' },
  { date: '2024-02-26', heartRate: 73, steps: 7890, sleep: 7.8, bloodGlucose: 5.3, bloodPressure: '117/75' },
  { date: '2024-02-25', heartRate: 71, steps: 5678, sleep: 8.0, bloodGlucose: 5.1, bloodPressure: '115/73' },
  { date: '2024-02-24', heartRate: 76, steps: 8345, sleep: 7.0, bloodGlucose: 5.6, bloodPressure: '119/77' },
]
