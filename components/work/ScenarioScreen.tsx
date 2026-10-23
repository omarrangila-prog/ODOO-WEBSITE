import { Boxes, Calculator, ShoppingCart, Truck, Factory, Store, MessageCircle, Users, Repeat, Globe, Search, LayoutTemplate, Plug, BarChart3, Megaphone, MousePointerClick, ArrowLeftRight, Tags, type LucideIcon } from 'lucide-react';

/**
 * The screen on a demonstration scenario's page: the scenario's own module list
 * laid out as an app menu. It replaces the generated photograph these pages used
 * to carry, which implied a real site and a real person. Every tile is a module
 * named in the scenario's data, nothing is invented for the picture, and the
 * frame says it is illustrative.
 */
const icons: Record<string, LucideIcon> = {
  Manufacturing: Factory,
  Inventory: Boxes,
  Purchase: ShoppingCart,
  Sales: Tags,
  Accounting: Calculator,
  'Point of Sale': Store,
  'WhatsApp Business Platform': MessageCircle,
  'Lead Qualification': Users,
  CRM: Users,
  'Automated Follow-up': Repeat,
  'Pricing & Credit Control': Calculator,
  'Branch Transfers': ArrowLeftRight,
  Reporting: BarChart3,
  'Corporate Website': Globe,
  'Technical SEO': Search,
  'Conversion Design': LayoutTemplate,
  'CRM Integration': Plug,
  Analytics: BarChart3,
  'Meta Ads': Megaphone,
  'Google Ads': Megaphone,
  'Landing Pages': MousePointerClick,
  'Attribution & Reporting': BarChart3,
};

export function ScenarioScreen({ title, modules }: { title: string; modules: string[] }) {
  return (
    <figure className="m-0 overflow-hidden rounded-[20px] border border-line-strong bg-[#0d0b15] shadow-float">
      <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-white/[0.03] px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="text-[13px] font-medium text-text-dark">{title}</span>
        <span className="ml-auto rounded-full border border-amber/50 bg-amber/10 px-2.5 py-0.5 text-[11.5px] font-semibold text-amber">
          Demonstration scenario &middot; illustrative
        </span>
      </figcaption>
      <ul className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:p-6 lg:grid-cols-5">
        {modules.map((m) => {
          const Icon = icons[m] ?? Boxes;
          return (
            <li key={m} className="flex min-h-[104px] flex-col items-start justify-between rounded-[14px] border border-line bg-white/[0.025] p-4">
              <Icon className="h-6 w-6 text-violet-bright" aria-hidden />
              <span className="mt-4 text-[14.5px] font-medium leading-snug text-text-dark">{m}</span>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line px-4 py-2.5 text-[12.5px] leading-snug text-text-dark-muted">
        The modules this scenario would use, laid out as an app menu. It is not a screenshot of a client&rsquo;s system.
      </p>
    </figure>
  );
}
