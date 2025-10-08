import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const SessionChatTable = pgTable("session_chat", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar({ length: 255 }).notNull(),
  createdBy: varchar({ length: 255 }).notNull(),
  notes: text(),
  selectedDoctor: varchar({ length: 255 }),
  createdOn: varchar({ length: 255 }).notNull(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credit: integer(),
});
