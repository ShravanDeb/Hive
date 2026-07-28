import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding skills...");

  // Only seed the skills lookup table — no fake users or projects
  const skillNames = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Python",
    "PostgreSQL",
    "Machine Learning",
    "UI/UX Design",
    "Arduino/IoT",
  ];

  for (const name of skillNames) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`Seeded ${skillNames.length} skills.`);

  // Ensure official admin account exists
  const adminEmail = "official.hive.collab@gmail.com";
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", verified: true },
    create: {
      name: "Hive Admin",
      email: adminEmail,
      role: "ADMIN",
      verified: true,
      department: "Administration",
      year: 4,
    },
  });
  console.log(`Admin user: ${adminUser.email} (role: ${adminUser.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
