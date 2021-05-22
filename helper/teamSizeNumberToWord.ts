import { TeamSizeValue } from "~/types/derivedTypes";

export default function teamSizeNumberToWord(teamSize: TeamSizeValue) {
  switch (teamSize) {
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";

    default:
      return "one";
  }
}
