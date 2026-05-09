import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";
import {
  getSubscriptionPaymentPlanIds,
  SubscriptionStatus,
} from "../../payment/plans";

type MockUserData = Omit<User, "id">;

/**
 * This function, which we've imported in `app.db.seeds` in the `main.wasp` file,
 * seeds the database with mock users via the `wasp db seed` command.
 * For more info see: https://wasp.sh/docs/data-model/backends#seeding-the-database
 */
export async function seedMockUsers(prismaClient: PrismaClient) {
  await Promise.all(
    generateMockUsersData(50).map((data) => prismaClient.user.create({ data })),
  );
}

export async function seedAnnotedlyDomainSmoke(prismaClient: PrismaClient) {
  const subscriber = await prismaClient.subscriber.upsert({
    where: { email: "smoke@annotedly.example" },
    update: { firmName: "Annotedly Smoke Firm" },
    create: {
      email: "smoke@annotedly.example",
      firmName: "Annotedly Smoke Firm",
    },
  });

  const resellerConfig = await prismaClient.resellerConfig.upsert({
    where: { id: "00000000-0000-4000-8000-000000000001" },
    update: {
      resellerName: "Smoke Reseller",
      masthead: "Annotedly Smoke",
      deliveryLagMin: 0,
    },
    create: {
      id: "00000000-0000-4000-8000-000000000001",
      resellerName: "Smoke Reseller",
      masthead: "Annotedly Smoke",
      deliveryLagMin: 0,
    },
  });

  await prismaClient.subscription.upsert({
    where: { id: "annotedly_single_smoke" },
    update: {
      subscriberId: subscriber.id,
      resellerConfigId: resellerConfig.id,
      status: "active",
      feedToken: "feed_smoke_token",
    },
    create: {
      id: "annotedly_single_smoke",
      subscriberId: subscriber.id,
      tier: "single",
      vertical: "fintech",
      resellerConfigId: resellerConfig.id,
      status: "active",
      feedToken: "feed_smoke_token",
      trackedLogUntil: new Date("2026-05-30T00:00:00.000Z"),
    },
  });

  const issue = await prismaClient.issue.upsert({
    where: { id: "An-2026-W19-fintech-smoke" },
    update: {
      inputCount: 17,
      outputCount: 1,
      dedupeRatio: "17.00",
    },
    create: {
      id: "An-2026-W19-fintech-smoke",
      vertical: "fintech",
      weekStart: new Date("2026-05-04T00:00:00.000Z"),
      inputCount: 17,
      outputCount: 1,
      dedupeRatio: "17.00",
    },
  });

  const source = await prismaClient.source.upsert({
    where: { id: "src-fintech-smoke-2026-05-09" },
    update: {
      url: "https://example.com/annotedly-smoke-source",
      sha256:
        "0000000000000000000000000000000000000000000000000000000000000000",
    },
    create: {
      id: "src-fintech-smoke-2026-05-09",
      url: "https://example.com/annotedly-smoke-source",
      retrievedAt: new Date("2026-05-09T00:00:00.000Z"),
      sha256:
        "0000000000000000000000000000000000000000000000000000000000000000",
      contentType: "text/html",
    },
  });

  await prismaClient.dossierItem.upsert({
    where: { id: "An-2026-W19-section-14-smoke" },
    update: {
      issueId: issue.id,
      sourceId: source.id,
      paragraphMarkdown: "Smoke dossier item with one verifiable source.",
      footnoteRefs: ["src-fintech-smoke-2026-05-09"],
    },
    create: {
      id: "An-2026-W19-section-14-smoke",
      issueId: issue.id,
      sourceId: source.id,
      paragraphMarkdown: "Smoke dossier item with one verifiable source.",
      footnoteRefs: ["src-fintech-smoke-2026-05-09"],
    },
  });

  const counts = {
    subscribers: await prismaClient.subscriber.count(),
    subscriptions: await prismaClient.subscription.count(),
    issues: await prismaClient.issue.count(),
    sources: await prismaClient.source.count(),
    dossierItems: await prismaClient.dossierItem.count(),
    resellerConfigs: await prismaClient.resellerConfig.count(),
  };

  console.log("Annotedly domain smoke row counts:", counts);
}

function generateMockUsersData(numOfUsers: number): MockUserData[] {
  return faker.helpers.multiple(generateMockUserData, { count: numOfUsers });
}

function generateMockUserData(): MockUserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const subscriptionStatus =
    faker.helpers.arrayElement<SubscriptionStatus | null>([
      ...Object.values(SubscriptionStatus),
      null,
    ]);
  const now = new Date();
  const createdAt = faker.date.past({ refDate: now });
  const timePaid = faker.date.between({ from: createdAt, to: now });
  const credits = subscriptionStatus
    ? 0
    : faker.number.int({ min: 0, max: 10 });
  const hasUserPaidOnStripe = !!subscriptionStatus || credits > 3;
  return {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.userName({ firstName, lastName }),
    createdAt,
    isAdmin: false,
    credits,
    subscriptionStatus,
    lemonSqueezyCustomerPortalUrl: null,
    paymentProcessorUserId: hasUserPaidOnStripe
      ? `cus_test_${faker.string.uuid()}`
      : null,
    datePaid: hasUserPaidOnStripe
      ? faker.date.between({ from: createdAt, to: timePaid })
      : null,
    subscriptionPlan: subscriptionStatus
      ? faker.helpers.arrayElement(getSubscriptionPaymentPlanIds())
      : null,
  };
}
