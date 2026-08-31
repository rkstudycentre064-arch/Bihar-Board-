import { db } from './src/db/index.ts';
import { boards, classes, mediums, subjects } from './src/db/schema.ts';

async function seed() {
  try {
    console.log("Seeding started...");
    // 1. Seed Boards
    const b = await db.insert(boards).values([{ name: 'BSEB (Bihar Board)' }]).returning();
    const boardId = b[0].id;
    console.log("Board seeded");

    // 2. Seed Mediums
    await db.insert(mediums).values([
      { id: 1, name: 'Hindi' },
      { id: 2, name: 'English' }
    ]).onConflictDoNothing();
    console.log("Mediums seeded");

    // 3. Seed Classes
    const classesToInsert = [6, 7, 8, 9, 10, 11, 12].map(c => ({
      id: c,
      name: `Class ${c}`,
      boardId
    }));
    await db.insert(classes).values(classesToInsert).onConflictDoNothing();
    console.log("Classes seeded");

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
}

seed();
