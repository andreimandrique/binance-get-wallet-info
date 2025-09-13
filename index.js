import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const apiKey =  process.env.API_KEY
const apiSecret = process.env.API_SECRET

async function getWalletBalance() {
  const baseUrl = "https://api.binance.com";
  const endpoint = "/sapi/v1/asset/wallet/balance";

  const type = "SPOT";
  const timestamp = Date.now();

  const queryString = `type=${type}&timestamp=${timestamp}`;

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(queryString)
    .digest("hex");

  const url = `${baseUrl}${endpoint}?${queryString}&signature=${signature}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-MBX-APIKEY": apiKey,
    },
  });

  const data = await response.json();
  console.log(data);
}

getWalletBalance().catch(console.error);
