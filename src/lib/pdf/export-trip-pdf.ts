import type { GeneratedTrip } from "@/app/trip/actions";

type PdfSection = { items: string[]; title: string };

const pageWidth = 210;
const pageHeight = 297;
const margin = 18;
const contentWidth = pageWidth - margin * 2;
const colors = { accent: [244, 184, 222] as const, background: [10, 12, 18] as const, muted: [175, 181, 194] as const, text: [248, 249, 252] as const };

export const getPdfFileName = (trip: GeneratedTrip): string => `tripsgen-${trip.shareId}.pdf`;
export const getTripPdfSections = (trip: GeneratedTrip): PdfSection[] => [
  { title: "Attractions", items: trip.recommendation.attractions.map((item) => item.name) },
  { title: "Restaurants", items: trip.recommendation.restaurants.map((item) => item.name) },
  { title: "Hotels", items: trip.recommendation.hotels.map((item) => item.name) },
  { title: "Daily timeline", items: trip.recommendation.dailyPlan.map((plan) => `Day ${plan.day} - ${plan.date}: ${plan.items.join(", ")}`) },
];

export const exportTripPdf = async (trip: GeneratedTrip): Promise<void> => {
  if (typeof window === "undefined") throw new Error("PDF export is only available in a browser.");
  const { jsPDF } = await import("jspdf");
  const document = new jsPDF({ format: "a4", orientation: "portrait", unit: "mm" });
  let y = margin;
  const paintPage = (): void => { document.setFillColor(...colors.background); document.rect(0, 0, pageWidth, pageHeight, "F"); document.setTextColor(...colors.text); };
  const nextPage = (): void => { document.addPage(); paintPage(); y = margin; };
  const ensureSpace = (height: number): void => { if (y + height > pageHeight - margin) nextPage(); };
  const addText = (value: string, size: number, color: readonly [number, number, number], indent = 0): void => { document.setFontSize(size); document.setTextColor(...color); const lines = document.splitTextToSize(value, contentWidth - indent); ensureSpace(lines.length * (size * 0.42) + 3); document.text(lines, margin + indent, y); y += lines.length * (size * 0.42) + 3; };
  paintPage();
  document.setFont("helvetica", "bold");
  addText("TripsGen", 10, colors.accent);
  addText(`${trip.cityName}, ${trip.countryName}`, 25, colors.text);
  document.setFont("helvetica", "normal");
  addText(`${trip.dates.startDate} - ${trip.dates.endDate}`, 11, colors.muted);
  y += 5;
  addText(`Travel style: ${trip.travelStyle}`, 10, colors.text);
  addText(`Companion: ${trip.shareTrip.companionId}`, 10, colors.text);
  addText(`Budget: ${trip.shareTrip.budgetId}`, 10, colors.text);
  addText(`Confidence score: ${trip.recommendation.confidenceScore}/100`, 10, colors.text);
  y += 6;
  for (const section of getTripPdfSections(trip)) {
    ensureSpace(12);
    document.setFont("helvetica", "bold");
    addText(section.title, 14, colors.accent);
    document.setFont("helvetica", "normal");
    for (const item of section.items.length ? section.items : ["No recommendations available."]) addText(`- ${item}`, 10, colors.text, 3);
    y += 4;
  }
  const pages = document.getNumberOfPages();
  for (let page = 1; page <= pages; page += 1) { document.setPage(page); document.setFontSize(8); document.setTextColor(...colors.muted); document.text(`TripsGen - ${page}/${pages}`, margin, pageHeight - 10); }
  document.save(getPdfFileName(trip));
};
