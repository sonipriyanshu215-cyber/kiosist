import { InquiriesTable } from "@/components/admin/InquiriesTable";

export const metadata = { title: "Inquiries" };

export default function InquiriesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-kio-ink">Inquiries</h1>
      <p className="mt-1 text-sm text-kio-muted">Contact and career-application submissions from the site.</p>
      <div className="mt-6">
        <InquiriesTable />
      </div>
    </div>
  );
}
