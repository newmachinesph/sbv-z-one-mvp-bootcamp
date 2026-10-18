import "@testing-library/jest-dom";
import { vi } from "vitest";

// Suppress console.error noise during tests unless a test explicitly checks it.
// Individual tests can restore it with vi.spyOn(console, "error") if needed.
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

// Ensure NODE_ENV is "test" so guards that protect against production seed etc. work.
process.env.NODE_ENV = "test";
