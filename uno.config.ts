import {
  defineConfig,
  presetAttributify,
  presetTagify,
  presetTypography,
  presetUno,
  presetWind,
} from "unocss";

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind(),
    presetUno(),
    presetTypography(),
    presetTagify(),
  ],
});
