
const { db } = require("../lib/prisma.js");

async function main() {
  await db.template.createMany({
    data: [
      {
        name: "Basic Waiver",
        description:
          "A flexible waiver template suitable for a wide range of businesses and activities.",
        fields: [
          { label: "Full Name", type: "text", required: true },
          { label: "Date", type: "date", required: true },
          { label: "I agree to the terms", type: "checkbox", required: true },
          { label: "I release liability", type: "checkbox", required: true },
          { label: "Signature", type: "signature", required: true },
        ],
        isDefault: true,
      },
      {
        name: "Pet Care Waiver",
        description:
          "A tailored waiver for pet sitters, groomers, and boarding facilities.",
        fields: [
          { label: "Owner Name", type: "text", required: true },
          { label: "Pet Name", type: "text", required: true },
          { label: "Drop-Off Date", type: "date", required: true },
          { label: "Emergency Contact", type: "text", required: true },
          { label: "I release liability", type: "checkbox", required: true },
          { label: "Signature", type: "signature", required: true },
        ],
        isDefault: true,
      },
      {
        name: "Event Participation Waiver",
        description: "Designed for workshops, classes, or group events.",
        fields: [
          { label: "Participant Name", type: "text", required: true },
          { label: "Email", type: "text", required: true },
          { label: "Event Name", type: "text", required: true },
          { label: "Date", type: "date", required: true },
          {
            label: "I understand and accept the risks",
            type: "checkbox",
            required: true,
          },
          { label: "Signature", type: "signature", required: true },
        ],
        isDefault: true,
      },
      {
        name: "Personal Training Waiver",
        description: "Waiver and release for personal training services.",
        isDefault: true,
        fields: [
          { label: "Full Name", type: "text", required: true },
          { label: "Date of Birth", type: "date", required: true },
          { label: "Medical Conditions", type: "textarea", required: false },
          { label: "Emergency Contact Name", type: "text", required: true },
          { label: "Emergency Contact Phone", type: "text", required: true },
          {
            label: "I acknowledge the risks of physical training",
            type: "checkbox",
            required: true,
          },
          {
            label: "I release liability from injury during sessions",
            type: "checkbox",
            required: true,
          },

          { label: "Date", type: "date", required: true },
          { label: "Signature", type: "signature", required: true },
        ],
      },
      {
        name: "Esthetician Consent Form",
        description: "Consent for skincare and cosmetic procedures.",
        isDefault: true,
        fields: [
          { label: "Full Name", type: "text", required: true },
          { label: "Date of Appointment", type: "date", required: true },
          { label: "Skin Concerns", type: "textarea", required: false },
          {
            label: "Allergies or Sensitivities",
            type: "textarea",
            required: false,
          },
          {
            label: "I consent to the proposed treatment",
            type: "checkbox",
            required: true,
          },
          {
            label: "I understand the risks and side effects",
            type: "checkbox",
            required: true,
          },

          { label: "Date", type: "date", required: true },
          { label: "Signature", type: "signature", required: true },
        ],
      },
      {
        name: "Tattoo Consent Waiver",
        description: "Consent and release form for tattoo procedures.",
        isDefault: true,
        fields: [
          { label: "Full Name", type: "text", required: true },
          { label: "Date of Birth", type: "date", required: true },
          { label: "Design Description", type: "textarea", required: true },
          { label: "Location on Body", type: "text", required: true },
          {
            label: "I confirm I am not under the influence of drugs or alcohol",
            type: "checkbox",
            required: true,
          },
          {
            label: "I consent to the tattoo procedure",
            type: "checkbox",
            required: true,
          },
          {
            label: "I understand the aftercare requirements",
            type: "checkbox",
            required: true,
          },
          { label: "Signature", type: "signature", required: true },
          { label: "Date", type: "date", required: true },
        ],
      },
    
    ],
  });

  console.log("✅ Default templates seeded");
}

main()
  .then(() => console.log("🌱 Templates seeded"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
