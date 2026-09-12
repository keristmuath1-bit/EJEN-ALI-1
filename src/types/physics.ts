export interface BaseQuantity {
  id: string;
  name: string;
  symbol: string;
  siUnit: string;
  unitSymbol: string;
  pillar: 'Tekno' | 'Kombat' | 'Intelek' | 'Neuro';
  description: string;
  application: string;
}

export interface DerivedQuantity {
  id: string;
  name: string;
  symbol: string;
  formula: string;
  derivation: string;
  siUnit: string;
  unitSymbol: string;
  specialUnit?: string;
  category: 'Kinematik' | 'Dinamik' | 'Mekanik' | 'Termofizik';
}

export interface VectorScalarItem {
  id: string;
  name: string;
  type: 'skalar' | 'vektor';
  symbol: string;
  unit: string;
  scenario: string;
  yoyoAngle?: number;
  yoyoMagnitude?: number;
}

export const BASE_QUANTITIES: BaseQuantity[] = [
  {
    id: 'panjang',
    name: 'Panjang (Length)',
    symbol: 'l, s',
    siUnit: 'meter',
    unitSymbol: 'm',
    pillar: 'Intelek',
    description: 'Jarak antara dua titik dalam ruang fizikal.',
    application: 'Pengimbas I.R.I.S mengukur jarak sasaran dron musuh.'
  },
  {
    id: 'jisim',
    name: 'Jisim (Mass)',
    symbol: 'm',
    siUnit: 'kilogram',
    unitSymbol: 'kg',
    pillar: 'Kombat',
    description: 'Kuantiti jirim yang terkandung dalam sesuatu objek.',
    application: 'Inersia perisai tempur Ejen Bakar semasa menahan impak letupan.'
  },
  {
    id: 'masa',
    name: 'Masa (Time)',
    symbol: 't',
    siUnit: 'saat',
    unitSymbol: 's',
    pillar: 'Tekno',
    description: 'Tempoh selang antara dua peristiwa atau detik.',
    application: 'Kiraan detik pemintasan kod siber pertahanan M.A.T.A HQ.'
  },
  {
    id: 'suhu',
    name: 'Suhu Termodinamik (Temperature)',
    symbol: 'T',
    siUnit: 'kelvin',
    unitSymbol: 'K',
    pillar: 'Neuro',
    description: 'Darjah kepanasan atau purata tenaga kinetik zarah.',
    application: 'Pengawasan suhu teras reaktor kuantum Cyberaya.'
  },
  {
    id: 'arus',
    name: 'Arus Elektrik (Electric Current)',
    symbol: 'I',
    siUnit: 'ampere',
    unitSymbol: 'A',
    pillar: 'Tekno',
    description: 'Kadar pengaliran cas elektrik melalui konduktor.',
    application: 'Arus voltan tinggi pada kabel yoyo aero dinamik Ejen Ali.'
  },
  {
    id: 'keamatan',
    name: 'Keamatan Berluminositi (Luminous Intensity)',
    symbol: 'I_v',
    siUnit: 'candela',
    unitSymbol: 'cd',
    pillar: 'Intelek',
    description: 'Kuasa sinaran cahaya yang dipancarkan bagi setiap sudut padu.',
    application: 'Pancaran laser strob hologram pembutaan taktikal Alicia.'
  },
  {
    id: 'bahan',
    name: 'Kuantiti Bahan (Amount of Substance)',
    symbol: 'n',
    siUnit: 'mol',
    unitSymbol: 'mol',
    pillar: 'Neuro',
    description: 'Bilangan entiti asas (zarah/atom/molekul) dalam sesuatu bahan.',
    application: 'Formulasi sintesis bahan nano kristal untuk gajet ejen.'
  }
];

export const DERIVED_QUANTITIES: DerivedQuantity[] = [
  {
    id: 'ketumpatan',
    name: 'Ketumpatan (Density)',
    symbol: 'ρ',
    formula: 'ρ = m / V',
    derivation: 'Jisim ÷ (Panjang × Lebar × Tinggi)',
    siUnit: 'kilogram per meter padu',
    unitSymbol: 'kg m⁻³',
    category: 'Mekanik'
  },
  {
    id: 'laju',
    name: 'Laju / Halaju (Speed / Velocity)',
    symbol: 'v',
    formula: 'v = s / t',
    derivation: 'Panjang ÷ Masa',
    siUnit: 'meter per saat',
    unitSymbol: 'm s⁻¹',
    category: 'Kinematik'
  },
  {
    id: 'pecutan',
    name: 'Pecutan (Acceleration)',
    symbol: 'a',
    formula: 'a = (v - u) / t',
    derivation: 'Perubahan Halaju ÷ Masa',
    siUnit: 'meter per saat kuasa dua',
    unitSymbol: 'm s⁻²',
    category: 'Kinematik'
  },
  {
    id: 'daya',
    name: 'Daya (Force)',
    symbol: 'F',
    formula: 'F = m × a',
    derivation: 'Jisim × Pecutan = kg × m s⁻²',
    siUnit: 'kilogram meter per saat kuasa dua',
    unitSymbol: 'kg m s⁻²',
    specialUnit: 'Newton (N)',
    category: 'Dinamik'
  },
  {
    id: 'momentum',
    name: 'Momentum',
    symbol: 'p',
    formula: 'p = m × v',
    derivation: 'Jisim × Halaju = kg × m s⁻¹',
    siUnit: 'kilogram meter per saat',
    unitSymbol: 'kg m s⁻¹',
    specialUnit: 'N s',
    category: 'Dinamik'
  },
  {
    id: 'tekanan',
    name: 'Tekanan (Pressure)',
    symbol: 'P',
    formula: 'P = F / A',
    derivation: 'Daya ÷ Luas = N ÷ m²',
    siUnit: 'newton per meter persegi',
    unitSymbol: 'N m⁻²',
    specialUnit: 'Pascal (Pa)',
    category: 'Mekanik'
  }
];

export const SCALAR_VECTOR_ITEMS: VectorScalarItem[] = [
  {
    id: '1',
    name: 'Jarak (Distance)',
    type: 'skalar',
    symbol: 'd',
    unit: 'meter (m)',
    scenario: 'Dron meninjau sejauh 1,200 m di sekitar perimeter Cyberaya tanpa arah khusus.'
  },
  {
    id: '2',
    name: 'Sesaran (Displacement)',
    type: 'vektor',
    symbol: 's',
    unit: 'meter (m)',
    scenario: 'Ali melompat sejauh 85 m ke arah Barat Laut 30° menuju ke menara M.A.T.A.',
    yoyoAngle: 120,
    yoyoMagnitude: 85
  },
  {
    id: '3',
    name: 'Laju (Speed)',
    type: 'skalar',
    symbol: 'v',
    unit: 'm s⁻¹',
    scenario: 'Skuter aero Ali meluncur dengan kelajuan berterusan 45 m s⁻¹.'
  },
  {
    id: '4',
    name: 'Halaju (Velocity)',
    type: 'vektor',
    symbol: 'v',
    unit: 'm s⁻¹',
    scenario: 'Yoyo Ali dilontarkan pada halaju 35 m s⁻¹ bersudut 45° tepat ke perisai musuh.',
    yoyoAngle: 45,
    yoyoMagnitude: 35
  },
  {
    id: '5',
    name: 'Jisim (Mass)',
    type: 'skalar',
    symbol: 'm',
    unit: 'kg',
    scenario: 'Gajet cermin mata I.R.I.S mempunyai jisim bersih tepat 0.12 kg.'
  },
  {
    id: '6',
    name: 'Daya (Force)',
    type: 'vektor',
    symbol: 'F',
    unit: 'Newton (N)',
    scenario: 'Tumbukan perisai Ejen Bakar mengenakan daya impak 4,500 N ke arah hadapan.',
    yoyoAngle: 0,
    yoyoMagnitude: 90
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Antara kuantiti fizik berikut, yang manakah merupakan KUANTITI ASAS?",
    options: ["Ketumpatan (Density)", "Suhu Termodinamik (Temperature)", "Halaju (Velocity)", "Daya (Force)"],
    correctIndex: 1,
    explanation: "Suhu termodinamik (Kelvin, K) ialah salah satu daripada 7 Kuantiti Asas SI."
  },
  {
    id: 2,
    question: "Apakah unit S.I bagi kuantiti asas 'Arus Elektrik'?",
    options: ["Volt (V)", "Watt (W)", "Ampere (A)", "Ohm (Ω)"],
    correctIndex: 2,
    explanation: "Unit SI asas bagi arus elektrik ialah Ampere (A)."
  },
  {
    id: 3,
    question: "Diberi rumus Pecutan a = (v - u) / t. Apakah unit S.I terbitan bagi pecutan?",
    options: ["m s⁻¹", "m s⁻²", "kg m s⁻¹", "N m⁻²"],
    correctIndex: 1,
    explanation: "Perubahan halaju (m s⁻¹) dibahagikan masa (s) menghasilkan m s⁻²."
  },
  {
    id: 4,
    question: "Ejen Ali melontarkan Yoyo dengan halaju 25 m s⁻¹ ke arah Utara 45° Timur. Mengapa ini adalah Kuantiti Vektor?",
    options: [
      "Kerana hanya mempunyai nilai magnitud.",
      "Kerana mempunyai magnitud (25 m s⁻¹) DAN arah yang jelas (Utara 45° Timur).",
      "Kerana yoyo adalah gajet M.A.T.A.",
      "Kerana ia tidak mempunyai unit ukuran."
    ],
    correctIndex: 1,
    explanation: "Kuantiti vektor ditakrifkan mempunyai kedua-dua magnitud serta arah."
  }
];
