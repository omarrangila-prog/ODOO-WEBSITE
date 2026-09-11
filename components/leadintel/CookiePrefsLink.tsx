'use client';

/** Footer link that reopens the consent preference centre (withdrawal/change). */
export function CookiePrefsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('odv:open-preferences'))}
      className="inline-flex min-h-[44px] items-center text-text-dark-muted hover:text-text-dark sm:min-h-0"
    >
      Cookie preferences
    </button>
  );
}
