# ui-studio (npm: `sketch-studio`)

A small sketch studio for UI screens: cheap trial and error on layout and colours before any real
code is written. Sketches are JSON files, so an agent can write variants in seconds and you can edit
them by hand in a visual editor ([Puck](https://puckeditor.com)). They render with shadcn/ui
components, so a chosen sketch is a short step from real code.

## Use

Run it in your project folder:

```sh
pnpm dlx sketch-studio            # edit ./sketches at http://localhost:5173
pnpm dlx sketch-studio design/sketches --port 5300
pnpm dlx sketch-studio build      # static site in ./sketch-site, to share
```

Open `/board/<screen>` next to your agent: when the agent (or anyone) writes a sketch file, the
board refreshes by itself.

Developing the studio itself: `pnpm install && pnpm dev` (uses `./sketches`).

| Page | What |
| --- | --- |
| `/` | All screens and variants |
| `/board/<screen>` | Every variant of a screen side by side, with title and notes. One screenshot of this page is the sketch board. `?w=1280` for a wider frame (default 390). |
| `/edit/<screen>/<variant>` | Visual editor. **Publish** saves to `<SKETCH_DIR>/<screen>/<variant>.json`; a new name creates a new file. |
| `/view/<screen>/<variant>` | One variant on its own, `?w=` as above |

`pnpm build` copies the sketches into `dist/`, so a static deploy shares the board and view pages
(editing needs `pnpm dev`).

## Sketch files

Puck data. The page root holds the variant's theme and notes:

```json
{
  "root": { "props": { "title": "Plain, big title", "notes": "Open questions…",
                       "primary": "#16a34a", "radius": "1rem", "font": "sans", "mode": "light" } },
  "content": [
    { "type": "Stack", "props": { "id": "Stack-1", "gap": "md", "padding": "lg", "align": "stretch",
        "items": [{ "type": "Text", "props": { "id": "Text-2", "text": "Welcome back", "style": "title" } }] } }
  ]
}
```

Each variant's theme is applied to its own wrapper (shadcn CSS variables), so variants with
different colours sit side by side on one board.

## Kit

Defined in `src/kit/config.tsx` (layout and content) and `src/kit/forms.tsx` (forms). Each entry renders one shadcn component and has only design-level
props, no callbacks or free class names.

| Component | Props |
| --- | --- |
| `Stack` | `gap`, `padding` (none/sm/md/lg), `align` (start/center/stretch), `items` (slot) |
| `Row` | `gap`, `justify` (start/center/end/between), `align` (start/center/end), `items` (slot) |
| `Text` | `text`, `style` (title/heading/body/muted/small) |
| `Button` | `label`, `variant` (default/outline/secondary/ghost/link/destructive), `size` (sm/default/lg), `width` (auto/full) |
| `Card` | `title`, `description`, `items` (slot) |
| `Input` | `label`, `placeholder`, `type` (text/email/tel/password/number) |
| `Textarea` | `label`, `placeholder` |
| `Select` | `label`, `placeholder`, `options` (comma separated) |
| `Checkbox` | `label`, `checked` (true/false) |
| `RadioGroup` | `label`, `options` (comma separated), `selected` |
| `Switch` | `label`, `checked` (true/false) |

Root (theme): `title`, `notes`, `primary` (hex), `radius` (0rem/0.375rem/0.625rem/1rem), `font`
(sans/serif/mono), `mode` (light/dark).

## License

MIT
