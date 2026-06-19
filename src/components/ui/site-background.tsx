/**
 * Studio-paper backdrop: a calm, near-solid warm off-white with a very subtle
 * radial sweep — matching the 3D bear's studio environment. Replaces the
 * animated WebGL flow gradient so the bear and the work stay the only heroes
 * (and so the homepage runs one fewer WebGL context).
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(130% 100% at 50% 16%, #ffffff 0%, #f3f1ec 48%, #e7e4dd 100%)",
      }}
    />
  );
}
