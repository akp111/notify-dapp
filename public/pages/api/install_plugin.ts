import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { installPlugin, installPluginSchema } from "~/utils/user-utils/install-plugin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.inputs == undefined) {
        return res.status(400).json({
            error: { message: "Invalid request", errors: ["inputs is required"] },
        });
    }
    // convert inputs object to map
    req.body.inputs = new Map(Object.entries(req.body.inputs))
    const response = installPluginSchema.safeParse(req.body)
    if (!response.success) {
        const { errors } = response.error;

        return res.status(400).json({
            error: { message: "Invalid request", errors },
        });
    }

    try {
        await installPlugin(response.data, prisma);
    } catch (e: any) {
        return res.status(400).json({
            error: { message: "Invalid request", errors: [e.message] },
        });
    }


    return res.status(200).json({
        success: true
    });
}