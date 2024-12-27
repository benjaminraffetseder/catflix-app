import { z } from "zod";

// Define schema for environment variables
const envSchema = z.object({
  BACKEND_URL: z.string().url(),
  ENABLE_ANALYTICS: z
    .union([z.literal("true"), z.literal("false")])
    .transform((val) => val === "true")
    .optional(),
  // Add more environment variables as needed
});

// Create a type from the schema
type EnvSchema = z.infer<typeof envSchema>;

// Function to validate environment variables
function validateEnv(): EnvSchema {
  try {
    // In Next.js, we can access env variables through process.env
    const env = envSchema.parse({
      BACKEND_URL: process.env.BACKEND_URL,
      ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
      // Add more environment variables as needed
    });

    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => err.path.join("."))
        .join(", ");
      throw new Error(
        `❌ Invalid environment variables: ${missingVars}\n${JSON.stringify(error.errors, null, 2)}`
      );
    }
    throw new Error("❌ Failed to validate environment variables");
  }
}

// Export validated environment variables
export const env = validateEnv();
