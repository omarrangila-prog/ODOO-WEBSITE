import type { LucideIcon } from 'lucide-react';
import {
  MessageCircle, BrainCircuit, UserCheck, Send, Database,
  ShoppingCart, PackageSearch, CheckCircle2, Truck, FileText, BarChart3,
  FileSignature, Ship, Container, Calculator, Scale,
  Receipt, Banknote,
} from 'lucide-react';

/**
 * The automation playground: four real workflows, shown step by step.
 *
 * Every step says who or what performs it — `actor` is 'system', 'ai' or
 * 'human'. That distinction is the point of the whole section: it shows
 * where automation acts and where a person still decides, instead of
 * implying software runs the business unattended.
 *
 * These are illustrative workflow patterns, not recordings of a specific
 * client deployment, and the UI labels them that way.
 */
export type Actor = 'system' | 'ai' | 'human';

export interface FlowStep {
  id: string;
  label: string;
  icon: LucideIcon;
  actor: Actor;
  /** What happens here, in plain language. */
  detail: string;
}

export interface Flow {
  id: string;
  label: string;
  title: string;
  /** Answer-first summary of what the connected workflow achieves. */
  summary: string;
  steps: FlowStep[];
  /** Where this workflow is explained in full. */
  href: string;
  ctaLabel: string;
}

export const actorLabel: Record<Actor, string> = {
  system: 'System',
  ai: 'AI',
  human: 'Person',
};

export const flows: Flow[] = [
  {
    id: 'ai-whatsapp',
    label: 'AI + WhatsApp',
    title: 'An enquiry answered in seconds, qualified before a salesperson sees it',
    summary:
      'A customer messages your WhatsApp number. An AI agent replies immediately, asks your qualifying questions, writes the lead into the CRM, and hands it to a salesperson — who approves the quote before anything is promised.',
    steps: [
      { id: 'msg', label: 'Customer message', icon: MessageCircle, actor: 'system', detail: 'A customer messages your business WhatsApp number — often from an ad, often outside office hours.' },
      { id: 'ai', label: 'AI assistant', icon: BrainCircuit, actor: 'ai', detail: 'The agent replies in seconds, answers common questions from your approved content, and asks the two or three questions that qualify a real buyer.' },
      { id: 'crm', label: 'CRM entry', icon: Database, actor: 'system', detail: 'The lead is written into your CRM with its source, the ad it came from and the answers it gave — not a note on someone’s phone.' },
      { id: 'approve', label: 'Human approval', icon: UserCheck, actor: 'human', detail: 'A salesperson reviews the qualified lead and approves the quote or next step. The automation prepares; a person decides.' },
      { id: 'reply', label: 'Customer response', icon: Send, actor: 'system', detail: 'The approved reply goes back on the same thread, and a follow-up task is scheduled if the customer goes quiet.' },
    ],
    href: '/services/whatsapp-automation',
    ctaLabel: 'See WhatsApp automation',
  },
  {
    id: 'sales-inventory',
    label: 'Sales + Inventory',
    title: 'An order that moves stock, raises the invoice and updates the report',
    summary:
      'An order arrives, stock is checked against what is physically available, the sale is confirmed, dispatch reduces inventory, the invoice is raised from the delivery, and management reporting updates — all from one record.',
    steps: [
      { id: 'order', label: 'Order received', icon: ShoppingCart, actor: 'system', detail: 'An order enters from a salesperson, a portal or your online store, against the customer’s own price list.' },
      { id: 'stock', label: 'Stock check', icon: PackageSearch, actor: 'system', detail: 'Availability is checked per warehouse before the order is confirmed, so you do not sell what you cannot ship.' },
      { id: 'confirm', label: 'Sales confirmation', icon: CheckCircle2, actor: 'human', detail: 'Credit limit and pricing are validated. An order outside the rules waits for a person rather than going out silently.' },
      { id: 'dispatch', label: 'Dispatch', icon: Truck, actor: 'system', detail: 'Picking and dispatch reduce stock at the moment goods leave — not at the end of the week.' },
      { id: 'invoice', label: 'Invoice', icon: FileText, actor: 'system', detail: 'The invoice is raised from what was actually delivered, so the invoice and the warehouse agree.' },
      { id: 'report', label: 'Reporting', icon: BarChart3, actor: 'system', detail: 'Margin, stock position and receivables update from the same records, with no month-end reconciliation exercise.' },
    ],
    href: '/solutions/sales-purchase-software',
    ctaLabel: 'See sales & purchase software',
  },
  {
    id: 'import-export',
    label: 'Import + Export',
    title: 'A shipment tracked from contract to landed cost',
    summary:
      'Contracts on both sides, documents generated from shipment data rather than retyped, containers tracked, costs landed against the goods they belong to, and the four quantities that decide your margin reconciled.',
    steps: [
      { id: 'contract', label: 'Contract', icon: FileSignature, actor: 'human', detail: 'A purchase or sales contract is agreed with quantity, price basis, tolerances and delivery terms recorded against it.' },
      { id: 'docs', label: 'Shipment documents', icon: FileText, actor: 'system', detail: 'Packing list, commercial invoice and buyer-specific formats are generated from the shipment record, so one changed quantity changes everywhere.' },
      { id: 'container', label: 'Container tracking', icon: Container, actor: 'system', detail: 'Container, seal and vessel details with shipment status from booking through to arrival.' },
      { id: 'cost', label: 'Landed cost / receivable', icon: Calculator, actor: 'system', detail: 'On import, freight, duty, clearing and handling are allocated back to the items. On export, the receivable is tracked in the buyer’s currency.' },
      { id: 'recon', label: 'Reconciliation', icon: Scale, actor: 'human', detail: 'Contracted, shipped, invoiced and paid quantities are compared. The variance between them is where a trading house makes or loses money.' },
    ],
    href: '/solutions/trading-software',
    ctaLabel: 'See trading software',
  },
  {
    id: 'odoo-accounting',
    label: 'Odoo + Accounting',
    title: 'Quotation to payment, in one connected ledger',
    summary:
      'A quotation becomes an order, the delivery moves stock and cost of sales, the invoice follows the delivery, the payment clears the receivable, and the financial reports are built from those same entries.',
    steps: [
      { id: 'quote', label: 'Quotation', icon: FileSignature, actor: 'human', detail: 'A quotation is prepared on the customer’s agreed pricing and sent for approval.' },
      { id: 'so', label: 'Sales order', icon: ShoppingCart, actor: 'system', detail: 'Accepted, it becomes an order without anyone retyping it.' },
      { id: 'delivery', label: 'Delivery', icon: Truck, actor: 'system', detail: 'Goods leaving move both stock and cost of goods sold, in the same transaction.' },
      { id: 'inv', label: 'Invoice', icon: Receipt, actor: 'system', detail: 'The invoice is raised against the delivery and posted to the ledger.' },
      { id: 'pay', label: 'Payment reconciliation', icon: Banknote, actor: 'human', detail: 'Bank receipts are matched to invoices. Matches clear automatically; only the exceptions need a person.' },
      { id: 'rep', label: 'Reporting', icon: BarChart3, actor: 'system', detail: 'Profit and loss, ageing and cash position come from the posted entries — not a spreadsheet rebuilt each month.' },
    ],
    href: '/services/odoo-implementation-pakistan',
    ctaLabel: 'See Odoo implementation',
  },
];
