import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SPE_M_CRITERIA, classifyProfile } from "./spe-m-criteria";

interface PDFData {
  form: {
    id: string;
    totalScore: string;
    profileClassification: string;
    generalNotes: string | null;
    recommendations: string | null;
    createdAt: string;
    finalizedAt: string | null;
  };
  patient: {
    name: string;
    cpf: string;
    birthDate: string | null;
    phone: string | null;
    email: string | null;
  };
  criteria: Array<{
    criterionNumber: number;
    data: Record<string, string>;
    score: string;
    notes: string | null;
  }>;
  images: Array<{
    imageType: string;
    storageUrl: string;
  }>;
  doctor: {
    name: string;
    crm: string | null;
    specialty: string | null;
  };
}

export async function generateSPEMPDF(data: PDFData): Promise<jsPDF> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = 20;

  // Helper function to add new page if needed
  const checkPageBreak = (neededSpace: number) => {
    if (yPos + neededSpace > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // HEADER
  doc.setFillColor(37, 99, 235); // Primary blue
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("SISTEMA SPE-M", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Sistema de Pontuação Estética Médica", pageWidth / 2, 30, { align: "center" });

  yPos = 50;

  // PATIENT INFO
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Dados do Paciente", 14, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const patientInfo = [
    ["Nome:", data.patient.name],
    ["CPF:", data.patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")],
    ["Data de Nascimento:", data.patient.birthDate ? new Date(data.patient.birthDate).toLocaleDateString("pt-BR") : "-"],
    ["Telefone:", data.patient.phone || "-"],
    ["Email:", data.patient.email || "-"],
  ];

  patientInfo.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 14, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value, 50, yPos);
    yPos += 6;
  });

  yPos += 5;
  checkPageBreak(40);

  // EVALUATION INFO
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Informações da Avaliação", 14, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const evalInfo = [
    ["Data de Criação:", new Date(data.form.createdAt).toLocaleDateString("pt-BR")],
    ["Data de Finalização:", data.form.finalizedAt ? new Date(data.form.finalizedAt).toLocaleDateString("pt-BR") : "-"],
    ["Médico Responsável:", data.doctor.name],
    ["CRM:", data.doctor.crm || "-"],
    ["Especialidade:", data.doctor.specialty || "-"],
  ];

  evalInfo.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 14, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value, 60, yPos);
    yPos += 6;
  });

  yPos += 10;
  checkPageBreak(60);

  // SCORE SUMMARY
  const totalScore = parseFloat(data.form.totalScore);
  const classification = classifyProfile(totalScore);

  doc.setFillColor(240, 240, 240);
  doc.rect(14, yPos, pageWidth - 28, 40, "F");

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Resultado da Avaliação SPE-M", pageWidth / 2, yPos + 10, { align: "center" });

  doc.setFontSize(32);
  doc.setTextColor(37, 99, 235);
  doc.text(totalScore.toFixed(2), pageWidth / 2 - 40, yPos + 30, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("/ 10.00 pontos", pageWidth / 2, yPos + 30);

  // Classification badge
  const classColors: Record<string, [number, number, number]> = {
    low: [16, 185, 129],
    medium: [245, 158, 11],
    high: [239, 68, 68],
  };

  const [r, g, b] = classColors[classification.classification];
  doc.setFillColor(r, g, b);
  doc.roundedRect(pageWidth / 2 + 20, yPos + 22, 60, 10, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(classification.label, pageWidth / 2 + 50, yPos + 29, { align: "center" });

  yPos += 50;
  doc.setTextColor(0, 0, 0);

  // CRITERIA TABLE
  checkPageBreak(80);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Avaliação por Critérios", 14, yPos);
  yPos += 10;

  const tableData = data.criteria
    .sort((a, b) => a.criterionNumber - b.criterionNumber)
    .map((criterion) => {
      const criterionDef = SPE_M_CRITERIA.find((c) => c.number === criterion.criterionNumber);
      return [
        `${criterion.criterionNumber}`,
        criterionDef?.name || "",
        `${parseFloat(criterion.score).toFixed(2)} / ${criterionDef?.maxScore}`,
      ];
    });

  autoTable(doc, {
    startY: yPos,
    head: [["#", "Critério", "Pontuação"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 15, halign: "center" },
      1: { cellWidth: 120 },
      2: { cellWidth: 40, halign: "center" },
    },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // DETAILED CRITERIA
  doc.addPage();
  yPos = 20;

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Detalhamento dos Critérios", 14, yPos);
  yPos += 10;

  data.criteria
    .sort((a, b) => a.criterionNumber - b.criterionNumber)
    .forEach((criterion) => {
      checkPageBreak(50);

      const criterionDef = SPE_M_CRITERIA.find((c) => c.number === criterion.criterionNumber);
      if (!criterionDef) return;

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setFillColor(240, 240, 240);
      doc.rect(14, yPos - 5, pageWidth - 28, 8, "F");
      doc.text(`${criterion.criterionNumber}. ${criterionDef.name}`, 16, yPos);
      yPos += 10;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      criterionDef.fields.forEach((field) => {
        const selectedValue = criterion.data[field.id];
        if (!selectedValue) return;

        const selectedOption = field.options?.find((opt) => opt.value === selectedValue);
        if (!selectedOption) return;

        doc.setFont("helvetica", "bold");
        doc.text(`${field.label}:`, 16, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`${selectedOption.label} (${selectedOption.score} pts)`, 80, yPos);
        yPos += 5;
      });

      if (criterion.notes) {
        yPos += 2;
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100);
        const notes = doc.splitTextToSize(criterion.notes, pageWidth - 32);
        doc.text(notes, 16, yPos);
        yPos += notes.length * 5;
        doc.setTextColor(0, 0, 0);
      }

      yPos += 8;
    });

  // NOTES AND RECOMMENDATIONS
  if (data.form.generalNotes || data.form.recommendations) {
    checkPageBreak(60);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Observações e Recomendações", 14, yPos);
    yPos += 10;

    if (data.form.generalNotes) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Notas Gerais:", 14, yPos);
      yPos += 6;

      doc.setFont("helvetica", "normal");
      const notes = doc.splitTextToSize(data.form.generalNotes, pageWidth - 28);
      doc.text(notes, 14, yPos);
      yPos += notes.length * 5 + 5;
    }

    if (data.form.recommendations) {
      checkPageBreak(20);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Recomendações:", 14, yPos);
      yPos += 6;

      doc.setFont("helvetica", "normal");
      const recs = doc.splitTextToSize(data.form.recommendations, pageWidth - 28);
      doc.text(recs, 14, yPos);
      yPos += recs.length * 5;
    }
  }

  // FOOTER
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);

    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );

    doc.text(
      `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
      14,
      pageHeight - 10
    );

    doc.text(
      "Sistema SPE-M v1.0",
      pageWidth - 14,
      pageHeight - 10,
      { align: "right" }
    );
  }

  return doc;
}

export async function downloadPDF(data: PDFData, filename?: string) {
  const pdf = await generateSPEMPDF(data);
  const name = filename || `SPE-M_${data.patient.name.replace(/\s/g, "_")}_${new Date().getTime()}.pdf`;
  pdf.save(name);
}
