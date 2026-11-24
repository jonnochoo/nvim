export interface Shortcut {
  keys: string[] // each entry is one alternative; space-separated tokens render as separate keycaps
  desc: string
  mode?: string
}

export interface Group {
  title: string
  items: Shortcut[]
}

export interface Concept {
  title: string
  text: string
  ascii?: string
}

export interface Category {
  id: string
  label: string
  note?: string
  concepts?: Concept[]
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
          { keys: ['M'], desc: 'Middle of screen' },
          { keys: ['H', 'L'], desc: 'Top / bottom of screen (plain Vim only; LazyVim remaps these to switch buffers)' },
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
        title: 'Line numbers',
        items: [
          { keys: ['Space u l'], desc: 'Toggle line numbers' },
          { keys: ['Space u L'], desc: 'Toggle relative line numbers' },
          { keys: [':set number!'], desc: 'Toggle line numbers (plain Neovim)' },
          { keys: [':set relativenumber!'], desc: 'Toggle relative numbers (plain Neovim)' },
        ],
      },
      {
        title: 'Files',
        items: [
          { keys: ['Space f n'], desc: 'New file (empty buffer, name it on save)' },
          { keys: ['Space e'], desc: 'Toggle file explorer' },
          { keys: ['a'], desc: 'New file in the explorer (end with / for a folder)', mode: 'Explorer' },
          { keys: [':e {path}'], desc: 'Open or create a file by path' },
          { keys: [':w', 'Ctrl-s'], desc: 'Save (Ctrl-s is a LazyVim mapping)' },
          { keys: [':w {path}'], desc: 'Save the buffer under a new name' },
          { keys: ['Space b d'], desc: 'Close the current buffer' },
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
          { keys: ['Shift-h', 'Shift-l'], desc: 'Previous / next buffer (replaces Vim\'s H / L screen jumps)' },
          { keys: ['Ctrl-h', 'Ctrl-j', 'Ctrl-k', 'Ctrl-l'], desc: 'Move between windows' },
        ],
      },
    ],
  },
  {
    id: 'editing',
    label: 'Editing',
    note: 'Operators + text objects. Click a row to flash it.',
    concepts: [
      {
        title: 'The grammar: operator + scope + object',
        text: 'Most editing commands are a sentence. Pick what to do, how much of the target, and the target itself.',
        ascii: `c   i   '
│   │   └─ object    quotes (also w word, ( ) { } [ ], t tag, p paragraph...)
│   └───── scope     i = inside, a = around
└───────── operator  c = change`,
      },
      {
        title: 'Operators: what to do',
        text: 'c change = delete, then drop into Insert mode. d delete = cut into the register (p pastes it back). y yank = copy, nothing is removed. v select = start Visual mode on the target instead of acting on it.',
      },
      {
        title: 'Inside vs around',
        text: 'Inside (i) is just the contents. Around (a) also takes the delimiters, and for words it takes the trailing space.',
        ascii: `text      say('hello world')
ci'  ->   say('|')       contents replaced, quotes stay
ca'  ->   say(|)         quotes gone too
ciw  ->   change the word only
caw  ->   change the word + trailing space`,
      },
      {
        title: 'Where the cursor must be',
        text: 'Quotes: the cursor can be anywhere on the line, Vim searches forward to find a pair. Brackets and tags: the cursor must be inside the pair (or on a bracket). Any object works with any operator: ci", di(, yit, vap.',
      },
      {
        title: 'Counts and repeat',
        text: 'Put a number in front to repeat: 3dd deletes 3 lines, d2w deletes 2 words. Press . to repeat your last change anywhere, which makes ciw + . a fast rename loop.',
      },
    ],
    groups: [
      {
        title: 'Enter Insert mode',
        items: [
          { keys: ['o', 'O'], desc: 'Open a new line below / above, then insert' },
          { keys: ['i', 'a'], desc: 'Insert before / after the cursor' },
          { keys: ['I', 'A'], desc: 'Insert at start / end of the line' },
          { keys: ['g i'], desc: 'Insert where you last left Insert mode' },
          { keys: ['Esc'], desc: 'Back to Normal mode (also Ctrl-[)', mode: 'Insert' },
        ],
      },
      {
        title: 'Change inside / around (quotes & brackets)',
        items: [
          { keys: ["c i '", "c a '"], desc: "Change inside / around single quotes" },
          { keys: ['c i "', 'c a "'], desc: 'Change inside / around double quotes' },
          { keys: ['c i `', 'c a `'], desc: 'Change inside / around backticks' },
          { keys: ['c i (', 'c a ('], desc: 'Change inside / around parentheses (also b)' },
          { keys: ['c i {', 'c a {'], desc: 'Change inside / around braces (also B)' },
          { keys: ['c i [', 'c a ['], desc: 'Change inside / around square brackets' },
          { keys: ['c i <', 'c a <'], desc: 'Change inside / around angle brackets' },
        ],
      },
      {
        title: 'Change inside / around (words & blocks)',
        items: [
          { keys: ['c i w', 'c a w'], desc: 'Change inside / around word' },
          { keys: ['c i W', 'c a W'], desc: 'Change inside / around WORD (whitespace-delimited)' },
          { keys: ['c i p', 'c a p'], desc: 'Change inside / around paragraph' },
          { keys: ['c i s', 'c a s'], desc: 'Change inside / around sentence' },
          { keys: ['c i t', 'c a t'], desc: 'Change inside / around HTML/XML tag' },
        ],
      },
      {
        title: 'Same objects, other operators',
        items: [
          { keys: ["d i '", 'd a ('], desc: 'Delete inside quotes / around parentheses' },
          { keys: ['d i w', 'd a w'], desc: 'Delete inside / around word' },
          { keys: ['d i t', 'd a t'], desc: 'Delete inside / around tag' },
          { keys: ['y i w', 'y i {'], desc: 'Yank (copy) word / contents of braces' },
          { keys: ['y a p'], desc: 'Yank paragraph with surrounding blank line' },
          { keys: ['v i "', 'v a {'], desc: 'Visually select inside quotes / around braces' },
          { keys: ['v i w', 'v a p'], desc: 'Select word / paragraph' },
        ],
      },
      {
        title: 'Whole-line & to-end-of-line',
        items: [
          { keys: ['c c', 'C'], desc: 'Change whole line / to end of line' },
          { keys: ['d d', 'D'], desc: 'Delete whole line / to end of line' },
          { keys: ['y y', 'Y'], desc: 'Yank whole line / to end of line' },
          { keys: ['x', 'X'], desc: 'Delete character under / before cursor' },
          { keys: ['p', 'P'], desc: 'Paste after / before cursor' },
          { keys: ['J'], desc: 'Join next line onto this one' },
        ],
      },
      {
        title: 'Replace',
        items: [
          { keys: ['r {c}'], desc: 'Replace one character with c' },
          { keys: ['R'], desc: 'Replace mode: type over text until Esc' },
          { keys: ['s', 'S'], desc: 'Substitute character / whole line (plain Vim; LazyVim\'s Flash takes over s and S, use x then i or c l / c c instead)' },
          { keys: ['~'], desc: 'Toggle case of character' },
          { keys: ['g u {m}', 'g U {m}'], desc: 'Lowercase / uppercase over motion (e.g. g U i w)' },
          { keys: [':%s/old/new/g'], desc: 'Replace all in file (add c to confirm each)' },
        ],
      },
      {
        title: 'Operator + motion',
        items: [
          { keys: ['c w', 'd w', 'y w'], desc: 'Operate to end of word / start of next word' },
          { keys: ['c $', 'd $', 'y $'], desc: 'Operate to end of line' },
          { keys: ['c 0', 'd 0', 'y 0'], desc: 'Operate to start of line' },
          { keys: ['d t {c}', 'c t {c}'], desc: 'Operate up to (not including) character c' },
          { keys: ['d f {c}', 'c f {c}'], desc: 'Operate through character c' },
          { keys: ['d g g', 'd G'], desc: 'Delete to top / bottom of file' },
        ],
      },
      {
        title: 'Visual mode',
        items: [
          { keys: ['v'], desc: 'Select by character' },
          { keys: ['V'], desc: 'Select by line' },
          { keys: ['Ctrl-v'], desc: 'Select a rectangular block' },
          { keys: ['o'], desc: 'Jump to the other end of the selection' },
          { keys: ['g v'], desc: 'Reselect the previous selection' },
          { keys: ['c', 'd', 'y'], desc: 'Act on the selection', mode: 'Visual' },
        ],
      },
      {
        title: 'Undo & repeat',
        items: [
          { keys: ['u'], desc: 'Undo' },
          { keys: ['Ctrl-r'], desc: 'Redo' },
          { keys: ['.'], desc: 'Repeat last change' },
        ],
      },
      {
        title: 'Code objects (mini.ai, LazyVim)',
        items: [
          { keys: ['i f', 'a f'], desc: 'Inside / around function or method (body / whole thing)' },
          { keys: ['i c', 'a c'], desc: 'Inside / around class' },
          { keys: ['i a', 'a a'], desc: 'Inside / around argument' },
          { keys: ['i o', 'a o'], desc: 'Inside / around block, conditional or loop' },
          { keys: ['i u', 'a u'], desc: 'Inside / around function call' },
          { keys: ['i U', 'a U'], desc: 'Function call, ignoring the dot prefix' },
          { keys: ['i e', 'a e'], desc: 'Part of a name (camelCase / snake_case piece)' },
          { keys: ['i d', 'a d'], desc: 'Digits' },
          { keys: ['a g', 'i g'], desc: 'Entire buffer (e.g. y a g)' },
          { keys: ['i q', 'a q'], desc: 'Any quote type' },
          { keys: ['i b', 'a b'], desc: 'Any bracket type' },
          { keys: ['i ?', 'a ?'], desc: 'Prompts you for the delimiters' },
          { keys: ['v i f'], desc: 'Select a method body; repeat i f to widen to the enclosing function' },
        ],
      },
      {
        title: 'Next / last modifiers (mini.ai)',
        items: [
          { keys: ["c i n '"], desc: "Change inside the next pair of single quotes" },
          { keys: ['d i l )'], desc: 'Delete inside the previous parentheses' },
          { keys: ['y a n f'], desc: 'Yank the next function' },
        ],
      },
      {
        title: 'Surround (mini.surround)',
        items: [
          { keys: ['g s a'], desc: 'Add surrounding (e.g. g s a i w ")' },
          { keys: ['g s d'], desc: 'Delete surrounding' },
          { keys: ['g s r'], desc: 'Replace surrounding' },
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
