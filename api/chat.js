// api/chat.js — Serverless endpoint (Vercel) using Gemini 1.5 Flash
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { message, context } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing message" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const system = `Eres ANDY, asistente del ${context?.name || "Hotel"}.
Hablas en español (tono cálido, profesional y breve).
Si falta información, pide un dato puntual. No inventes promociones.
Datos del hotel:
- Dirección: ${context?.address}
- Teléfono: ${context?.phone}, WhatsApp: ${context?.whatsapp}
- Check-in: ${context?.checkin}, Check-out: ${context?.checkout}
- Wi‑Fi: SSID ${context?.wifi?.ssid}, Pass ${context?.wifi?.password}
- Políticas: ${(context?.policies || []).join("; ")}
- Amenities: ${(context?.amenities || []).join(", ")}
Normas: Si reserva no aparece, ofrece mejor tarifa directa. En cargos dudosos, levanta reporte y tiempos de revisión. Escala a humano si lo piden o es sensible (pagos/seguridad).`;

    const prompt = `${system}\n\nUsuario: ${message}\n\nResponde como ANDY.`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "LLM failure" });
  }
}
