import pendingUsers from "../schema/pendingUsers.js";
import cron from "node-cron";


const cleanOldPendings = async () => {
      const expiryTime = new Date(Date.now() - 120 * 1000); // 2 daqiqa oldingi vaqt
      try {
            const result = await pendingUsers.deleteMany({ createAt: { $lt: expiryTime } });
            console.log(`${result.deletedCount} ta eski pending user o‘chirildi`);
      } catch (err) {
            console.error("Eski foydalanuvchilarni o‘chirishda xatolik:", err);
      }
};


cron.schedule("*/2 * * * *", () => {
      cleanOldPendings();
});

