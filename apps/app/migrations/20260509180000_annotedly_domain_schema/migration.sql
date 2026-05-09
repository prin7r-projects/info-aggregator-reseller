-- CreateTable
CREATE TABLE "subscribers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "firm_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reseller_configs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reseller_name" TEXT NOT NULL,
    "masthead" TEXT NOT NULL,
    "accent_hex" TEXT,
    "footer_line" TEXT,
    "delivery_url" TEXT,
    "delivery_lag_min" INTEGER NOT NULL DEFAULT 0,
    "custom_domain" TEXT,
    "logo_svg" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reseller_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "subscriber_id" UUID NOT NULL,
    "tier" TEXT NOT NULL,
    "vertical" TEXT,
    "reseller_config_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "invoice_id" TEXT,
    "valid_until" TIMESTAMP(3),
    "feed_token" TEXT,
    "tracked_log_until" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
    "id" TEXT NOT NULL,
    "vertical" TEXT NOT NULL,
    "week_start" DATE NOT NULL,
    "published_at" TIMESTAMP(3),
    "input_count" INTEGER,
    "output_count" INTEGER,
    "dedupe_ratio" DECIMAL(6,2),

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "retrieved_at" TIMESTAMP(3),
    "sha256" TEXT NOT NULL,
    "content_type" TEXT,
    "is_leak" BOOLEAN NOT NULL DEFAULT false,
    "leak_provenance" JSONB,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dossier_items" (
    "id" TEXT NOT NULL,
    "issue_id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "paragraph_markdown" TEXT NOT NULL,
    "footnote_refs" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "dossier_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_email_key" ON "subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_feed_token_key" ON "subscriptions"("feed_token");

-- CreateIndex
CREATE INDEX "subscriptions_subscriber_id_status_idx" ON "subscriptions"("subscriber_id", "status");

-- CreateIndex
CREATE INDEX "dossier_items_issue_id_idx" ON "dossier_items"("issue_id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "subscribers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_reseller_config_id_fkey" FOREIGN KEY ("reseller_config_id") REFERENCES "reseller_configs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dossier_items" ADD CONSTRAINT "dossier_items_issue_id_fkey" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dossier_items" ADD CONSTRAINT "dossier_items_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
