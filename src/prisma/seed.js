import data from "./data.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await Promise.all(
    data.map(async d => {
      await prisma.author.upsert({
        where: { name: d.name },
        update: {},
        create: {
          name: d.name,
          born: d.born,
          books: {
            createMany: {
              data: d.books
            }
          }
        }
      })
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async err => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
