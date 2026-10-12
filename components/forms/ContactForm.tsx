'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { contactSchema, type ContactFormValues } from '@/lib/validation';
import {
  countries,
  countryLabel,
  industryOptions,
  companySizes,
  serviceOptions,
  contactMethods,
  timelineOptions,
  budgetOptions,
} from '@/data/formOptions';
import { frictionItems } from '@/data/calculator';
import { Button } from '@/components/ui/Button';
import { Field, inputClass, fieldInvalid } from './Field';
import { FileUploader } from './FileUploader';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';
import { TextGap } from '@/components/ui/TextGap';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    shouldFocusError: false,
    defaultValues: {
      fullName: '',
      company: '',
      email: '',
      phone: '',
      country: '',
      industry: '',
      companySize: '',
      currentSystems: '',
      timeline: '',
      budget: '',
      challenge: '',
      services: [],
      preferredContact: 'whatsapp',
      consent: false as unknown as true,
      marketingConsent: false,
      sessionData: '',
      website: '',
    },
  });

  // Prefill from friction calculator selections
  useEffect(() => {
    const issues = searchParams.get('issues');
    const friction = searchParams.get('friction');
    if (issues) {
      const labels = issues
        .split(',')
        .map((id) => frictionItems.find((f) => f.id === id)?.label)
        .filter(Boolean);
      if (labels.length) {
        const prefix = friction ? `Operational friction: ${friction}.\n` : '';
        setValue(
          'challenge',
          `${prefix}Challenges we experience:\n- ${labels.join('\n- ')}`,
        );
      }
    }
  }, [searchParams, setValue]);

  // Focus the error summary after it mounts (RHF first-field focus is disabled).
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const id = window.requestAnimationFrame(() => {
      errorSummaryRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [errors]);

  async function onSubmit(values: ContactFormValues) {
    if (status === 'submitting') return; // prevent duplicate submissions
    setStatus('submitting');
    setServerError(null);

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (Array.isArray(val)) formData.append(key, val.join(','));
        else formData.append(key, String(val));
      });
      if (file) formData.append('file', file);

      // Attach anonymous session (first-party attribution) on voluntary identify.
      try {
        const raw = window.localStorage.getItem('odv_session');
        if (raw) formData.append('sessionData', raw);
      } catch {
        /* storage may be unavailable */
      }

      const res = await fetch('/api/contact', { method: 'POST', body: formData });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }

      track('consultation_form_submitted', { services: values.services.length });
      if (file) track('workflow_file_uploaded');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(
        err instanceof Error ? err.message : 'We could not send your message. Please try again.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-editorial border border-green/30 bg-green/[0.06] p-8 text-center"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green/15 text-green">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-[650]">Thank you — message received.</h3>
        <TextGap />
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-text-dark-muted">
          We&rsquo;ll review what you sent and get back to you with a practical next step. If
          it&rsquo;s urgent, message us on WhatsApp and mention you&rsquo;ve submitted the form.
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Error summary for accessibility */}
      {errorList.length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-panel border border-[#ff8a8f]/40 bg-[#ff8a8f]/[0.06] p-4"
        >
          <p className="flex items-center gap-2 text-[14px] font-semibold text-[#ff8a8f]">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            Please correct the following:
          </p>
          <TextGap />
          <ul className="mt-2 list-disc space-y-0.5 pl-8 text-[13.5px] text-[#ff8a8f]/90">
            {errorList.map(([key, val]) => (
              <li key={key}>{val?.message as string}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
          <input id="fullName" className={inputClass} autoComplete="name" {...fieldInvalid(errors.fullName?.message)} {...register('fullName')} />
        </Field>
        <Field label="Company name" htmlFor="company" required error={errors.company?.message}>
          <input id="company" className={inputClass} autoComplete="organization" {...fieldInvalid(errors.company?.message)} {...register('company')} />
        </Field>
        <Field label="Work email" htmlFor="email" required error={errors.email?.message}>
          <input id="email" type="email" className={inputClass} autoComplete="email" {...fieldInvalid(errors.email?.message)} {...register('email')} />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone" required error={errors.phone?.message}>
          <input id="phone" type="tel" className={inputClass} autoComplete="tel" placeholder="+92 300 0000000" {...fieldInvalid(errors.phone?.message)} {...register('phone')} />
        </Field>
        <Field label="Country" htmlFor="country" required error={errors.country?.message}>
          <select id="country" className={inputClass} defaultValue="" {...fieldInvalid(errors.country?.message)} {...register('country')}>
            <option value="" disabled>Select a country</option>
            {countries.map((c) => <option key={c} value={c}>{countryLabel(c)}</option>)}
          </select>
        </Field>
        <Field label="Industry" htmlFor="industry" required error={errors.industry?.message}>
          <select id="industry" className={inputClass} defaultValue="" {...fieldInvalid(errors.industry?.message)} {...register('industry')}>
            <option value="" disabled>Select an industry</option>
            {industryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Company size" htmlFor="companySize" required error={errors.companySize?.message}>
          <select id="companySize" className={inputClass} defaultValue="" {...fieldInvalid(errors.companySize?.message)} {...register('companySize')}>
            <option value="" disabled>Select company size</option>
            {companySizes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Current systems" htmlFor="currentSystems" hint="e.g. Excel, QuickBooks, a legacy ERP" error={errors.currentSystems?.message}>
          <input id="currentSystems" className={inputClass} placeholder="What you use today" {...register('currentSystems')} />
        </Field>
        <Field label="How soon do you need it?" htmlFor="timeline" hint="Optional — helps us prioritise" error={errors.timeline?.message}>
          <select id="timeline" className={inputClass} defaultValue="" {...register('timeline')}>
            <option value="">Select urgency (optional)</option>
            {timelineOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Budget range" htmlFor="budget" hint="Optional — helps us scope" error={errors.budget?.message}>
          <select id="budget" className={inputClass} defaultValue="" {...register('budget')}>
            <option value="">Select budget (optional)</option>
            {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Main workflow challenge" htmlFor="challenge" required error={errors.challenge?.message}>
        <textarea
          id="challenge"
          rows={5}
          className={cn(inputClass, 'min-h-[120px] resize-y py-3')}
          placeholder="Tell us where your team is struggling — orders, stock, reporting, approvals…"
          {...fieldInvalid(errors.challenge?.message)}
          {...register('challenge')}
        />
      </Field>

      {/* Services multi-select */}
      <Controller
        control={control}
        name="services"
        render={({ field }) => (
          <fieldset>
            <legend className="mb-2 block text-[13.5px] font-semibold text-text-dark">
              What do you need? <span className="text-magenta">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => {
                const active = field.value.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      field.onChange(
                        active
                          ? field.value.filter((s) => s !== service)
                          : [...field.value, service],
                      )
                    }
                    className={cn(
                      'rounded-full border px-3.5 py-2 text-[13.5px] font-medium transition-colors min-h-[44px]',
                      active
                        ? 'border-violet-bright/60 bg-violet/12 text-text-dark'
                        : 'border-line text-text-dark-muted hover:border-white/25 hover:text-text-dark',
                    )}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
            {errors.services && (
              <p role="alert" className="mt-1.5 text-[13px] text-[#ff8a8f]">
                {errors.services.message}
              </p>
            )}
          </fieldset>
        )}
      />

      {/* Preferred contact */}
      <fieldset>
        <legend className="mb-2 block text-[13.5px] font-semibold text-text-dark">
          Preferred contact method <span className="text-magenta">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map((m) => (
            <label
              key={m.value}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[14px] text-text-dark-muted has-[:checked]:border-violet-bright/60 has-[:checked]:bg-violet/10 has-[:checked]:text-text-dark"
            >
              <input type="radio" value={m.value} className="accent-violet-bright" {...register('preferredContact')} />
              {m.label}
            </label>
          ))}
        </div>
      </fieldset>

      <FileUploader file={file} onChange={setFile} />

      {/* Honeypot — visually hidden, off-screen; bots fill it */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {/* Consent */}
      <Field label="" htmlFor="consent" error={errors.consent?.message}>
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-text-dark-muted">
          <input id="consent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-violet-bright" {...register('consent')} />
          <span>
            I agree that ODOOVATIONS may contact me about my enquiry, and I accept the{' '}
            <a href="/privacy" className="text-violet-bright underline-offset-2 hover:underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      </Field>

      {/* Marketing opt-in — SEPARATE from the contact permission above. */}
      <Field label="" htmlFor="marketingConsent">
        <label htmlFor="marketingConsent" className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-text-dark-muted">
          <input id="marketingConsent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-violet-bright" {...register('marketingConsent')} />
          <span>Optional: send me occasional Odoo guides and updates. You can unsubscribe any time.</span>
        </label>
      </Field>

      {serverError && (
        <div role="alert" className="flex items-center gap-2 rounded-panel border border-[#ff8a8f]/40 bg-[#ff8a8f]/[0.06] p-4 text-[14px] text-[#ff8a8f]">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
          {serverError}
        </div>
      )}

      <Button type="submit" loading={isSubmitting || status === 'submitting'} fullWidth>
        {status === 'submitting' ? 'Sending…' : 'Show Us How Your Business Works'}
        {status !== 'submitting' && <Send className="h-[18px] w-[18px]" aria-hidden />}
      </Button>

      <p className="text-center text-[12px] text-text-dark-muted">
        Your workflow documents are handled securely and are not shared publicly.
      </p>
    </form>
  );
}
