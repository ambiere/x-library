import plugin from "fastify-plugin"
import { PrismaClient } from "@prisma/client"

export default plugin(
  async function(app) {
    const client = new PrismaClient({
      log: ["info"],
      errorFormat: "pretty"
    })

    await client.$connect()

    app.decorate("prisma", client)
    app.addHook("onClose",
      async app => {
        await app.prisma.$disconnect()
      }
    )
  },
  {
    name: "prisma-client"
  }
)
