import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const { date, timezoneOffset } = req.query;

  if (!date || !timezoneOffset) {
    return res.status(400).json({ message: "Date or Timezone not provided." });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User does not exist." });
  }

  const referenceDate = dayjs(String(date));
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  const timezoneOffsetInHours =
    typeof timezoneOffset === "string"
      ? Number(timezoneOffset) / 60
      : Number(timezoneOffset[0]) / 60;

  const referenceDateWithTimezoneOffset =
    referenceDate.toDate().getTimezoneOffset() / 60;

  if (isPastDate) {
    return res.json({ possibleTimes: [], availableTimes: [] });
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  });

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availableTimes: [] });
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability;

  const startHour = time_start_in_minutes / 60;
  const endHour = time_end_in_minutes / 60;

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i;
    }
  );

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate
          .set("hour", startHour)
          .add(timezoneOffsetInHours, "hour")
          .toDate(),
        lte: referenceDate
          .set("hour", endHour)
          .add(timezoneOffsetInHours, "hour")
          .toDate(),
      },
    },
  });

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) =>
        blockedTime.date.getUTCHours() - timezoneOffsetInHours === time
    );

    const isTimeInPast = referenceDate
      .set("hour", time)
      .subtract(referenceDateWithTimezoneOffset, "hour")
      .isBefore(dayjs().utc().subtract(timezoneOffsetInHours, "hour"));

    return !isTimeBlocked && !isTimeInPast;
  });

  return res.json({ possibleTimes, availableTimes });
}
