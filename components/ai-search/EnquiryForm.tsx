'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import { aiSearchSchema, planChoices, requestTypes, type AiSearchValues, type RequestTypeId } from '@/lib/ai-search/request';
import { Button } from '@/components/ui/Button';
import { Field, inputClass, fieldInvalid } from '@/components/forms/Field';
import { company } from '@/data/company';
import { whatsappLink } from '@/lib/utilities';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utilities';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const pill =
  'flex min-h-[44px] cursor-pointer items-center rounded-full border border-line px-4 py-2 text-[14.5px] text-text-dark-muted transition-colors hover:border-line-strong has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-violet-bright has-[:checked]:border-violet-bright/60 has-[:checked]:bg-violet/[0.12] has-[:checked]:text-white';

const newToken = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID().replace(/-/g, '') : `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;

/**
 * The AI Search enquiry form. Asking is free: the form says so, and the request types separate a free
 * suitability review from the paid audit and the monthly plans, none of which is charged by sending this.
 *
 * Success is shown only after the server has accepted the enquiry. A failure keeps what was typed and
 * offers a working alternative. The send button is disabled while a request is in flight and every send
 * carries a one-time token, so a double click cannot send twice.
 */
export function EnquiryForm({ defaultType = 'free-review' }: { defaultType?: RequestTypeId }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const tokenRef = useRef('');
  const startedRef = useRef(false);
  const inFlight = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AiSearchValues>({
    resolver: zodResolver(aiSearchSchema),
    shouldFocusError: false,
    defaultValues: {
      fullName: '',
      email: '',
      website: '',
      requestType: defaultType,
      company: '',
      market: '',
      competitors: '',
      plan: '',
      problem: '',
      consent: false as unknown as true,
      marketingConsent: false,
      token: 'pending-token',
      nickname: '',
    },
  });

  const requestType = watch('requestType');
  const plan = watch('plan');

  useEffect(() => {
    tokenRef.current = newToken();
    setValue('token', tokenRef.current);

    const sp = new URLSearchParams(window.location.search);
    const p = sp.get('plan');
    const t = sp.get('type');
    if (p && planChoices.some((x) => x.id === p)) {
      setValue('plan', p as AiSearchValues['plan']);
      setValue('requestType', 'plan');
    } else if (t && requestTypes.some((x) => x.id === t)) {
      setValue('requestType', t as RequestTypeId);
    }

    const onPlan = (e: Event) => {
      const id = (e as CustomEvent<{ plan: string }>).detail?.plan;
      if (id === 'audit') {
        setValue('requestType', 'audit');
        setValue('plan', '');
      } else if (id && planChoices.some((x) => x.id === id)) {
        setValue('requestType', 'plan');
        setValue('plan', id as AiSearchValues['plan']);
      }
    };
    window.addEventListener('odv:ai-plan', onPlan);
    return () => window.removeEventListener('odv:ai-plan', onPlan);
  }, [setValue]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const id = requestAnimationFrame(() => summaryRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [errors]);

  async function onSubmit(values: AiSearchValues) {
    if (inFlight.current) return; // a second click while the first is still being sent
    inFlight.current = true;
    setStatus('submitting');
    setServerError(null);
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? '')));
      fd.set('token', tokenRef.current);
      fd.set('landingPage', window.location.pathname);
      // First-party attribution, as on the main contact form: the anonymous session, if one exists.
      try {
        const raw = window.localStorage.getItem('odv_session');
        if (raw) fd.set('sessionData', raw);
      } catch {
        /* storage may be unavailable */
      }
      const res = await fetch('/api/ai-search', { method: 'POST', body: fd });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'We could not send your request.');
      track(values.requestType === 'audit' ? 'ai_audit_requested' : 'ai_review_requested', { type: values.requestType, ...(values.plan ? { plan: values.plan } : {}) });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'We could not send your request.');
    } finally {
      inFlight.current = false;
    }
  }

  const waConfigured = Boolean(company.whatsapp) && !company.whatsapp.startsWith('REPLACE');
  const waHref = waConfigured ? whatsappLink(company.whatsapp, 'Hello ODOOVATIONS, I would like to ask about AI Search (AEO and GEO).') : '/contact#form';

  if (status === 'success') {
    return (
      <div role="status" className="rounded-editorial border border-green/30 bg-green/[0.06] p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green/15 text-green">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 font-heading text-2xl font-[650]">Thank you. Your request has been sent.</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-text-dark-muted">
          It has gone to the ODOOVATIONS team by email. A person reads it and replies during Pakistan business hours. Nothing has been charged, and a paid audit or plan starts only after a written scope is agreed.
        </p>
      </div>
    );
  }

  const errorList = Object.entries(errors);
  const chosen = requestTypes.find((r) => r.id === requestType);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      onFocusCapture={() => {
        if (startedRef.current) return;
        startedRef.current = true;
        track('form_started', { form: 'ai-search' });
      }}
    >
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-panel border border-[#ff8a8f]/40 bg-[#ff8a8f]/[0.06] p-4">
          <p className="flex items-center gap-2 text-[14px] font-semibold text-[#ff8a8f]">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            Please correct the following:
          </p>
          <ul className="mt-2 list-disc space-y-0.5 pl-8 text-[14px] text-[#ff8a8f]/90">
            {errorList.map(([k, v]) => (
              <li key={k}>{v?.message as string}</li>
            ))}
          </ul>
        </div>
      )}

      <fieldset>
        <legend className="mb-3 block text-[15px] font-semibold text-text-dark">What are you asking for?</legend>
        <div className="flex flex-wrap gap-2">
          {requestTypes.map((r) => (
            <label key={r.id} className={pill}>
              <input type="radio" value={r.id} className="sr-only" {...register('requestType')} />
              {r.label}
            </label>
          ))}
        </div>
        {chosen && <p className="mt-3 text-[14px] leading-relaxed text-text-dark-muted">{chosen.note}</p>}
      </fieldset>

      {requestType === 'plan' && (
        <fieldset>
          <legend className="mb-2 block text-[14px] font-semibold text-text-dark">Which plan?</legend>
          <div className="flex flex-wrap gap-2">
            {planChoices.map((p) => (
              <label key={p.id} className={cn(pill, '!min-h-[40px] text-[14px]')}>
                <input type="radio" value={p.id} checked={plan === p.id} onChange={() => setValue('plan', p.id)} className="sr-only" />
                {p.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${uid}-name`} required error={errors.fullName?.message}>
          <input id={`${uid}-name`} className={inputClass} autoComplete="name" {...fieldInvalid(errors.fullName?.message)} {...register('fullName')} />
        </Field>
        <Field label="Work email" htmlFor={`${uid}-email`} required error={errors.email?.message}>
          <input id={`${uid}-email`} type="email" className={inputClass} autoComplete="email" {...fieldInvalid(errors.email?.message)} {...register('email')} />
        </Field>
      </div>

      <Field label="Website" htmlFor={`${uid}-site`} required hint="The site you want us to look at, for example example.com." error={errors.website?.message}>
        <input id={`${uid}-site`} inputMode="url" autoCapitalize="none" spellCheck={false} className={inputClass} placeholder="example.com" {...fieldInvalid(errors.website?.message)} {...register('website')} />
      </Field>

      <details className="group rounded-panel border border-line/70 bg-white/[0.02]">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-[14px] font-semibold text-text-dark [&::-webkit-details-marker]:hidden">
          <span>
            Add detail <span className="font-normal text-text-dark-muted">(optional)</span>
          </span>
          <span className="shrink-0 transition-transform group-open:rotate-180" aria-hidden>
            &#9662;
          </span>
        </summary>
        <div className="space-y-5 border-t border-line/70 px-4 pb-5 pt-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Company" htmlFor={`${uid}-company`} error={errors.company?.message}>
              <input id={`${uid}-company`} className={inputClass} autoComplete="organization" {...register('company')} />
            </Field>
            <Field label="Target country and language" htmlFor={`${uid}-market`} hint="For example Pakistan, English and Urdu.">
              <input id={`${uid}-market`} className={inputClass} {...register('market')} />
            </Field>
          </div>
          <Field label="Competitors" htmlFor={`${uid}-comp`} hint="Up to three, if you know them.">
            <input id={`${uid}-comp`} className={inputClass} {...register('competitors')} />
          </Field>
          <Field label="The visibility problem, in your words" htmlFor={`${uid}-problem`}>
            <textarea
              id={`${uid}-problem`}
              rows={4}
              className={cn(inputClass, 'min-h-[110px] resize-y py-3')}
              placeholder="For example: ChatGPT does not mention us, or describes our services wrongly."
              {...register('problem')}
            />
          </Field>
        </div>
      </details>

      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-nick`}>Leave this field empty</label>
        <input id={`${uid}-nick`} tabIndex={-1} autoComplete="off" {...register('nickname')} />
      </div>
      <input type="hidden" {...register('token')} />

      <Field label="" htmlFor={`${uid}-consent`} error={errors.consent?.message}>
        <label htmlFor={`${uid}-consent`} className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-text-dark-muted">
          <input id={`${uid}-consent`} type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-violet-bright" {...register('consent')} />
          <span>
            I agree that ODOOVATIONS may contact me about this request, and I accept the{' '}
            <a href="/privacy" className="text-violet-bright underline underline-offset-2">
              Privacy Policy
            </a>
            .
          </span>
        </label>
      </Field>
      <Field label="" htmlFor={`${uid}-mkt`}>
        <label htmlFor={`${uid}-mkt`} className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-text-dark-muted">
          <input id={`${uid}-mkt`} type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-violet-bright" {...register('marketingConsent')} />
          <span>Optional: send me occasional guides and updates. You can unsubscribe any time.</span>
        </label>
      </Field>

      {serverError && (
        <div role="alert" className="rounded-panel border border-[#ff8a8f]/40 bg-[#ff8a8f]/[0.06] p-4 text-[14px] text-[#ff8a8f]">
          <p className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {serverError}
          </p>
          <p className="mt-2 text-text-dark">
            You can also{' '}
            <a href={`mailto:${company.email}?subject=AI%20Search%20enquiry`} className="text-violet-bright underline underline-offset-2" onClick={() => track('ai_contact_click', { channel: 'email' })}>
              email {company.email}
            </a>{' '}
            or{' '}
            <a href={waHref} target={waConfigured ? '_blank' : undefined} rel="noopener noreferrer" className="text-violet-bright underline underline-offset-2" onClick={() => track('ai_contact_click', { channel: 'whatsapp' })}>
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      )}

      <Button type="submit" loading={status === 'submitting'} disabled={status === 'submitting'} fullWidth>
        {status === 'submitting' ? 'Sending…' : 'Send request'}
        {status !== 'submitting' && <Send className="h-[18px] w-[18px]" aria-hidden />}
      </Button>
      <p className="text-center text-[12px] text-text-dark-muted">
        Sending this is free and commits you to nothing. We never ask for passwords or payment details.
      </p>
    </form>
  );
}
