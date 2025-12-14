import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";

// Better Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  // Medical fields for SPE-M
  crm: text("crm"),
  specialty: text("specialty"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Subscription table for Polar webhook data
export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt").notNull(),
  modifiedAt: timestamp("modifiedAt"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  recurringInterval: text("recurringInterval").notNull(),
  status: text("status").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd").notNull(),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  canceledAt: timestamp("canceledAt"),
  startedAt: timestamp("startedAt").notNull(),
  endsAt: timestamp("endsAt"),
  endedAt: timestamp("endedAt"),
  customerId: text("customerId").notNull(),
  productId: text("productId").notNull(),
  discountId: text("discountId"),
  checkoutId: text("checkoutId").notNull(),
  customerCancellationReason: text("customerCancellationReason"),
  customerCancellationComment: text("customerCancellationComment"),
  metadata: text("metadata"), // JSON string
  customFieldData: text("customFieldData"), // JSON string
  userId: text("userId").references(() => user.id),
});

// SPE-M System Tables

// Patients table
export const patients = pgTable("patients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  cpf: text("cpf").notNull().unique(), // Will be encrypted in application layer
  birthDate: timestamp("birthDate"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  notes: text("notes"),
  medicalHistory: text("medicalHistory"), // Patient's medical history
  allergies: text("allergies"), // Known allergies
  currentMedications: text("currentMedications"), // Current medications
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  deletedAt: timestamp("deletedAt"), // Soft delete for LGPD compliance
});

// SPE-M Forms table
export const forms = pgTable("forms", {
  id: text("id").primaryKey(),
  patientId: text("patientId")
    .notNull()
    .references(() => patients.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("draft"), // draft, finalized, archived
  totalScore: decimal("totalScore", { precision: 5, scale: 2 }),
  profileClassification: text("profileClassification"), // low, medium, high
  generalNotes: text("generalNotes"),
  recommendations: text("recommendations"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  finalizedAt: timestamp("finalizedAt"),
  version: integer("version").notNull().default(1),
});

// Form Criteria - 8 criteria per form
export const formCriteria = pgTable("formCriteria", {
  id: text("id").primaryKey(),
  formId: text("formId")
    .notNull()
    .references(() => forms.id, { onDelete: "cascade" }),
  criterionNumber: integer("criterionNumber").notNull(), // 1-8
  criterionName: text("criterionName").notNull(),
  data: jsonb("data").notNull(), // Stores all fields for this criterion
  score: decimal("score", { precision: 4, scale: 2 }),
  notes: text("notes"),
  recommendations: text("recommendations"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Form Images - 6 photos per form
export const formImages = pgTable("formImages", {
  id: text("id").primaryKey(),
  formId: text("formId")
    .notNull()
    .references(() => forms.id, { onDelete: "cascade" }),
  imageType: text("imageType").notNull(), // frontal, profile_right, profile_left, oblique_right, oblique_left, base
  storageUrl: text("storageUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  annotations: jsonb("annotations"), // Canvas drawings stored as JSON
  metadata: jsonb("metadata"), // Size, mime type, dimensions, etc
  uploadedAt: timestamp("uploadedAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Audit Logs for LGPD compliance
export const auditLogs = pgTable("auditLogs", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  action: text("action").notNull(), // create, read, update, delete, export, print
  entityType: text("entityType").notNull(), // patient, form, image
  entityId: text("entityId").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  metadata: jsonb("metadata"), // Additional context about the action
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});
