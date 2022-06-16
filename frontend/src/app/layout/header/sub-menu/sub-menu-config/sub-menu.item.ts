import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SubMenuItem {
  id: string;
  title: string;
  icon: IconDefinition;
  route: string;
  permission: string;
}
