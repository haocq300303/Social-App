import { formatDistanceToNowStrict, formatISO } from "date-fns";

export const formatDateUser = (date) => {
  const result = formatISO(new Date(date), {
    representation: "date",
  }).split("-");
  return `${result[2]}/${result[1]}/${result[0]}`;
};

export const formatValueBirthday = (value) => {
  const dateBirthday = value.split("/");
  const birthdayFormat = formatISO(
    new Date(
      Number(dateBirthday[2]),
      Number(dateBirthday[1] - 1),
      Number(dateBirthday[0]),
      10,
      0,
      0
    )
  );
  return birthdayFormat;
};

export const formatDatePost = (date) => {
  const result = date.replace("T", "-").replace("Z", "").replaceAll(":", "-");
  const formatDate = result.split("-");
  const time = formatDistanceToNowStrict(
    new Date(
      Number(formatDate[0]),
      Number(formatDate[1]) - 1,
      Number(formatDate[2]),
      Number(formatDate[3]) + 7,
      Number(formatDate[4]),
      Number(formatDate[5])
    )
  );

  return time;
};
