/**
 * CASE STUDY CONTENT
 *
 * Owner-supplied material for the project pages at /projects/<id>, keyed by the
 * project id in data/projects.ts. data/case-study-model.ts owns the shape and the
 * publication gate; this file holds only words.
 *
 * WHAT THESE THREE PAGES ARE BUILT FROM
 *  - Scope: the capabilities management confirmed on 2026-09-12, restated in
 *    plain words. Nothing is added to what management said the system does.
 *  - A working demonstration, built here with invented data and always labelled
 *    "Demonstration · sample data". It stands in for screenshots that do not yet
 *    exist; it is never presented as the client's screens.
 *  - A briefing: questions we would put to anyone planning this kind of system.
 *    They are advice about the class of project, not facts about the client's.
 *
 * WHAT THEY DO NOT CONTAIN, AND WHY
 *  - No outcome, figure, date or duration: none has been supplied with evidence.
 *    `outcomes` stays absent until one arrives with its source, and the page
 *    then shows it with that source beside it.
 *  - No problem statement written about the client: no one has said what their
 *    situation was before, and inventing a "before" would be a made-up story.
 *  - No screenshot of the delivered systems: none exists in the repository.
 *
 * `privacy.clientApproved` records management's confirmation (projects.ts
 * evidence.clientApproval). The other six privacy checks apply to screenshots
 * and video, of which there are none (see blockers() in the model).
 *
 * To add an outcome: `outcomes: [{ statement, evidence, measuredOver }]`.
 * To add a real screenshot: follow docs/CASE-STUDIES.md; the full privacy
 * checklist then applies to that project.
 */
import type { CaseStudyContent } from './case-study-model';

const confirmed = 'Confirmed by ODOOVATIONS management on 12 September 2026.';

export const caseStudyContentRecords: Record<string, CaseStudyContent> = {
  'kcci-election': {
    status: 'published',
    serviceCategory: 'Custom software',
    clientDisplayName: 'Karachi Chamber of Commerce & Industry (KCCI)',
    overview:
      'A digital election management system built for the Karachi Chamber of Commerce & Industry (KCCI). It covers member eligibility and registration, candidate management, the polling-day workflow and results reporting, with role-based access.',
    scope: [
      { title: 'Member eligibility and registration', detail: 'Holds the register of members and decides who is eligible to take part.' },
      { title: 'Candidate management', detail: 'Records the candidates who are standing.' },
      { title: 'Polling-day workflow', detail: 'Carries the steps that happen on the day of the election.' },
      { title: 'Results reporting', detail: 'Turns the votes into reported results.' },
      { title: 'Role-based access', detail: 'Gives each kind of user the parts of the system their role needs, and no more.' },
    ],
    demonstration: {
      kind: 'election',
      heading: 'Step through a small election',
      intro:
        'Eight invented members, one of them not eligible, and three invented candidates. Check a member, issue a ballot, cast a vote and read the results. Change who is signed in to see how access follows the role. This shows the kind of workflow the system covers. It is not KCCI’s system.',
    },
    briefing: {
      heading: 'Planning an election system? Settle these first.',
      intro: 'These are the questions we would put to you at the start of an election project.',
      questions: [
        'Who is eligible to vote, and who keeps that register up to date?',
        'How is a person’s identity checked at the point of voting?',
        'Is voting in person, remote, or both?',
        'Who approves candidates, and what happens to a nomination that is disputed?',
        'Which roles need access, and what must each of them be unable to see or change?',
        'When may results be seen, and by whom?',
        'What record must exist afterwards so a count can be checked, and for how long is it kept?',
        'What is the plan if power, internet or a device fails on the day?',
        'How is members’ personal data protected and, afterwards, archived or deleted?',
      ],
    },
    enquiryPath: 'software',
    relatedServices: [
      { label: 'Custom software development', href: '/services/custom-software-development' },
      { label: 'Websites and web applications', href: '/services/web-development' },
    ],
    factsSource: confirmed,
    seo: {
      title: 'KCCI Election System | Election Software by ODOOVATIONS',
      description:
        'KCCI Election System: election management software for the Karachi Chamber of Commerce & Industry, covering eligibility, candidates, polling day and results. Includes a working demonstration.',
    },
    privacy: { clientApproved: true },
  },

  'whatsapp-digital-connection': {
    status: 'published',
    serviceCategory: 'WhatsApp and automation',
    overview:
      'A document-delivery integration between business software and WhatsApp. A command in the software enters a job queue, a document API renders the file, and the customer receives it on WhatsApp: invoices, statements, receipts, purchase orders, reports, reminders and order confirmations.',
    scope: [
      { title: 'A job queue between the software and WhatsApp', detail: 'A command in the business software enters a queue as a job.' },
      { title: 'Document rendering through an API', detail: 'A document API builds the file from the job.' },
      { title: 'Delivery to the customer on WhatsApp', detail: 'The customer receives the document in a WhatsApp conversation.' },
      { title: 'Invoices, statements and receipts', detail: 'Financial documents the software produces for a customer.' },
      { title: 'Purchase orders and order confirmations', detail: 'Order documents the software produces.' },
      { title: 'Reports and reminders', detail: 'Reports and reminders, sent the same way.' },
    ],
    demonstration: {
      kind: 'delivery',
      heading: 'Send a document and follow it',
      intro:
        'Choose a document and send it. Watch the job move from the queue to rendering to delivery, then appear on a sample phone. Nothing is sent: it is a simulation with an invented business and document. It shows the flow described above, not the client’s screens.',
    },
    briefing: {
      heading: 'Planning to send documents on WhatsApp? Settle these first.',
      intro: 'These are the questions we would put to you at the start of an integration like this.',
      questions: [
        'Which documents will be sent, and which event in the software triggers each one?',
        'Have your customers agreed to receive messages from you on WhatsApp, and how is that recorded?',
        'Which messages start a conversation, and do they need pre-approved templates?',
        'Who may trigger a send, and does a person approve anything unusual?',
        'How are customers’ phone numbers stored, checked and corrected?',
        'What should happen when a delivery fails: retry, alert someone, or fall back to email?',
        'Where is each sent document kept, and who can see the record of what was sent?',
        'What happens to queued jobs if the software or the document service is unavailable?',
      ],
    },
    enquiryPath: 'ai',
    relatedServices: [
      { label: 'WhatsApp automation', href: '/services/whatsapp-automation' },
      { label: 'AI and automation', href: '/services/ai-automation' },
    ],
    factsSource: confirmed,
    seo: {
      title: 'WhatsApp Digital Connection: Document Delivery',
      description:
        'WhatsApp Digital Connection: invoices, statements, receipts and other documents sent from business software to customers on WhatsApp through a job queue and a document API. Includes a demonstration.',
    },
    privacy: { clientApproved: true },
  },

  'scrabble-timer': {
    status: 'published',
    serviceCategory: 'Custom software',
    overview:
      'Tournament timing and management software for competitive Scrabble events: game and round timers, player pairing, scoring and rankings, check-in and a live leaderboard. It is an example of the highly specific applications we build to order.',
    scope: [
      { title: 'Game and round timers', detail: 'Clocks for each game and for the round.' },
      { title: 'Player pairing', detail: 'Decides who plays whom in each round.' },
      { title: 'Scoring and rankings', detail: 'Records results and ranks the players.' },
      { title: 'Check-in', detail: 'Records who has arrived to play.' },
      { title: 'Live leaderboard', detail: 'Shows the standings as results come in.' },
    ],
    demonstration: {
      kind: 'timer',
      heading: 'Run a round at a tournament desk',
      intro:
        'Six invented players on three tables. Run the game clock, enter a result and watch the leaderboard re-order; check a player out and see their table flagged. It shows the kind of screen such software provides. It is not the client’s application.',
    },
    briefing: {
      heading: 'Planning event or tournament software? Settle these first.',
      intro: 'These are the questions we would put to you at the start of a project like this.',
      questions: [
        'Which tournament format and pairing rules do you use, and who decides when they are bent?',
        'How are ties broken in the standings?',
        'Which clock rules apply, and what happens when a player runs out of time?',
        'Who may enter or correct a result, and how is a correction recorded?',
        'What do players and spectators need to see, and on which screens?',
        'How many players and tables must it handle at once?',
        'What happens if the venue’s internet drops in the middle of a round?',
        'What must come out afterwards: standings, results for publication, or files for a rating body?',
      ],
    },
    enquiryPath: 'software',
    relatedServices: [
      { label: 'Custom software development', href: '/services/custom-software-development' },
      { label: 'Websites and web applications', href: '/services/web-development' },
    ],
    factsSource: confirmed,
    seo: {
      title: 'Scrabble Tournament Timer | Custom Event Software',
      description:
        'Scrabble Tournament Timer: custom software for competitive Scrabble events with game and round timers, pairing, scoring, rankings, check-in and a live leaderboard. Includes a working demonstration.',
    },
    privacy: { clientApproved: true },
  },
};
