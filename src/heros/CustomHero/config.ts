import { Field } from "payload";
import {
  HeroHorizontalAlignment,
  HeroVerticalAlignment,
} from "./HighImpactHero";

/**
 * We define here just additional config fields for the custom heros, that gets merged with the default ones
 */
export const customHeroFields: Field[] = [
  {
    name: "horizontalAlignment",
    label: "Horizontal Alignment",
    type: "select",
    options: Object.entries(HeroHorizontalAlignment).map(([label, value]) => ({
      label,
      value,
    })),
    defaultValue: HeroHorizontalAlignment.Left,
    admin: {
      description: "Choose the horizontal alignment of the hero content.",

      condition: (_, { designVersion = "" } = {}) =>
        ["customHighImpact"].includes(designVersion),
    },
  },
  {
    name: "verticalAlignment",
    label: "Vertical Alignment",
    type: "select",
    options: Object.entries(HeroVerticalAlignment).map(([label, value]) => ({
      label,
      value,
    })),
    defaultValue: HeroVerticalAlignment.Middle,
    admin: {
      description: "Choose the vertical alignment of the hero content.",
      condition: (_, { designVersion = "" } = {}) =>
        ["customHighImpact"].includes(designVersion),
    },
  },
  {
    name: "highImpact",
    label: "High Impact",
    type: "checkbox",
    defaultValue: false,
    admin: {
      description: "Enable high impact mode for the hero section.",
      condition: (_, { designVersion = "" } = {}) =>
        ["customHighImpact"].includes(designVersion),
    },
  },
];
