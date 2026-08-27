"use client";

import { useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";
import { useMarket } from "@/components/market-provider";

// --- Power Automate setup (Microsoft 365 / Excel Online) ---
// 1. In Power Automate: Create > Instant cloud flow > trigger "When an HTTP
//    request is received".
// 2. Click "Use sample payload to generate schema" and paste:
//    { "name": "Jane Doe", "company": "Acme Inc", "email": "jane@acme.com",
//      "market": "domestic", "partDetails": "...", "fileName": "drawing.pdf",
//      "fileBase64": "...", "submittedAt": "2026-01-01T00:00:00.000Z" }
// 3. Add a Condition: if fileName is not empty ->
//      "Create file" (OneDrive for Business or SharePoint), in a folder you
//      choose, File name = fileName, File content =
//      base64ToBinary(triggerBody()?['fileBase64']). Note the resulting
//      file's link from that action's output.
// 4. Add "Add a row into a table" (Excel Online Business) pointing at a
//    Table in an Excel file in that same OneDrive/SharePoint, with columns:
//    Timestamp, Name, Company, Email, Market, Part Details, Drawing Link.
// 5. Add a "Response" action returning HTTP 200 so this form can confirm
//    success.
// 6. Copy the trigger's URL from step 1 and paste it below.
const POWER_AUTOMATE_URL = "REPLACE-power-automate-flow-url";

const MAX_FILE_MB = 8;

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1] ?? "");
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function RfqForm() {
  const { market } = useMarket();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed" | "not_configured">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    if (f && f.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`That file is over ${MAX_FILE_MB}MB — please email it directly instead.`);
      return;
    }
    setError("");
    setFile(f);
  }

  async function submit() {
    if (!name.trim() || !email.trim()) {
      setError("Add at least your name and email.");
      return;
    }
    setError("");

    if (POWER_AUTOMATE_URL.startsWith("REPLACE-")) {
      setStatus("not_configured");
      return;
    }

    setStatus("sending");
    try {
      const fileBase64 = file ? await toBase64(file) : "";
      const res = await fetch(POWER_AUTOMATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          market,
          partDetails: message,
          fileName: file?.name ?? "",
          fileBase64,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("bad-response");
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-dashed border-accent bg-accent-light p-5 text-sm text-body">
        Thanks — your enquiry is in. We&apos;ll get back to you at <b className="text-ink">{email}</b>.
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div className="rounded-xl border border-dashed border-accent bg-accent-light p-5 text-sm text-body">
        Thanks. Your details are ready. Email them{file ? <> with <b className="text-ink">{file.name}</b> attached</> : " with your drawing attached"} to{" "}
        <b className="text-ink">suparsh@shreyansagricon.com</b>.{" "}
        <em>(Online submission isn&apos;t connected yet — this is a manual fallback.)</em>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <div className="mb-3 grid gap-3 sm:grid-cols-2">
        <Field label="Name" value={name} onChange={setName} />
        <Field label="Company" value={company} onChange={setCompany} />
      </div>
      <Field label="Email" value={email} onChange={setEmail} type="email" />
      <div className="mb-3">
        <label className="mb-1.5 block text-xs tracking-wide text-muted">Part details</label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Part, material, quantity, tolerance…"
          className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-transparent focus:ring-2 focus:ring-accent"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-xs tracking-wide text-muted">Drawing</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.step,.stp,.dwg,.dxf,image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        {file ? (
          <div className="flex items-center justify-between rounded-lg border border-line bg-bg px-3.5 py-2.5">
            <span className="truncate text-sm text-ink">{file.name}</span>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              aria-label="Remove file"
              className="ml-2 flex-none text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-dashed border-line px-3.5 py-2.5 text-sm text-muted hover:border-accent hover:text-accent-hover"
          >
            <Paperclip size={16} />
            Attach drawing (PDF, STEP, DWG, up to {MAX_FILE_MB}MB)
          </button>
        )}
      </div>
      <button
        onClick={submit}
        disabled={status === "sending"}
        className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {status === "failed" && (
        <p className="mt-2 font-mono text-xs text-accent-hover">
          That didn&apos;t go through. Try again, or email suparsh@shreyansagricon.com directly.
        </p>
      )}
      {error && <p className="mt-2 font-mono text-xs text-accent-hover">{error}</p>}
      <p className="mt-2 text-xs text-muted">
        Or email your drawing directly to suparsh@shreyansagricon.com: STEP, PDF and 2D prints accepted.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1.5 block text-xs tracking-wide text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-transparent focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}
