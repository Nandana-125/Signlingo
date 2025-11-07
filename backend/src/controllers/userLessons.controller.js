import { ObjectId } from "mongodb";
import { getDB } from "../db/mongoClient.js";

export const startLesson = async (req, res) => {
  try {
    const db = getDB();
    const { userId, lessonId } = req.body;

    const existing = await db.collection("userLessons").findOne({
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId),
    });

    if (existing) return res.json({ success: true, userLesson: existing });

    const newDoc = {
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId),
      completedSigns: [],
      xpEarned: 0,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("userLessons").insertOne(newDoc);
    res.json({ success: true, userLesson: { ...newDoc, _id: result.insertedId } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserLessons = async (req, res) => {
  try {
    const db = getDB();
    const { userId } = req.query;

    const lessons = await db
      .collection("userLessons")
      .find({ userId: new ObjectId(userId) })
      .toArray();

    res.json({ success: true, lessons });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const db = getDB();
    const { lessonId } = req.params;
    const { userId, signId } = req.body;

    const userLesson = await db.collection("userLessons").findOne({
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId),
    });

    console.log("🟢 updateProgress called with:", { lessonId, userId, signId });

    if (!ObjectId.isValid(userId) || !ObjectId.isValid(lessonId)) {
  console.log("⚠️ invalid objectId:", { lessonId, userId });
}

    if (!userLesson) {
      return res.status(404).json({ success: false, message: "UserLesson not found" });
    }

    const updatedSigns = [...new Set([...userLesson.completedSigns.map(String), signId])];
    const lesson = await db.collection("lessons").findOne({ _id: new ObjectId(lessonId) });

    const completed = updatedSigns.length === lesson.signIds.length;
    const xpEarned = updatedSigns.length * 5; // 5 XP per sign

    await db.collection("userLessons").updateOne(
      { _id: userLesson._id },
      {
        $set: {
          completedSigns: updatedSigns.map((id) => new ObjectId(id)),
          xpEarned,
          completed,
          updatedAt: new Date(),
        },
      }
    );

    res.json({ success: true, completed, xpEarned });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const resetLesson = async (req, res) => {
  try {
    const db = getDB();
    const { lessonId } = req.params;
    const { userId } = req.body;

    await db.collection("userLessons").deleteOne({
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId),
    });

    res.json({ success: true, message: "Progress reset" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProgressForLesson = async (req, res) => {
  try {
    const db = getDB();
    const { userId, lessonId } = req.query;

    const record = await db.collection("userLessons").findOne({
      userId: new ObjectId(userId),
      lessonId: new ObjectId(lessonId),
    });

    if (!record) {
      return res.json({ success: true, progress: null });
    }

    res.json({
      success: true,
      progress: {
        completedSigns: record.completedSigns,
        xpEarned: record.xpEarned,
        completed: record.completed,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
