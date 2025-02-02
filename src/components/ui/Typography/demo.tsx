export const Typography = () => {
  return (
    <div>
      {/* Existing Text Showcase */}
      <h1 className="font-avant-garde text-center">Typography Demo</h1>
      <h1 className="flex flex-col items-center text-9xl text-center uppercase font-avant-garde font-bold">
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
      <p className="font-nunito-sans text-center">Interactive Labs</p>

      {/* Headings */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading mb-4">Headings</h2>
        <div className="space-y-4">
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

      {/* Paragraphs */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading mb-4">Paragraphs</h2>
        <div className="space-y-4 max-w-prose">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The quick brown fox jumps over the lazy dog. Default paragraph text with standard line
            height and spacing. This is how most of your content will look.
          </p>
          <p className="text-sm leading-6 [&:not(:first-child)]:mt-6">
            The quick brown fox jumps over the lazy dog. Small text variant for less important
            content or supporting text.
          </p>
          <p className="text-lg leading-8 [&:not(:first-child)]:mt-6">
            The quick brown fox jumps over the lazy dog. Large text variant for important content or
            introductory paragraphs.
          </p>
        </div>
      </div>

      {/* Text Colors */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading mb-4">Text Colors</h2>
        <div className="space-y-6">
          {/* Brand Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading">Brand Colors</h3>
            <div className="grid gap-4">
              <div className="bg-cinnabar p-4 rounded-md">
                <p className="text-cinnabar-foreground">Text on Cinnabar Background</p>
              </div>
              <div className="bg-wheat p-4 rounded-md">
                <p className="text-wheat-foreground">Text on Wheat Background</p>
              </div>
              <div className="bg-smoky p-4 rounded-md">
                <p className="text-foreground">Text on Smoky Background</p>
              </div>
            </div>
          </div>

          {/* UI Colors */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading">UI Colors</h3>
            <div className="grid gap-4">
              <p className="text-primary">Primary Text</p>
              <p className="text-secondary">Secondary Text</p>
              <p className="text-accent">Accent Text</p>
              <p className="text-muted-foreground">Muted Text</p>
              <p className="text-destructive">Destructive Text</p>
            </div>
          </div>
        </div>
      </div>

      {/* Font Weights */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading mb-4">Font Weights</h2>
        <div className="space-y-4">
          <p className="font-light">Light - The quick brown fox jumps over the lazy dog (300)</p>
          <p className="font-normal">Regular - The quick brown fox jumps over the lazy dog (400)</p>
          <p className="font-medium">Medium - The quick brown fox jumps over the lazy dog (500)</p>
          <p className="font-semibold">
            Semibold - The quick brown fox jumps over the lazy dog (600)
          </p>
          <p className="font-bold">Bold - The quick brown fox jumps over the lazy dog (700)</p>
          <p className="font-extrabold">
            Extra Bold - The quick brown fox jumps over the lazy dog (800)
          </p>
        </div>
      </div>

      {/* Font Families */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading mb-4">Font Families</h2>
        <div className="space-y-4">
          <p className="font-avant-garde text-xl">Avant Garde - Primary Display Font</p>
          <p className="font-nunito-sans text-xl">Nunito Sans - Primary Body Font</p>
        </div>
      </div>

      {/* Special Text Styles */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading mb-4">Special Text Styles</h2>
        <div className="space-y-4">
          <p className="italic">Italic text style</p>
          <p className="underline">Underlined text style</p>
          <p className="line-through">Strikethrough text style</p>
          <p className="uppercase">Uppercase text transform</p>
          <p className="lowercase">Lowercase text transform</p>
          <p className="capitalize">Capitalized text transform</p>
          <div className="bg-primary/10 p-4 rounded-md">
            <p className="text-sm text-muted-foreground">
              Muted text in a subtle container - often used for helper text or metadata
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
