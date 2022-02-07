import { en } from "./en"
import { zh } from "./zh"

const language = "zh"

export const t = language === "zh" ? zh : en
