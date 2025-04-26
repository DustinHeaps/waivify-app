import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f4f4f5",
    fontFamily: "Helvetica",
    position: "relative",
    borderBottomWidth: 4,
    borderBottomColor: "#2563eb", // your brand blue
    borderStyle: "solid",
  },
  watermarkWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  watermark: {
    fontSize: 30,
    color: "#000",
    opacity: 0.08,
    transform: "rotate(-45deg)",
    textAlign: "center",
  },
  brandBar: {
    backgroundColor: "#2563eb",
    height: 8,
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 40,
    margin: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    color: "#374151",
  },
  signatureImage: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    width: 250,
    height: 100,
  },
  footer: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 30,
  },
  companyBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  companyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default function WaiverPDF({
  plan,
  name,
  date,
  signatureUrl,
  waiverId,
  ipAddress,
  terms,
  liability,
  logoUrl,
  companyName,
  fields,
}: {
  name: string;
  plan: string;
  date: string;
  signatureUrl: string;
  waiverId: string;
  ipAddress: string;
  terms: boolean;
  liability: boolean;
  logoUrl?: string;
  companyName?: string;
  fields: Record<string, string | boolean>;
}) {
  return (
    <Document>
      <Page size='A4' style={styles.page} wrap={false}>
        <View style={styles.brandBar} />

        <View style={styles.card}>
          {plan !== "pro" && (
            <View style={styles.watermarkWrapper}>
              <Text style={styles.watermark}>Powered by Waivify.com</Text>
            </View>
          )}

          {logoUrl && companyName && (
            <View style={styles.companyBlock}>
              <Image src={logoUrl} style={styles.logo} />
              <Text style={styles.companyText}>{companyName}</Text>
            </View>
          )}

          <Text style={styles.header}>Signed Waiver</Text>

          {/* <View style={styles.section}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View> */}

          <View style={styles.section}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{date}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Waiver ID:</Text>
            <Text style={styles.value}>
              WVR-{waiverId.slice(0, 6).toUpperCase()}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>IP Address:</Text>
            <Text style={styles.value}>{ipAddress}</Text>
          </View>

          {Object.entries(fields).map(([label, value]) => {
            let displayValue = value;

            if (typeof value === "boolean") {
              displayValue = value ? "Yes" : "No";
            }

            // Format anything with "Date" in the label
            if (
              label.toLowerCase().includes("date") &&
              typeof value === "string"
            ) {
              displayValue = format(new Date(value), "MMMM do, yyyy");
            }

            return (
              <View style={styles.section} key={label}>
                <Text style={styles.label}>{label}:</Text>
                <Text style={styles.value}>{displayValue}</Text>
              </View>
            );
          })}

          <View style={styles.section}>
            <Text style={styles.label}>Signature:</Text>
            <Image src={signatureUrl} style={styles.signatureImage} />
          </View>

          <Text style={styles.footer}>
            © 2025 Waivify Inc. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
