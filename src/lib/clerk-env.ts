const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const isTestClerkKey = clerkPublishableKey?.startsWith("pk_test_") ?? false;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY. Set it in your environment before starting the app."
  );
}

if (import.meta.env.PROD && isTestClerkKey) {
  throw new Error(
    "Production builds must use a live Clerk publishable key instead of a development/test key."
  );
}

export { clerkPublishableKey, isTestClerkKey };
