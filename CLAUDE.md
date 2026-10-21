# ui-studio

Sketch studio: Puck editor + shadcn kit over JSON sketch files. Usage and file format are in
`README.md`. The code has no comments; the reasons behind it are here.

## Sketch files (`vite-sketches.ts`, `src/sketches.ts`)

- The plugin serves `SKETCH_DIR` at `/sketches/`: `<screen>/<variant>.json` plus a generated
  `index.json` (`{ "<screen>": ["<variant>", ...] }`). `PUT` saves a variant (dev server only).
- `generateBundle` copies the same files into the build, so a static deploy serves the same URLs
  and the pages need no separate code path.
- Any change in `SKETCH_DIR` (agent or editor) sends the `sketches:changed` HMR event; `useJson`
  refetches on it so open boards update. The editor passes `refetchOnSketchChange = false`:
  reloading its data would drop unsaved edits.
- `useJson` returns `undefined` while loading and `null` when the file doesn't exist.

## Kit (`src/kit/`)

- One file per block in `src/kit/blocks/<name>.tsx`, exporting `block: Block = { name, group, config }`
  with `config: ComponentConfig<Props>`. `config.tsx` collects every file with `import.meta.glob`,
  so adding a block is adding a file; nothing else is edited. `group` places it in the editor
  sidebar; the groups and their order are `groups` in `options.ts`.
- Shared helpers (sizes, lookups, `choices`, `onOff`, `splitOptions`) are in `options.ts`;
  `labelled-field.tsx` is the label-above-control wrapper used by form blocks.
- Each block renders one shadcn component and exposes only design-level props (no callbacks, no
  free class names), so sketches stay easy to edit and `promote` stays one block → one component.
  Lists are comma-separated strings; booleans are the `onOff` radio. Renders are static (no state):
  a sketch shows one state, e.g. the selected tab or option is a prop.
- Tailwind only sees complete class names in source, so props map to classes through lookup
  objects (`gaps`, `aligns`, ...), never template strings.
- `sketches/kit/<name>.json` is a sample per block; `/board/kit` shows them all.
- The page root holds the variant's theme and notes. `ThemeFrame` sets shadcn CSS variables on a
  wrapper (not `:root`), so variants with different themes sit side by side on one board.
  `readableTextOn` picks black or white text for the primary colour.

## Pages (`src/App.tsx`, `src/pages/`)

Routes: `/`, `/board/<screen>`, `/edit/<screen>/<variant>`, `/view/<screen>/<variant>`, parsed from
`location.pathname` (plain links, no router). `/board` shows every variant side by side; one
screenshot of it is the sketch board. `?w=<px>` sets the frame width for `/board` and `/view`
(default 390, phone).

## Running as a package (`bin/sketch-studio.js`, `vite.config.ts`)

- `sketch-studio [dir] [--port]` starts Vite with this package as root and `SKETCH_DIR` = `dir`
  (default `./sketches`); `sketch-studio build [dir] [--out]` writes a static site.
- `vite` and `@vitejs/plugin-react` are runtime dependencies because the CLI runs Vite.
- Installed through `pnpm dlx`, dependencies live in pnpm's global store, outside any project
  root, and Vite refuses to serve their files (fonts). `server.fs.allow` lists each dependency's
  real folder.
- `src/index.css` has `@source "./"`: Tailwind skips `node_modules` when detecting sources, and
  installed, the whole package is inside `node_modules`.
- The editor imports Puck's `no-external.css`: `puck.css` loads the Inter font from rsms.me.
- Puck is pinned (`@puckeditor/core` 0.x).
