export interface Shortcut {
  keys: string[] // each entry is one alternative; space-separated tokens render as separate keycaps
  desc: string
  mode?: string
}

export interface Group {
  title: string
  items: Shortcut[]
}

export interface Category {
  id: string
  label: string
  note?: string
  groups: Group[]
}

export const categories: Category[] = [
  {
    id: 'movement',
    label: 'Basic Movement',
    groups: [
      {
        title: 'Character & line',
        items: [
          { keys: ['h', 'j', 'k', 'l'], desc: 'Left / down / up / right' },
          { keys: ['0'], desc: 'Start of line' },
          { keys: ['^'], desc: 'First non-blank character of line' },
          { keys: ['$'], desc: 'End of line' },
          { keys: ['g _'], desc: 'Last non-blank character of line' },
          { keys: ['g j', 'g k'], desc: 'Down / up by display line (wrapped text)' },
        ],
      },
      {
        title: 'Words',
        items: [
          { keys: ['w'], desc: 'Start of next word' },
          { keys: ['b'], desc: 'Start of previous word' },
          { keys: ['e'], desc: 'End of word' },
          { keys: ['g e'], desc: 'End of previous word' },
          { keys: ['W', 'B', 'E'], desc: 'Same as w/b/e but WORDs (split on whitespace only)' },
        ],
      },
      {
        title: 'File & screen',
        items: [
          { keys: ['g g'], desc: 'Top of file' },
          { keys: ['G'], desc: 'Bottom of file' },
          { keys: ['{n} G', '{n} g g'], desc: 'Go to line n' },
          { keys: ['H', 'M', 'L'], desc: 'Top / middle / bottom of screen' },
          { keys: ['Ctrl-d', 'Ctrl-u'], desc: 'Half page down / up' },
          { keys: ['Ctrl-f', 'Ctrl-b'], desc: 'Full page down / up' },
          { keys: ['z z', 'z t', 'z b'], desc: 'Scroll cursor line to center / top / bottom' },
        ],
      },
      {
        title: 'Search & jump',
        items: [
          { keys: ['f {c}', 'F {c}'], desc: 'Jump to next / previous character c on line' },
          { keys: ['t {c}', 'T {c}'], desc: 'Jump to just before next / previous c' },
          { keys: [';', ','], desc: 'Repeat last f/t forward / backward' },
          { keys: ['/', '?'], desc: 'Search forward / backward' },
          { keys: ['n', 'N'], desc: 'Next / previous search match' },
          { keys: ['*', '#'], desc: 'Search word under cursor forward / backward' },
          { keys: ['%'], desc: 'Jump to matching bracket' },
          { keys: ['{', '}'], desc: 'Previous / next paragraph' },
          { keys: ['Ctrl-o', 'Ctrl-i'], desc: 'Jump back / forward in jump list' },
        ],
      },
      {
        title: 'LazyVim extras',
        items: [
          { keys: ['s {xx}'], desc: 'Flash jump: type 2 chars, pick a label' },
          { keys: ['S'], desc: 'Flash Treesitter: select syntax node' },
          { keys: ['Space Space'], desc: 'Find files' },
          { keys: ['Space /'], desc: 'Grep in project' },
          { keys: ['Space ,'], desc: 'Switch buffer' },
          { keys: ['Shift-h', 'Shift-l'], desc: 'Previous / next buffer' },
          { keys: ['Ctrl-h', 'Ctrl-j', 'Ctrl-k', 'Ctrl-l'], desc: 'Move between windows' },
        ],
      },
    ],
  },
  {
    id: 'lsp',
    label: 'LSP',
    note: 'LazyVim defaults. <leader> is Space.',
    groups: [
      {
        title: 'Navigate',
        items: [
          { keys: ['g d'], desc: 'Go to definition' },
          { keys: ['g r'], desc: 'References' },
          { keys: ['g I'], desc: 'Go to implementation' },
          { keys: ['g y'], desc: 'Go to type definition' },
          { keys: ['g D'], desc: 'Go to declaration' },
          { keys: [']]', '[['], desc: 'Next / previous reference under cursor' },
          { keys: ['Space s s'], desc: 'Document symbols' },
          { keys: ['Space s S'], desc: 'Workspace symbols' },
        ],
      },
      {
        title: 'Docs',
        items: [
          { keys: ['K'], desc: 'Hover documentation' },
          { keys: ['g K'], desc: 'Signature help' },
          { keys: ['Ctrl-k'], desc: 'Signature help', mode: 'Insert' },
        ],
      },
      {
        title: 'Code actions',
        items: [
          { keys: ['Space c a'], desc: 'Code action', mode: 'Normal / Visual' },
          { keys: ['Space c A'], desc: 'Source action (e.g. organize imports)' },
          { keys: ['Space c r'], desc: 'Rename symbol' },
          { keys: ['Space c R'], desc: 'Rename file' },
          { keys: ['Space c f'], desc: 'Format', mode: 'Normal / Visual' },
          { keys: ['Space c c'], desc: 'Run codelens', mode: 'Normal / Visual' },
          { keys: ['Space c C'], desc: 'Refresh & display codelens' },
        ],
      },
      {
        title: 'Diagnostics',
        items: [
          { keys: ['Space c d'], desc: 'Line diagnostics (float)' },
          { keys: ['] d', '[ d'], desc: 'Next / previous diagnostic' },
          { keys: ['] e', '[ e'], desc: 'Next / previous error' },
          { keys: ['] w', '[ w'], desc: 'Next / previous warning' },
          { keys: ['Space x x'], desc: 'Document diagnostics (Trouble)' },
          { keys: ['Space x X'], desc: 'Workspace diagnostics (Trouble)' },
        ],
      },
      {
        title: 'Info',
        items: [{ keys: ['Space c l'], desc: 'LSP info (:LspInfo)' }],
      },
    ],
  },
]
