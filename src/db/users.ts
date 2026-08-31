import { db } from './index.ts';
import { users, studentProfiles, parentProfiles, teacherProfiles } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name: string) {
  const result = await db.insert(users)
    .values({
      uid,
      email,
      name,
    })
    .onConflictDoUpdate({
      target: users.uid,
      set: {
        email,
        name,
      },
    })
    .returning();

  return result[0];
}

export async function updateProfile(uid: string, profileData: any) {
  const { phone, role, classId, mediumId, district } = profileData;
  
  const userResult = await db.update(users)
    .set({ phone, role })
    .where(eq(users.uid, uid))
    .returning();
    
  if (userResult.length === 0) {
    throw new Error("User record not found. Please log out and log back in, or wait a few seconds and try again.");
  }
    
  const user = userResult[0];

  if (role === 'student') {
    await db.insert(studentProfiles)
      .values({
        userId: user.id,
        classId: classId ? parseInt(classId) : null,
        mediumId: mediumId ? parseInt(mediumId) : null,
        district
      })
      .onConflictDoUpdate({
        target: studentProfiles.userId,
        set: {
          classId: classId ? parseInt(classId) : null,
          mediumId: mediumId ? parseInt(mediumId) : null,
          district
        }
      });
  } else if (role === 'parent') {
    await db.insert(parentProfiles)
      .values({ userId: user.id })
      .onConflictDoNothing();
  } else if (role === 'teacher') {
    await db.insert(teacherProfiles)
      .values({ userId: user.id })
      .onConflictDoNothing();
  }
  
  return user;
}
