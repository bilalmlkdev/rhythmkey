// Named imports only. This registry exists so settings components can
// still look up an icon by string name (icon="Volume2") without
// `import * as Icons from "lucide-react"`, which forces the bundler to
// include every icon in the library (this alone was responsible for
// ~130KB of dead weight in the MainPage chunk).
//
// If a new setting needs an icon, import it above and add it to the map.
import {
  Activity,
  AlertTriangle,
  AlignLeft,
  Clock,
  Highlighter,
  Keyboard,
  Languages,
  MousePointer2,
  Play,
  Type,
  Volume2,
  Settings,
} from "lucide-react";

export const ICONS = {
  Activity,
  AlertTriangle,
  AlignLeft,
  Clock,
  Highlighter,
  Keyboard,
  Languages,
  MousePointer2,
  Play,
  Type,
  Volume2,
  Settings,
};

export function getSettingIcon(name) {
  return ICONS[name] || Settings;
}
