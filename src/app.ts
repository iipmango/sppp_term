import express from "express";
import http from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const httpServer = http.createServer(app);

app.get("/", async (req, res) => {
  try {
    const datas = await prisma.players.findMany();
    console.log(datas);
    res.status(200);
    res.json(datas);
  } catch (err) {}
});

app.get("/:id", async (req, res) => {
  try {
    const data = await prisma.players.findFirst({
      where: {
        player_id: +req.params.id,
      },
      select: {
        api_id: true,
        player_stats: true,
      },
    });
    res.status(200);
    res.json({ ...data?.player_stats, api_id: data?.api_id });
  } catch (err) {}
});

app.listen(3000, () => {
  console.log("Server started on Port 3000");
});
