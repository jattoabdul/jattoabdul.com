export const Typography = () => {
  return (
    <div className="space-y-16">
      {/* Heading */}
      <div className="space-y-4">
        <h2 className="text-2xl font-heading">Typography System</h2>
        <p className="text-muted-foreground">A showcase of our typography system and text styles.</p>
      </div>

      {/* Hero Text Showcase */}
      <div className="py-12 space-y-6">
        <h1 className="flex flex-col items-center text-9xl text-center uppercase font-avant-garde font-bold leading-none tracking-tight">
          <div className="line flex">
            <div className="char">M</div>
            <div className="char">a</div>
            <div className="char">k</div>
            <div className="char">i</div>
            <div className="char">n</div>
            <div className="char">g</div>
          </div>
          <div className="line flex">
            <div className="char">G</div>
            <div className="char">o</div>
            <div className="char">o</div>
            <div className="char">d</div>
          </div>
          <div className="line flex">
            <div className="char">S</div>
            <div className="char">h</div>
            <div className="char">i</div>
            <div className="char">t</div>
          </div>
          <div className="line flex">
            <div className="char">S</div>
            <div className="char">i</div>
            <div className="char">n</div>
            <div className="char">c</div>
            <div className="char">e</div>
          </div>
          <div className="line flex">
            <div className="char">2</div>
            <div className="char">0</div>
            <div className="char">0</div>
            <div className="char">9</div>
          </div>
        </h1>
        <p className="font-nunito-sans text-center text-xl text-muted-foreground">Interactive Labs</p>
      </div>

      {/* Headings */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Headings</h3>
          <p className="text-muted-foreground">Available heading styles with different sizes and weights.</p>
        </div>
        <div className="space-y-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Heading 1 - The Quick Brown Fox
          </h1>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            Heading 2 - The Quick Brown Fox
          </h2>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Heading 3 - The Quick Brown Fox
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Heading 4 - The Quick Brown Fox
          </h4>
        </div>
      </div>

      {/* Body Text */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Body Text</h3>
          <p className="text-muted-foreground">Different text styles for body content.</p>
        </div>
        <div className="space-y-6">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The quick brown fox jumps over the lazy dog. This is a paragraph of text that demonstrates
            the default body style. It includes multiple sentences to show line height and spacing.
          </p>
          <p className="text-xl text-muted-foreground">
            Large muted text style - The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-sm text-muted-foreground">
            Small muted text style - The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>

      {/* Lists */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Lists</h3>
          <p className="text-muted-foreground">Different list styles and variations.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="list-disc list-inside space-y-2">
            <li>First item in an unordered list</li>
            <li>Second item in an unordered list</li>
            <li>Third item in an unordered list</li>
          </ul>
          <ol className="list-decimal list-inside space-y-2">
            <li>First item in an ordered list</li>
            <li>Second item in an ordered list</li>
            <li>Third item in an ordered list</li>
          </ol>
        </div>
      </div>

      {/* Inline Text */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Inline Styles</h3>
          <p className="text-muted-foreground">Various inline text decorations and styles.</p>
        </div>
        <div className="space-y-4">
          <p>
            Text can be <strong>bold</strong>, <em>italic</em>, or <u>underlined</u>. You can also add{' '}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              inline code
            </code>{' '}
            or <kbd className="bg-accent px-1 py-0.5 text-accent-foreground">keyboard shortcuts</kbd>.
          </p>
          <p>
            Links can be <a href="#" className="font-medium text-primary underline underline-offset-4">underlined</a> or{' '}
            <a href="#" className="font-medium text-primary hover:underline">hover underlined</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
