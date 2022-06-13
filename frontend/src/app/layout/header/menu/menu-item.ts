import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface MenuItem {
  id: string;
  title: string;
  icon: IconDefinition;
  route: string;
  permission: string;
}
