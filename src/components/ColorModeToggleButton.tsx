import { useState } from 'react';
import IconButton from './IconButton';

type ColorMode = 'system' | 'light' | 'dark';

export default function ColorModeToggleButton() {
  const colorModes: ColorMode[] = ['system', 'light', 'dark'];
  const [mode, setMode] = useState<ColorMode>('system');
  const nextColorMode = () => {
    let currentIndex = colorModes.findIndex((colorMode) => colorMode === mode);
    const nextColorMode =
      ++currentIndex > colorModes.length - 1
        ? colorModes[0]
        : colorModes[currentIndex];
    setMode(nextColorMode);

    const htmlClassList = document.documentElement.classList;
    if (nextColorMode === 'light') {
      htmlClassList.add('light');
      htmlClassList.remove('dark');
    } else if (nextColorMode === 'dark') {
      htmlClassList.add('dark');
      htmlClassList.remove('light');
    } else if (nextColorMode === 'system') {
      htmlClassList.remove('light');
      htmlClassList.remove('dark');
    }
  };

  return (
    <IconButton onClick={() => nextColorMode()}>
      {mode === 'light' && '☀️'} {mode === 'dark' && '🌙'}{' '}
      {mode === 'system' && '🖥'}
    </IconButton>
  );
}
