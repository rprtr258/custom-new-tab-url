# Commands

- build: `bun run build` (compiles src/*.ts → js/ with type checking via bun build --check)
- typecheck: `bun run typecheck` (runs tsc --noEmit)
- watch: `bun run watch` (build in watch mode)
- install: `bun install` (no npm)

# Guidelines

- Use `bun` for everything — no npm/npx
- Source TypeScript files in `src/`, compiled output lands in `js/`
- HTML/CSS/images/manifest live at root, unchanged by build
