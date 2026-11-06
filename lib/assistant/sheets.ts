import { google } from "googleapis";
import { config } from "./config";

export type Lead = {
  motif: string;
  langue: string;
  nom?: string;
  structure_projet?: string;
  besoin: string;
  contact?: string;
  accord_contact: boolean;
};

const SHEET_RANGE = "Demandes!A:I";

function sheetsClient() {
  const { clientEmail, privateKey, sheetId } = config.sheets;
  if (!clientEmail || !privateKey || !sheetId) return null;

  const auth = new google.auth.JWT({
    email: clientEmail,
    // Les sauts de ligne de la clé privée arrivent échappés ("\n") dans une variable
    // d'environnement : il faut les restaurer avant de construire le client.
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

// Ajoute une ligne "Demande" dans le Google Sheet de suivi. Ne jette jamais : en cas
// d'échec (credentials absents, Sheet inaccessible...), on logue et on continue — la
// conversation avec le visiteur ne doit pas planter pour un problème de journalisation.
export async function appendLead(lead: Lead): Promise<boolean> {
  const sheets = sheetsClient();
  if (!sheets) {
    console.warn("[sheets] Google Sheets non configuré : la demande n'a pas été enregistrée.", lead);
    return false;
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: config.sheets.sheetId!,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            "site web",
            lead.langue,
            lead.motif,
            lead.nom || "",
            lead.structure_projet || "",
            lead.besoin,
            lead.contact || "",
            lead.accord_contact ? "oui" : "non",
          ],
        ],
      },
    });
    return true;
  } catch (err) {
    console.error("[sheets] Échec de l'enregistrement de la demande :", (err as Error).message);
    return false;
  }
}
