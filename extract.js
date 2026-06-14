const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log("Creating directory /Refs/extracted");
  fs.mkdirSync('/Refs/extracted', { recursive: true });
  console.log("Running unzip command...");
  const output = execSync('unzip -o -d /Refs/extracted /Refs/Archive.zip');
  console.log("Unzip output:");
  console.log(output.toString());
} catch (err) {
  console.error("Error executing unzip:", err.message);
  if (err.stdout) console.log("Stdout:", err.stdout.toString());
  if (err.stderr) console.log("Stderr:", err.stderr.toString());
}
