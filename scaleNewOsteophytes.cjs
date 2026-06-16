const fs = require('fs');

const data = JSON.parse(fs.readFileSync('KL3HYK.json', 'utf8'));

// New scaling parameters
const xMin = 147.975;
const yMin = 52.7603;
const scale = 0.5778158238777605;
const targetXMin = 53.055665906642105;
const targetYMin = 15;

console.log("--- SCALED OSTEOPHYTE PATHS ---");

data.osteophytes.forEach(ost => {
  let path = '';
  ost.contour_points.forEach((p, i) => {
    const X = Math.round(((p.x - xMin) * scale + targetXMin) * 10) / 10;
    const Y = Math.round(((p.y - yMin) * scale + targetYMin) * 10) / 10;
    if (i === 0) {
      path += `M${X},${Y}`;
    } else {
      path += ` L${X},${Y}`;
    }
  });
  path += 'Z';
  console.log(`${ost.compartment} (${ost.color_name}): "${path}",`);
});
