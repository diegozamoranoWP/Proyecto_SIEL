import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // @ts-expect-error Prisma CLI acepta 'migrate', pero los tipos del editor pueden no incluirlo aún.
  migrate: {
    url: process.env.DATABASE_URL,
  },
});