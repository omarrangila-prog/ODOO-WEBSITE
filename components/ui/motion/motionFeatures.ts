import { domAnimation } from 'framer-motion';

/*
 * Kept in its own module so LazyMotion can import() it. Loaded this way the
 * animation features arrive as a separate chunk after hydration instead of
 * sitting in the route's initial JavaScript. domAnimation covers animate,
 * variants, exit, and hover/tap/focus/inView; nothing here uses drag or
 * layout animation, which would need domMax.
 */
export default domAnimation;
