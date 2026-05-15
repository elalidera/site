import * as migration_20260515_174151_initial from './20260515_174151_initial';
import * as migration_20260515_175813_add_site_settings from './20260515_175813_add_site_settings';

export const migrations = [
  {
    up: migration_20260515_174151_initial.up,
    down: migration_20260515_174151_initial.down,
    name: '20260515_174151_initial',
  },
  {
    up: migration_20260515_175813_add_site_settings.up,
    down: migration_20260515_175813_add_site_settings.down,
    name: '20260515_175813_add_site_settings'
  },
];
