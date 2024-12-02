import * as migration_20241202_193721_migration from './20241202_193721_migration';

export const migrations = [
  {
    up: migration_20241202_193721_migration.up,
    down: migration_20241202_193721_migration.down,
    name: '20241202_193721_migration'
  },
];
