/**
 * The thin illuminated violet stage border from the approved design. One fixed,
 * non-interactive, decorative element: the border itself is drawn in CSS
 * (.cinema-frame) with a masked gradient so two corners carry a brighter
 * highlight, and the deep-indigo "wall" around the stage is its spread shadow.
 * Both layers are hidden from assistive technology and never intercept input.
 */
export function CinemaFrame() {
  return (
    <>
      {/* Order matters: the frame's shadow is the opaque wall, so the flares must come after it to sit on top. */}
      <div className="cinema-frame" aria-hidden="true" />
      <div className="cinema-flare" aria-hidden="true" />
    </>
  );
}
