import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_parent_id_users_id_fk";

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_media_id_media_id_fk";

ALTER TABLE "articles_locales" DROP CONSTRAINT "articles_locales__parent_id_articles_id_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_parent_id_articles_id_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_media_id_media_id_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_users_id_users_id_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_verticals_id_verticals_id_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_tags_id_tags_id_fk";

ALTER TABLE "media_locales" DROP CONSTRAINT "media_locales__parent_id_media_id_fk";

ALTER TABLE "verticals_locales" DROP CONSTRAINT "verticals_locales__parent_id_verticals_id_fk";

ALTER TABLE "tags_locales" DROP CONSTRAINT "tags_locales__parent_id_tags_id_fk";

ALTER TABLE "tags_rels" DROP CONSTRAINT "tags_rels_parent_id_tags_id_fk";

ALTER TABLE "tags_rels" DROP CONSTRAINT "tags_rels_verticals_id_verticals_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_id_users_id_fk";

ALTER TABLE "verticals" ADD COLUMN "theme_dark_css" varchar;
ALTER TABLE "verticals" ADD COLUMN "theme_light_css" varchar;
DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_verticals_fk" FOREIGN KEY ("verticals_id") REFERENCES "verticals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "verticals_locales" ADD CONSTRAINT "verticals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "verticals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_verticals_fk" FOREIGN KEY ("verticals_id") REFERENCES "verticals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_parent_fk";

ALTER TABLE "users_rels" DROP CONSTRAINT "users_rels_media_fk";

ALTER TABLE "articles_locales" DROP CONSTRAINT "articles_locales_parent_id_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_parent_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_media_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_users_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_verticals_fk";

ALTER TABLE "articles_rels" DROP CONSTRAINT "articles_rels_tags_fk";

ALTER TABLE "media_locales" DROP CONSTRAINT "media_locales_parent_id_fk";

ALTER TABLE "verticals_locales" DROP CONSTRAINT "verticals_locales_parent_id_fk";

ALTER TABLE "tags_locales" DROP CONSTRAINT "tags_locales_parent_id_fk";

ALTER TABLE "tags_rels" DROP CONSTRAINT "tags_rels_parent_fk";

ALTER TABLE "tags_rels" DROP CONSTRAINT "tags_rels_verticals_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_fk";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_fk";

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales__parent_id_articles_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_verticals_id_verticals_id_fk" FOREIGN KEY ("verticals_id") REFERENCES "verticals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_id_tags_id_fk" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales__parent_id_media_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "verticals_locales" ADD CONSTRAINT "verticals_locales__parent_id_verticals_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "verticals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales__parent_id_tags_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_parent_id_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_verticals_id_verticals_id_fk" FOREIGN KEY ("verticals_id") REFERENCES "verticals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "verticals" DROP COLUMN IF EXISTS "theme_dark_css";
ALTER TABLE "verticals" DROP COLUMN IF EXISTS "theme_light_css";`);

};
