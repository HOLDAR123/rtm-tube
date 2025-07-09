import { useEffect } from 'react';

import { setTheme } from 'store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from 'hooks/store';

export default function PasteTheme() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      dispatch(setTheme('dark'));
    } else if (theme === 'custom') {
      dispatch(setTheme('custom'));
    } else {
      dispatch(setTheme('light'));
    }
  }, []);

  return null;
}
