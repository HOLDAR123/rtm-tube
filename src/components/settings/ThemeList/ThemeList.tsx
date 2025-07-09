import { setTheme } from 'store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { THEMELIST } from 'constants/setting';
import SettingItem from '../SettingItem';

export default function ThemeList() {
  const { theme } = useAppSelector((theme) => theme.theme);
  const dispatch = useAppDispatch();
  const handleChangeTheme = (value: string) => {
    dispatch(setTheme(value));
  };

  return (
    <SettingItem
      list={THEMELIST}
      title="Theme"
      checkedValue={theme}
      handleChangeTheme={handleChangeTheme}
    />
  );
}
