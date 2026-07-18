# Icons

This project uses `@lucide/astro` for icons. Do not import from `@tabler/icons`.

## Astro Icon Imports

```astro
---
import { Mail } from "@lucide/astro";
import { Button } from "@/components/starwind/button";
---

<Button>
  <Mail class="size-4" />
  Login with Email
</Button>
```

## Icon Buttons

```astro
---
import { Search } from "@lucide/astro";
import { Button } from "@/components/starwind/button";
---

<Button size="icon" aria-label="Search">
  <Search />
</Button>
```

Rules:

- Use the documented button icon size for icon-only buttons, commonly `size="icon"`.
- Add `aria-label` or visible text for icon-only controls.
- Do not import React icon packages in a plain Astro component unless the project uses a React island for that component.
- Avoid inline SVG when a project icon package already provides the icon.
- Let Starwind component CSS size common SVG children unless a specific icon needs a documented override.
- Do not use shadcn's `data-icon` convention unless a local Starwind component explicitly documents it.
- When added blocks import a different icon package, switch them to `@lucide/astro`.
