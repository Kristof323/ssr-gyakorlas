import { Injectable } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Criminal } from './Criminal';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  solveQuadratic(a: number, b: number, c: number): string {
    if (![a, b, c].every(Number.isFinite)) return 'Kérlek, adj meg három számot!';
    if (a === 0) {
      if (b === 0) return c === 0 ? 'Végtelen sok megoldás.' : 'Nincs megoldás.';
      return `Lineáris egyenlet megoldása: x = ${(-c / b).toFixed(4)}`;
    }

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return 'Az egyenletnek nincs valós megoldása.';
    if (discriminant === 0) return `Kettős gyök: x₁ = x₂ = ${(-b / (2 * a)).toFixed(4)}`;

    const root = Math.sqrt(discriminant);
    const x1 = (-b + root) / (2 * a);
    const x2 = (-b - root) / (2 * a);
    return `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`;
  }

  searchCrimes(query: string): Criminal[] {
    const filePath = join(process.cwd(), 'public', 'crimes.json');
    const crimes = JSON.parse(readFileSync(filePath, 'utf8')) as Criminal[];
    const normalizedQuery = query.trim().toLocaleLowerCase('hu-HU');
    if (!normalizedQuery) return crimes;

    return crimes.filter((crime) =>
      Object.values(crime).some((value) =>
        String(value).toLocaleLowerCase('hu-HU').includes(normalizedQuery),
      ),
    );
  }
}
