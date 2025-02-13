"use server";

import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challenges, challengeProgress, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();


  if (!currentUserProgress) {
    throw new Error("user progress not found");
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;

  const exitingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPratice = !!exitingChallengeProgress;

  if (
    currentUserProgress.hearts === 0 && 
    !isPratice && 
     !userSubscription?.isActive
  ){
    return { error: "hearts" };
  }

  if (isPratice) {
    await db.update(challengeProgress).set({
      completed: true,
    })
    .where(
      eq(challengeProgress.id, exitingChallengeProgress.id)
    );

    await db.update(userProgress).set({
      hearts: Math.min(currentUserProgress.hearts + 1,5),
      points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));
    
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/question");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });

  await db.update(userProgress).set({
    points: currentUserProgress.points + 10,
  }).where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/question");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
  return;
}