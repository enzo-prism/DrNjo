import tls from "node:tls";

const host = process.env.TLS_CHECK_HOST || "michaelnjodds.com";
const port = Number(process.env.TLS_CHECK_PORT || 443);
const minimumDaysValid = Number(process.env.TLS_MIN_DAYS || 14);

function formatUtc(date: Date): string {
  return date.toISOString().replace("T", " ").replace(".000Z", " UTC");
}

function checkCertificate(): Promise<void> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host,
        port,
        servername: host,
        rejectUnauthorized: false,
        timeout: 10_000,
      },
      () => {
        const cert = socket.getPeerCertificate();

        if (!cert || !cert.valid_to) {
          socket.destroy();
          reject(new Error(`No peer certificate presented by ${host}:${port}`));
          return;
        }

        const validTo = new Date(cert.valid_to);
        const now = new Date();
        const msRemaining = validTo.getTime() - now.getTime();
        const daysRemaining = Math.floor(msRemaining / (1000 * 60 * 60 * 24));

        console.log(`TLS certificate for ${host}:${port}`);
        console.log(`  Subject CN: ${cert.subject?.CN || "(unknown)"}`);
        console.log(`  Issuer CN : ${cert.issuer?.CN || "(unknown)"}`);
        console.log(`  Expires   : ${formatUtc(validTo)}`);
        console.log(`  Remaining : ${daysRemaining} day(s)`);

        socket.end();

        if (Number.isNaN(validTo.getTime())) {
          reject(new Error(`Unable to parse certificate expiration date: ${cert.valid_to}`));
          return;
        }

        if (msRemaining <= 0) {
          reject(new Error(`TLS certificate for ${host} is expired.`));
          return;
        }

        if (daysRemaining < minimumDaysValid) {
          reject(
            new Error(
              `TLS certificate for ${host} expires in ${daysRemaining} day(s), below TLS_MIN_DAYS=${minimumDaysValid}.`,
            ),
          );
          return;
        }

        resolve();
      },
    );

    socket.on("error", (err) => {
      reject(new Error(`TLS check failed for ${host}:${port}: ${err.message}`));
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error(`TLS check timed out for ${host}:${port}`));
    });
  });
}

checkCertificate().catch((err) => {
  console.error(err.message || err);
  process.exitCode = 1;
});
