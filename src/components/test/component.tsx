import { Button } from '@components/ui/button';

export const TestComponent = () => {
  return (
    <div>
      <h1>Hello World Test Component</h1>
      <Button>Button</Button>
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
      <p className="font-nunito-sans">Interactive Labs</p>
      <span className="bg-ruby text-ruby-foreground hover:bg-ruby-light">Hover me</span>
      <div className="bg-ruby/50">50% opacity ruby background</div>
      <div className="text-sapphire">75% opacity sapphire text</div>
      <div className="border-2 border-jade-500/25">25% opacity jade border</div>
      <div className="bg-ruby-500">Ruby 500</div>
      <div className="bg-sapphire-600">Sapphire 600</div>
      <div className="bg-jade-400">Jade 400</div>
      <button className="bg-primary text-primary-foreground">Primary Button</button>
      <div className="bg-secondary text-secondary-foreground">Secondary Content</div>
      <div className="bg-ruby-500/50">50% opacity</div>
      <div className="bg-sapphire-600/75">75% opacity</div>
      <div className="bg-[oklch(var(--color-ruby-500)/0.8)]">Custom opacity</div>
      <button
        className="
  bg-ruby/90
  hover:bg-ruby/100
  text-ruby-foreground/90
  border-ruby/20
  hover:border-ruby/40
  transition-all
"
      >
        Hover me
      </button>
      <div
        className="
  bg-[hsl(var(--sapphire)/0.95)]
  text-[hsl(var(--sapphire-foreground)/0.9)]
  backdrop-blur-sm
"
      >
        Glass effect
      </div>
    </div>
  );
};
