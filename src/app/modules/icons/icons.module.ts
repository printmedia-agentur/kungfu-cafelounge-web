import {NgModule} from '@angular/core';
import {
  IconUser,
  IconShoppingCart,
  IconSettings,
  IconLogOut,
  IconCalendar,
  IconShoppingBag,
  IconPlus,
  IconAward,
  IconX,
  IconRotateCw,
  IconBox,
  IconMoon,
  IconSun,
  IconMoreHorizontal,
  IconArrowRightCircle,
  IconChevronLeft,
  IconEdit
} from 'angular-feather';

const icons = [
  IconUser,
  IconShoppingCart,
  IconSettings,
  IconLogOut,
  IconCalendar,
  IconShoppingBag,
  IconPlus,
  IconAward,
  IconX,
  IconRotateCw,
  IconBox,
  IconMoon,
  IconSun,
  IconMoreHorizontal,
  IconEdit,
  IconArrowRightCircle,
  IconChevronLeft
];

@NgModule({
  imports: icons,
  exports: icons
})
export class IconsModule {
}
