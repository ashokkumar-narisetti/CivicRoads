import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;

export const RoleEnum = z.enum(['OFFICER', 'FIELD_ENGINEER']);

export const OfficerResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  municipalityId: z.string().uuid(),
  role: RoleEnum,
});

export type OfficerResponse = z.infer<typeof OfficerResponseSchema>;
