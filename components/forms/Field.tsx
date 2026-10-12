import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  hint?: string;
}

export function Field({ label, htmlFor, error, required, children, className, hint }: FieldProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-[14px] font-medium text-text-dark">
          {label}
          {required && <span className="ml-0.5 text-magenta"> *</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-[12px] text-text-dark-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#ff8a8f]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  'w-full rounded-control border border-line bg-white/[0.03] px-4 py-3 text-[15px] text-text-dark placeholder:text-text-dark-muted/55 transition-[border-color,box-shadow,background-color] duration-200 hover:border-line-strong focus:border-violet-bright/70 focus:bg-white/[0.05] focus:outline-none focus:ring-[3px] focus:ring-violet/20 min-h-[48px] aria-[invalid=true]:border-[#ff8a8f]/60 aria-[invalid=true]:focus:ring-[#ff8a8f]/20';

export function fieldInvalid(error?: string) {
  return error ? { 'aria-invalid': true as const } : {};
}
