import { z } from "zod";

// Zod schemas for both forms

export const baseFormSchema = z.object({
    name: z.string().min(2, "Nom trop court").max(100, "Nom trop long"),
    email: z.string().email("Adresse email invalide"),
    phone: z.string().optional(),
    message: z.string().optional(),
    website: z.string().max(0, "Honeypot trigger").optional(), // Honeypot field must be empty
});

export const demoDevisSchema = baseFormSchema.extend({
    company: z.string().min(1, "Nom de l'entreprise requis").max(100),
    type: z.enum(["demo", "devis"]),
});

export const rdvSchema = baseFormSchema.extend({
    timeslot: z.string().min(1, "Créneau souhaité requis"),
});
