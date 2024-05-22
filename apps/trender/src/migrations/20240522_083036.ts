import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_role" AS ENUM('super_admin', 'admin', 'user', 'editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" NOT NULL;
ALTER TABLE "users" DROP COLUMN IF EXISTS "username";
ALTER TABLE "users" DROP COLUMN IF EXISTS "type";
ALTER TABLE "articles_locales" DROP COLUMN IF EXISTS "metadata_title";
ALTER TABLE "articles_locales" DROP COLUMN IF EXISTS "metadata_description";
ALTER TABLE "articles_locales" DROP COLUMN IF EXISTS "metadata_keywords";`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_type" AS ENUM('creator', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TYPE "_locales" ADD VALUE 'ru';
ALTER TABLE "users" ADD COLUMN "username" varchar;
ALTER TABLE "users" ADD COLUMN "type" "enum_users_type";
ALTER TABLE "articles_locales" ADD COLUMN "metadata_title" varchar;
ALTER TABLE "articles_locales" ADD COLUMN "metadata_description" varchar;
ALTER TABLE "articles_locales" ADD COLUMN "metadata_keywords" varchar;
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";`);

};
