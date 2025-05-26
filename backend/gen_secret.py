import secrets

# Generate a random URL-safe text string key (default 32 bytes)
session_key = secrets.token_urlsafe(32)

print(session_key)  # A random base64-url string (good for keys in URLs or tokens)