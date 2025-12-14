// SPE-M Criteria Definitions
// Sistema de Pontuação Estética Médica - 8 Critérios

export interface CriterionField {
  id: string;
  label: string;
  type: "select" | "radio" | "number" | "text";
  options?: { value: string; label: string; score: number }[];
  min?: number;
  max?: number;
  scoreWeight?: number;
}

export interface Criterion {
  number: number;
  name: string;
  description: string;
  fields: CriterionField[];
  maxScore: number;
}

export const SPE_M_CRITERIA: Criterion[] = [
  // Criterion 1: Análise Facial Frontal
  {
    number: 1,
    name: "Análise Facial Frontal",
    description: "Avaliação da simetria e proporções faciais frontais",
    maxScore: 10,
    fields: [
      {
        id: "facial_symmetry",
        label: "Simetria Facial",
        type: "select",
        options: [
          { value: "symmetric", label: "Simétrico", score: 10 },
          { value: "mild_asymmetry", label: "Assimetria Leve", score: 7 },
          { value: "moderate_asymmetry", label: "Assimetria Moderada", score: 4 },
          { value: "severe_asymmetry", label: "Assimetria Severa", score: 2 },
        ],
      },
      {
        id: "facial_proportions",
        label: "Proporções dos Terços Faciais",
        type: "select",
        options: [
          { value: "balanced", label: "Equilibrado", score: 10 },
          { value: "mild_imbalance", label: "Leve Desequilíbrio", score: 7 },
          { value: "moderate_imbalance", label: "Desequilíbrio Moderado", score: 4 },
          { value: "severe_imbalance", label: "Desequilíbrio Severo", score: 2 },
        ],
      },
    ],
  },

  // Criterion 2: Análise Facial Lateral
  {
    number: 2,
    name: "Análise Facial Lateral",
    description: "Avaliação do perfil facial e projeções",
    maxScore: 10,
    fields: [
      {
        id: "facial_profile",
        label: "Perfil Facial",
        type: "select",
        options: [
          { value: "straight", label: "Reto/Harmônico", score: 10 },
          { value: "mild_convex", label: "Levemente Convexo", score: 7 },
          { value: "convex", label: "Convexo", score: 5 },
          { value: "concave", label: "Côncavo", score: 4 },
        ],
      },
      {
        id: "nasofrontal_angle",
        label: "Ângulo Nasofrontal",
        type: "select",
        options: [
          { value: "ideal", label: "Ideal (115-130°)", score: 10 },
          { value: "acceptable", label: "Aceitável", score: 7 },
          { value: "altered", label: "Alterado", score: 4 },
        ],
      },
      {
        id: "mentocervical_angle",
        label: "Ângulo Mentocervical",
        type: "select",
        options: [
          { value: "defined", label: "Bem Definido (105-120°)", score: 10 },
          { value: "acceptable", label: "Aceitável", score: 7 },
          { value: "obtuse", label: "Obtuso", score: 4 },
        ],
      },
    ],
  },

  // Criterion 3: Análise Labial e Perioral
  {
    number: 3,
    name: "Análise Labial e Perioral",
    description: "Avaliação dos lábios e região perioral",
    maxScore: 10,
    fields: [
      {
        id: "lip_volume",
        label: "Volume Labial",
        type: "select",
        options: [
          { value: "ideal", label: "Ideal/Proporcional", score: 10 },
          { value: "slightly_thin", label: "Levemente Fino", score: 7 },
          { value: "thin", label: "Fino", score: 5 },
          { value: "very_thin", label: "Muito Fino", score: 3 },
        ],
      },
      {
        id: "lip_projection",
        label: "Projeção Labial",
        type: "select",
        options: [
          { value: "adequate", label: "Adequada", score: 10 },
          { value: "reduced", label: "Reduzida", score: 6 },
          { value: "retruded", label: "Retruída", score: 3 },
        ],
      },
      {
        id: "nasolabial_folds",
        label: "Sulcos Nasogenianos",
        type: "select",
        options: [
          { value: "absent_minimal", label: "Ausentes/Mínimos", score: 10 },
          { value: "mild", label: "Leves", score: 7 },
          { value: "moderate", label: "Moderados", score: 5 },
          { value: "deep", label: "Profundos", score: 2 },
        ],
      },
      {
        id: "marionette_lines",
        label: "Linhas de Marionete",
        type: "select",
        options: [
          { value: "absent", label: "Ausentes", score: 10 },
          { value: "mild", label: "Leves", score: 7 },
          { value: "moderate", label: "Moderadas", score: 4 },
          { value: "severe", label: "Severas", score: 2 },
        ],
      },
    ],
  },

  // Criterion 4: Análise Nasal
  {
    number: 4,
    name: "Análise Nasal",
    description: "Avaliação da anatomia nasal",
    maxScore: 10,
    fields: [
      {
        id: "nasal_dorsum",
        label: "Dorso Nasal",
        type: "select",
        options: [
          { value: "straight", label: "Retificado", score: 10 },
          { value: "projected", label: "Projetado", score: 7 },
          { value: "gibbus", label: "Giboso", score: 5 },
          { value: "scooped", label: "Escavado", score: 4 },
        ],
      },
      {
        id: "nasal_tip",
        label: "Ponta Nasal",
        type: "select",
        options: [
          { value: "adequate", label: "Adequada", score: 10 },
          { value: "ptotic", label: "Ptótica", score: 6 },
          { value: "elevated", label: "Elevada", score: 6 },
          { value: "bulbous", label: "Bulbosa", score: 4 },
        ],
      },
      {
        id: "nasal_base",
        label: "Base Nasal",
        type: "select",
        options: [
          { value: "proportional", label: "Proporcional", score: 10 },
          { value: "wide", label: "Larga", score: 6 },
          { value: "narrow", label: "Estreita", score: 6 },
        ],
      },
    ],
  },

  // Criterion 5: Análise Zigomática e Região Média
  {
    number: 5,
    name: "Análise Zigomática e Região Média",
    description: "Avaliação da região média da face e zigomáticos",
    maxScore: 10,
    fields: [
      {
        id: "malar_projection",
        label: "Projeção Malar",
        type: "select",
        options: [
          { value: "ideal", label: "Ideal", score: 10 },
          { value: "reduced", label: "Reduzida", score: 6 },
          { value: "flat", label: "Plana", score: 3 },
        ],
      },
      {
        id: "midface_volume",
        label: "Volume da Região Média",
        type: "select",
        options: [
          { value: "adequate", label: "Adequado", score: 10 },
          { value: "mild_loss", label: "Perda Leve", score: 7 },
          { value: "moderate_loss", label: "Perda Moderada", score: 5 },
          { value: "severe_loss", label: "Perda Severa", score: 2 },
        ],
      },
      {
        id: "tear_trough",
        label: "Sulco Nasojugal",
        type: "select",
        options: [
          { value: "absent_minimal", label: "Ausente/Mínimo", score: 10 },
          { value: "mild", label: "Leve", score: 7 },
          { value: "moderate", label: "Moderado", score: 4 },
          { value: "deep", label: "Profundo", score: 2 },
        ],
      },
    ],
  },

  // Criterion 6: Análise Mandibular e Mento
  {
    number: 6,
    name: "Análise Mandibular e Mento",
    description: "Avaliação do contorno mandibular e mento",
    maxScore: 10,
    fields: [
      {
        id: "mandibular_contour",
        label: "Contorno Mandibular",
        type: "select",
        options: [
          { value: "defined", label: "Bem Definido", score: 10 },
          { value: "acceptable", label: "Aceitável", score: 7 },
          { value: "undefined", label: "Pouco Definido", score: 4 },
          { value: "jowling", label: "Jowl Presente", score: 2 },
        ],
      },
      {
        id: "chin_projection",
        label: "Projeção do Mento",
        type: "select",
        options: [
          { value: "ideal", label: "Ideal", score: 10 },
          { value: "mild_retrusion", label: "Leve Retrusão", score: 6 },
          { value: "retrusion", label: "Retrusão", score: 3 },
          { value: "prognathism", label: "Prognatismo", score: 5 },
        ],
      },
      {
        id: "mandibular_angle",
        label: "Ângulo Mandibular",
        type: "select",
        options: [
          { value: "defined", label: "Bem Definido (110-120°)", score: 10 },
          { value: "obtuse", label: "Obtuso", score: 6 },
          { value: "acute", label: "Agudo", score: 5 },
        ],
      },
    ],
  },

  // Criterion 7: Análise Cervical
  {
    number: 7,
    name: "Análise Cervical",
    description: "Avaliação da região cervical e pescoço",
    maxScore: 10,
    fields: [
      {
        id: "cervical_contour",
        label: "Contorno Cervical",
        type: "select",
        options: [
          { value: "defined", label: "Bem Definido", score: 10 },
          { value: "acceptable", label: "Aceitável", score: 7 },
          { value: "soft", label: "Suavizado", score: 4 },
          { value: "undefined", label: "Indefinido", score: 2 },
        ],
      },
      {
        id: "platysma_bands",
        label: "Bandas Platismais",
        type: "select",
        options: [
          { value: "absent", label: "Ausentes", score: 10 },
          { value: "mild", label: "Leves", score: 7 },
          { value: "moderate", label: "Moderadas", score: 4 },
          { value: "severe", label: "Severas", score: 2 },
        ],
      },
      {
        id: "submental_fat",
        label: "Gordura Submentoniana",
        type: "select",
        options: [
          { value: "absent_minimal", label: "Ausente/Mínima", score: 10 },
          { value: "mild", label: "Leve", score: 7 },
          { value: "moderate", label: "Moderada", score: 4 },
          { value: "severe", label: "Severa", score: 2 },
        ],
      },
    ],
  },

  // Criterion 8: Avaliações Complementares
  {
    number: 8,
    name: "Avaliações Complementares",
    description: "Qualidade de pele, textura e fatores complementares",
    maxScore: 10,
    fields: [
      {
        id: "skin_quality",
        label: "Qualidade da Pele",
        type: "select",
        options: [
          { value: "excellent", label: "Excelente", score: 10 },
          { value: "good", label: "Boa", score: 7 },
          { value: "fair", label: "Regular", score: 5 },
          { value: "poor", label: "Ruim", score: 2 },
        ],
      },
      {
        id: "skin_texture",
        label: "Textura da Pele",
        type: "select",
        options: [
          { value: "smooth", label: "Lisa", score: 10 },
          { value: "mild_irregularity", label: "Leve Irregularidade", score: 7 },
          { value: "moderate_irregularity", label: "Irregularidade Moderada", score: 5 },
          { value: "severe_irregularity", label: "Irregularidade Severa", score: 2 },
        ],
      },
      {
        id: "pigmentation",
        label: "Pigmentação",
        type: "select",
        options: [
          { value: "uniform", label: "Uniforme", score: 10 },
          { value: "mild_changes", label: "Alterações Leves", score: 7 },
          { value: "moderate_changes", label: "Alterações Moderadas", score: 5 },
          { value: "severe_changes", label: "Alterações Severas", score: 2 },
        ],
      },
      {
        id: "facial_volume",
        label: "Volume Facial Global",
        type: "select",
        options: [
          { value: "adequate", label: "Adequado", score: 10 },
          { value: "mild_loss", label: "Perda Leve", score: 7 },
          { value: "moderate_loss", label: "Perda Moderada", score: 5 },
          { value: "severe_loss", label: "Perda Severa", score: 2 },
        ],
      },
    ],
  },
];

// Helper function to calculate score for a criterion
export function calculateCriterionScore(
  criterionNumber: number,
  formData: Record<string, string>
): number {
  const criterion = SPE_M_CRITERIA.find((c) => c.number === criterionNumber);
  if (!criterion) return 0;

  let totalScore = 0;
  let totalFields = 0;

  criterion.fields.forEach((field) => {
    const selectedValue = formData[field.id];
    if (!selectedValue) return;

    if (field.options) {
      const selectedOption = field.options.find(
        (opt) => opt.value === selectedValue
      );
      if (selectedOption) {
        totalScore += selectedOption.score;
        totalFields++;
      }
    }
  });

  // Average score for this criterion
  return totalFields > 0 ? totalScore / totalFields : 0;
}

// Helper function to calculate total SPE-M score
export function calculateTotalScore(
  criteriaData: Array<{ criterionNumber: number; data: Record<string, string> }>
): number {
  let totalScore = 0;

  criteriaData.forEach(({ criterionNumber, data }) => {
    const score = calculateCriterionScore(criterionNumber, data);
    totalScore += score;
  });

  // Average of all 8 criteria
  return criteriaData.length > 0 ? totalScore / criteriaData.length : 0;
}

// Helper function to classify profile based on score
export function classifyProfile(score: number): {
  classification: "low" | "medium" | "high";
  label: string;
  description: string;
  color: string;
} {
  if (score >= 8) {
    return {
      classification: "low",
      label: "Baixo Risco",
      description: "Perfil adequado, intervenções mínimas podem ser indicadas",
      color: "text-green-600",
    };
  } else if (score >= 5) {
    return {
      classification: "medium",
      label: "Médio Risco",
      description: "Perfil moderado, intervenções estéticas moderadas recomendadas",
      color: "text-yellow-600",
    };
  } else {
    return {
      classification: "high",
      label: "Alto Risco",
      description: "Perfil que requer intervenções estéticas significativas",
      color: "text-red-600",
    };
  }
}

// Image types for SPE-M form
export const IMAGE_TYPES = [
  { id: "frontal", label: "Frontal", description: "Vista frontal do rosto" },
  { id: "profile_right", label: "Perfil Direito", description: "Perfil lateral direito" },
  { id: "profile_left", label: "Perfil Esquerdo", description: "Perfil lateral esquerdo" },
  { id: "oblique_right", label: "¾ Direito", description: "Vista oblíqua direita" },
  { id: "oblique_left", label: "¾ Esquerdo", description: "Vista oblíqua esquerda" },
  { id: "base", label: "Base", description: "Vista inferior (base do nariz)" },
] as const;

export type ImageType = (typeof IMAGE_TYPES)[number]["id"];
