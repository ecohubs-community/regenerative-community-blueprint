# Regenerative Community Blueprint (RCOS)

Welcome to the **Regenerative Community Blueprint**, the software implementation and digital home for the **Regenerative Community Operating System (RCOS)**.

## What is RCOS?

The **Regenerative Community Operating System (RCOS)** is a formal, layered specification for designing, operating, and evolving intentional communities without relying on charisma, ideology, or informal power.

RCOS treats a community as a **governed system**, not a social experiment. It defines the minimum structural requirements needed for a community to remain legible, auditable, survivable, and scalable. It is not a lifestyle, culture, or belief system; rather, it is an **operating system**—a set of explicit rules, interfaces, invariants, and test cases that constrain how choices are made, how power is bounded, and how change occurs.

RCOS exists to replace vagueness with structure, ensuring that communities can withstand failure modes without resorting to informal or off-the-books fixes.

## Licensing

RCOS consists of three components, each with explicitly defined licensing:

- **RCOS specification** → CC BY 4.0
- **RCOS templates** → CC BY 4.0
- **RCOS software implementation** → AGPL-3.0

For full details, please refer to the respective license files in the repository.

---

## Technical Stack & Development

This software implementation is built with [Svelte](https://svelte.dev/) and [`sv`](https://github.com/sveltejs/cli).

### Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
