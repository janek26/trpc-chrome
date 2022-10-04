import { initTRPC } from '@trpc/server';
import { createChromeHandler } from 'trpc-chrome/dist/adapter';
import { z } from 'zod';

const t = initTRPC.create();

const appRouter = t.router({
  openNewTab: t.procedure.input(z.object({ url: z.string().url() })).mutation(async ({ input }) => {
    await chrome.tabs.create({ url: input.url, active: true });
  }),
});

export type AppRouter = typeof appRouter;

createChromeHandler({ router: appRouter });
