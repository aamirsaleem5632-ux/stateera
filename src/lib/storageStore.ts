"use client";

import { useSyncExternalStore, useCallback } from "react";

const STORAGE_CUSTOM_EVENT = "stateera_storage_change";

interface StorageChangeDetail {
  key: string | null;
  value: string | null;
}

type Listener = () => void;

// Per-key subscriber registry for fine-grained notifications
const keySubscribers = new Map<string, Set<Listener>>();

let windowListenersAttached = false;

function handleStorageEvent(key: string | null) {
  if (key === null) {
    // Clear operation: notify all registered subscribers
    keySubscribers.forEach((listeners) => {
      Array.from(listeners).forEach((listener) => {
        try {
          listener();
        } catch {
          // Ignore subscriber exception
        }
      });
    });
    return;
  }

  // Notify listeners specifically subscribed to this key
  const listeners = keySubscribers.get(key);
  if (listeners) {
    Array.from(listeners).forEach((listener) => {
      try {
        listener();
      } catch {
        // Ignore subscriber exception
      }
    });
  }
}

function ensureWindowListeners() {
  if (typeof window === "undefined" || windowListenersAttached) return;

  // Same-tab notifications
  window.addEventListener(STORAGE_CUSTOM_EVENT, (event: Event) => {
    const customEvent = event as CustomEvent<StorageChangeDetail>;
    const key = customEvent.detail?.key ?? null;
    handleStorageEvent(key);
  });

  // Cross-tab native storage notifications filtered to localStorage
  window.addEventListener("storage", (event: StorageEvent) => {
    try {
      if (event.storageArea && event.storageArea !== window.localStorage) return;
    } catch {
      // In restricted environments accessing storageArea may throw; proceed safely
    }
    handleStorageEvent(event.key);
  });

  windowListenersAttached = true;
}

/**
 * Safely reads a raw string from localStorage.
 * Returns null if window is unavailable or storage access is restricted.
 */
export function getStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely writes a raw string to localStorage and notifies same-tab subscribers.
 */
export function setStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
    window.dispatchEvent(
      new CustomEvent<StorageChangeDetail>(STORAGE_CUSTOM_EVENT, {
        detail: { key, value },
      })
    );
  } catch {
    // Gracefully ignore storage quota errors or private-browsing restrictions
  }
}

/**
 * Safely removes a key from localStorage and notifies same-tab subscribers.
 */
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(
      new CustomEvent<StorageChangeDetail>(STORAGE_CUSTOM_EVENT, {
        detail: { key, value: null },
      })
    );
  } catch {
    // Ignore storage write errors
  }
}

/**
 * Safely clears all localStorage keys and notifies all subscribers.
 */
export function clearStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.clear();
    window.dispatchEvent(
      new CustomEvent<StorageChangeDetail>(STORAGE_CUSTOM_EVENT, {
        detail: { key: null, value: null },
      })
    );
  } catch {
    // Ignore storage write errors
  }
}

/**
 * Subscribes a listener to changes for a specific key.
 * Compatible with useSyncExternalStore's subscribe parameter.
 */
export function subscribeStorageKey(key: string, callback: Listener): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  ensureWindowListeners();

  let set = keySubscribers.get(key);
  if (!set) {
    set = new Set<Listener>();
    keySubscribers.set(key, set);
  }
  set.add(callback);

  return () => {
    set?.delete(callback);
    if (set && set.size === 0) {
      keySubscribers.delete(key);
    }
  };
}

/**
 * Custom hook returning the stored string value for a key with SSR safety.
 * Returns a stable primitive (string | null).
 */
export function useStorageItem(key: string, serverDefault: string | null = null): string | null {
  const subscribe = useCallback(
    (callback: () => void) => subscribeStorageKey(key, callback),
    [key]
  );
  const getSnapshot = useCallback(() => getStorageItem(key), [key]);
  const getServerSnapshot = useCallback(() => serverDefault, [serverDefault]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Custom hook returning a boolean stored in localStorage with SSR safety.
 * Stored as "true" / "false".
 */
export function useStorageBoolean(key: string, serverDefault: boolean): boolean {
  const rawValue = useStorageItem(key, serverDefault ? "true" : "false");
  return rawValue === "true";
}

// JSON parsing cache to prevent infinite loops in useSyncExternalStore
const jsonCache = new Map<string, { raw: string; parsed: unknown }>();

/**
 * Custom hook returning parsed JSON stored in localStorage with SSR safety.
 * Guaranteed reference stability: returns the identical parsed object when the raw JSON string has not changed.
 */
export function useStorageJson<T>(key: string, serverDefault: T): T {
  const raw = useStorageItem(key, null);

  if (raw === null) {
    return serverDefault;
  }

  const cached = jsonCache.get(key);
  if (cached && cached.raw === raw) {
    return cached.parsed as T;
  }

  try {
    const parsed = JSON.parse(raw);
    jsonCache.set(key, { raw, parsed });
    return parsed as T;
  } catch {
    return serverDefault;
  }
}
