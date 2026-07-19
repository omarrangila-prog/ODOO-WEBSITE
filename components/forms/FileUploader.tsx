'use client';

import { useRef, useState, useId } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import {
  ACCEPTED_FILE_TYPES,
  ACCEPTED_FILE_EXTENSIONS,
  MAX_FILE_SIZE,
} from '@/lib/validation';
import { cn } from '@/lib/utilities';

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploader({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const id = useId();

  function validate(f: File): string | null {
    if (f.size > MAX_FILE_SIZE) return 'File exceeds the 10 MB limit.';
    if (!ACCEPTED_FILE_TYPES.includes(f.type as (typeof ACCEPTED_FILE_TYPES)[number])) {
      return 'Unsupported file type. Use PDF, Excel, CSV, Word, PNG or JPG.';
    }
    return null;
  }

  function handleFile(f: File | undefined) {
    if (!f) return;
    const err = validate(f);
    if (err) {
      setError(err);
      onChange(null);
      return;
    }
    setError(null);
    onChange(f);
  }

  function remove() {
    onChange(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13.5px] font-semibold text-text-dark">
        Upload your workflow{' '}
        <span className="font-normal text-text-dark-muted">(optional)</span>
      </label>

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            'rounded-panel border border-dashed p-6 text-center transition-colors',
            dragging ? 'border-violet-bright/60 bg-violet/5' : 'border-line bg-white/[0.02]',
          )}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={ACCEPTED_FILE_EXTENSIONS}
            className="sr-only"
            aria-describedby={`${id}-help`}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <Upload className="mx-auto h-6 w-6 text-violet-bright" aria-hidden />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-3 font-heading text-[15px] font-semibold text-violet-bright underline-offset-4 hover:underline"
          >
            Choose a file
          </button>
          <span className="text-[14px] text-text-dark-muted"> or drag it here</span>
          <p id={`${id}-help`} className="mt-2 text-[12px] text-text-dark-muted">
            PDF, XLS, XLSX, CSV, DOC, DOCX, PNG, JPG · up to 10 MB
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-panel border border-line bg-white/[0.03] p-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-violet/12 text-violet-bright">
            <FileText className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-text-dark">{file.name}</p>
            <p className="text-[12px] text-text-dark-muted">{formatBytes(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={remove}
            aria-label={`Remove ${file.name}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-text-dark-muted hover:bg-white/5 hover:text-[#ff8a8f]"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] text-[#ff8a8f]">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
