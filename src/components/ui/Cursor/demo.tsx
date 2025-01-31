import { Cursor } from '.';

export function CursorDemo() {
  return (
    <div className="min-h-[50vh] p-16 space-y-14">
      <h2 className="text-2xl font-heading mb-4">Interactive Cursor Demo</h2>
      <div className="space-y-8">
        <p className="max-w-prose">
          Move your mouse around to see the interactive cursor effect. Try moving your mouse out of the
          window to see the exit animation.
        </p>
      </div>
      <Cursor />
    </div>
  );
}
