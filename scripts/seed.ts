import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id:1,
        title: "Unit 1. Kolonisasi dan Perlawanan Bangsa Indonesia",
        imageSrc:"/next.svg"
      },
      {
        id:2,
        title: "Unit 2. Pergerakan Nasional dan Pengaruh Kolonialisme terhadap Bangsa Indonesia",
        imageSrc:"/next.svg"
      },
      {
        id:3,
        title: "Unit 3. Pendudukan Jepang, Proklamasi Kemerdekaan, dan terbentuknya Pemerintahan Indonesia",
        imageSrc:"/next.svg"
      },
      {
        id:4,
        title: "Unit 4. Kedatangan Sekutu serta Perjuangan Mempertahankan Kemerdekaan dan Integritas NKRI",
        imageSrc:"/vercel.svg"
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Baca dan kemudian pahami",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1, 
        title: "iya iya",
      },
      {
        id: 2,
        unitId: 1,
        order: 2, 
        title: "hahaha",
      },
      {
        id: 3,
        unitId: 1,
        order: 3, 
        title: "hahaha",
      },
      {
        id: 4,
        unitId: 1,
        order: 4, 
        title: "hahaha",
      },
      {
        id: 5,
        unitId: 1,
        order: 5, 
        title: "hahaha",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //
        type: "SELECT",
        order: 1,
        question: 'Tokoh Penjelajah Inggris'
      },
      {
        id: 2,
        lessonId: 1, //
        type: "ASSIST",
        order: 2,
        question: 'Tokoh Penjelajah Portugis'
      },
      {
        id: 3,
        lessonId: 1, //
        type: "SELECT",
        order: 3,
        question: 'Tokoh Penjelajah Belanda'
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "/next.svg",
        correct: true,
        text: "hahaha",
        audioSrc: "./voice.mp3"
      },
      {
        challengeId: 1,
        imageSrc: "/next.svg",
        correct: false,
        text: "pwlpalp",
        audioSrc: "./voice.mp3"
      },
      {
        challengeId: 1,
        imageSrc: "/next.svg",
        correct: false,
        text: "kiw",
        audioSrc: "./voice.mp3"
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: false,
        text: "hahaha",
        audioSrc: "./voice.mp3"
      },
      {
        challengeId: 2,
        correct: false,
        text: "pwlpalp",
        audioSrc: "./voice.mp3"
      },
      {
        challengeId: 2,
        correct: true,
        text: "kiw",
        audioSrc: "./voice.mp3"
      },
    ]);
    
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "/next.svg",
        correct: false,
        text: "hahaha",
        audioSrc: "./voice.mp3"
      },
      {
        challengeId: 3,
        imageSrc: "/next.svg",
        correct: true,
        text: "pwlpalp",
        audioSrc: "./voice.mp3"
      },
      {
        challengeId: 3,
        imageSrc: "/next.svg",
        correct: false,
        text: "kiw",
        audioSrc: "./voice.mp3"
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, //
        type: "SELECT",
        order: 1,
        question: 'siapa anda hah?'
      },
      {
        id: 5,
        lessonId: 2, //
        type: "ASSIST",
        order: 2,
        question: 'test'
      },
      {
        id: 6,
        lessonId: 2, //
        type: "SELECT",
        order: 3,
        question: 'hihi'
      },
    ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database")
  }
};

main();