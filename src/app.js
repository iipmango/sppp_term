var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import http from "http";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
const httpServer = http.createServer(app);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datas = yield prisma.players.findMany();
        console.log(datas);
        res.status(200);
        res.json(datas);
    }
    catch (err) { }
}));
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.players.findFirst({
            where: {
                player_id: +req.params.id,
            },
            select: {
                api_id: true,
                player_stats: true,
            },
        });
        res.status(200);
        res.json(Object.assign(Object.assign({}, data === null || data === void 0 ? void 0 : data.player_stats), { api_id: data === null || data === void 0 ? void 0 : data.api_id }));
    }
    catch (err) { }
}));
app.listen(3000, () => {
    console.log("Server started on Port 3000");
});
