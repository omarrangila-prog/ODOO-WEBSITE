'use client';

/** Footer link that reopens the consent preference centre (withdrawal/change). */
export function CookiePrefsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('odv:open-preferences'))}
      className="text-text-dark-muted hover:text-text-dark"
    >
      Cookie preferences
    </button>
  );
}
