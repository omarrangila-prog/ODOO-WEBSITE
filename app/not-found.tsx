import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { TextGap } from '@/components/ui/TextGap';
import { PageArt } from '@/components/cinema/PageArt';

export default function NotFound() {
  return (
    <section className="theme-dark grain relative grid min-h-[70vh] place-items-center overflow-hidden px-6 pt-28">
      <PageArt variant={1} />
      <div className="relative max-w-md text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <TextGap />
        <h1 className="display-1 mt-6">This page took a wrong turn.</h1>
        <TextGap />
        <p className="lede mx-auto mt-5 max-w-sm">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you
          back on track.
        </p>
        <TextGap />
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <Link href="/contact" className="text-[15px] font-medium text-violet-bright underline-offset-4 hover:underline">
            Contact us instead
          </Link>
        </div>
      </div>
    </section>
  );
}
