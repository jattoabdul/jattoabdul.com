'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, FileText, Hash, Search } from 'lucide-react';

import { primaryNav } from '@/data/site';
import { posts } from '@/data/posts';
import { projects } from '@/data/projects';
import { captureEvent } from '@/lib/posthog-client';
import { cn } from '@/lib/utils';

type CommandTriggerProps = {
  variant?: 'pill' | 'icon';
  className?: string;
};

export function CommandMenuTrigger({ variant = 'pill', className }: CommandTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(v => {
          if (!v) captureEvent('command_menu_opened', { trigger: 'keyboard' });
          return !v;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function handleOpen() {
    captureEvent('command_menu_opened', { trigger: 'button' });
    setOpen(true);
  }

  return (
    <>
      {variant === 'pill' ? (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open command menu"
          className={cn(
            'inline-flex items-center gap-2 rounded-md border border-border bg-bg-raised px-2.5 py-1.5 text-[12px] text-fg-3 transition-colors hover:border-border-mid hover:text-fg',
            className
          )}
        >
          <Search className="size-[13px]" />
          <kbd className="font-mono text-[11px]">⌘K</kbd>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open command menu"
          className={cn(
            'inline-flex size-8 items-center justify-center rounded-md text-fg-3 transition-colors hover:bg-bg-raised hover:text-fg',
            className
          )}
        >
          <Search className="size-4" />
        </button>
      )}
      <CommandMenu open={open} onOpenChange={setOpen} />
    </>
  );
}

type CommandMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter();

  const go = useCallback(
    (href: string, label: string, group: string, external = false) => {
      captureEvent('command_menu_item_selected', { href, label, group, external });
      onOpenChange(false);
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        router.push(href);
      }
    },
    [onOpenChange, router]
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[14vh] z-50 mx-auto w-[calc(100vw-32px)] max-w-[540px] -translate-x-1/2 overflow-hidden rounded-xl border border-border-mid bg-bg-surface shadow-lg focus:outline-none data-[state=open]:animate-fade-in"
        >
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Command label="Site command menu" loop>
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Search className="size-4 text-fg-3" />
              <Command.Input
                autoFocus
                placeholder="Search pages, posts, projects…"
                className="flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-3"
              />
              <kbd className="rounded border border-border bg-bg-raised px-1.5 py-0.5 font-mono text-[11px] text-fg-3">
                esc
              </kbd>
            </div>

            <Command.List className="max-h-[380px] overflow-y-auto px-1 py-1.5">
              <Command.Empty className="px-4 py-9 text-center text-sm text-fg-3">
                No results.
              </Command.Empty>

              <Command.Group
                heading="Navigate"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-3"
              >
                <CommandItem
                  onSelect={() => go('/', 'Home', 'navigate')}
                  icon="hash"
                  label="Home"
                />
                {primaryNav.map(nav => (
                  <CommandItem
                    key={nav.href}
                    onSelect={() => go(nav.href, nav.label, 'navigate')}
                    icon="hash"
                    label={nav.label}
                  />
                ))}
              </Command.Group>

              <Command.Group
                heading="Writing"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-3"
              >
                {posts.map(post => (
                  <CommandItem
                    key={post.slug}
                    icon={post.source === 'medium' ? 'external' : 'file'}
                    label={post.title}
                    meta={post.category}
                    onSelect={() =>
                      post.source === 'medium' && post.url
                        ? go(post.url, post.title, 'writing', true)
                        : go(`/writing/${post.slug}`, post.title, 'writing')
                    }
                  />
                ))}
              </Command.Group>

              <Command.Group
                heading="Projects"
                className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-3"
              >
                {projects.map(p => (
                  <CommandItem
                    key={p.slug}
                    icon="hash"
                    label={p.title}
                    meta={p.role}
                    onSelect={() => go(`/projects/${p.slug}`, p.title, 'projects')}
                  />
                ))}
              </Command.Group>
            </Command.List>

            <div className="flex items-center gap-4 border-t border-border bg-bg-raised px-4 py-2.5 text-[11px] text-fg-3">
              {[
                ['↑↓', 'navigate'],
                ['↵', 'open'],
                ['esc', 'close'],
              ].map(([k, l]) => (
                <span key={k} className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10.5px]">
                    {k}
                  </kbd>
                  {l}
                </span>
              ))}
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

type CommandItemProps = {
  icon: 'hash' | 'file' | 'external';
  label: string;
  meta?: string;
  onSelect: () => void;
};

function CommandItem({ icon, label, meta, onSelect }: CommandItemProps) {
  const Icon = icon === 'file' ? FileText : icon === 'external' ? ArrowUpRight : Hash;
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-[14px] text-fg data-[selected=true]:bg-bg-raised"
    >
      <Icon className="size-[15px] shrink-0 text-fg-3" />
      <span className="flex-1 truncate">{label}</span>
      {meta && <span className="font-mono text-[11.5px] text-fg-3">{meta}</span>}
    </Command.Item>
  );
}
