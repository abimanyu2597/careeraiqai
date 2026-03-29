"use client";

export function UploadBox({
  onFile
}: {
  onFile: (file: File) => void;
}) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-blue-400/40 bg-blue-500/5 px-6 py-10 text-center">
      <div className="text-lg font-medium text-white">Upload resume</div>
      <div className="mt-1 text-sm text-slate-300/80">PDF or text file</div>
      <input
        type="file"
        className="hidden"
        accept=".pdf,.txt,.md"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </label>
  );
}
