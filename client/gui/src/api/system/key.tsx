export class KeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "KeyError";
  }
}

export interface ParsedKey {
  name: string;
  user: string;
  pass: string;
  secret: string;
}

export function parseKey(raw: string): ParsedKey {
  const line = raw.trim();
  if (!line) throw new KeyError("密钥为空");

  const parts = line.split(":");
  if (parts.length !== 3) throw new KeyError("认证密钥无效");

  const [name, pass, secret] = parts;
  if (!name || !pass || !secret) {
    throw new KeyError(`${name || "Key"}: 认证密钥无效`);
  }
  if (secret.length !== 256) {
    throw new KeyError(`${name}: 认证密钥无效`);
  }

  return { name, user: name, pass, secret };
}

export function encodeKey(parsed: ParsedKey): string {
  return `${parsed.name}:${parsed.pass}:${parsed.secret}`;
}
