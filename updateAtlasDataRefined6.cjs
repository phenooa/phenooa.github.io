const fs = require('fs');

// 1. Read KL3HYK data
const originalData = JSON.parse(fs.readFileSync('KL3HYK.json', 'utf8'));

// 2. User's raw points
const rawPointsText = `499.547 52.7603
500.486 96.41
502.44 140.085
506.395 184.825
512.86 210.35
521.403 233.899
534.028 256.534
550.783 276.229
569.668 291.919
577.248 313.414
581.736 336.861
582.218 358.179
579.608 381.449
573.981 403.629
569.394 424.82
566.809 447.076
560.194 468.217
546.785 477.013
509.067 484.188
472.616 481.249
435.328 471.187
400.17 457.12
363.947 445.055
330.057 461.457
299.132 480.976
264.304 494.31
226.713 496.416
191.352 490.46
182.505 479.079
172.998 453.477
165.57 425.899
157.103 399.309
151.703 371.78
150.333 345.368
147.975 317.915
153.753 289.652
166.528 265.621
184.069 253.884
200.646 240.094
214.207 225.214
225.791 208.256
236.385 190.258
252.683 147.039
264.95 102.704
275.189 58.3192
469.46 851.486
477.545 812.12
486.669 771.765
496.832 730.422
510.747 701.347
527.679 673.362
549.554 650.573
574.445 628.874
582.074 607.759
586.712 584.539
587.32 560.205
581.159 532.811
571.39 507.855
554.112 508.648
528.688 511.057
501.185 515.443
474.823 514.785
448.612 508.043
397.813 470.25
387.395 481.15
376.09 486.956
360.07 478.439
345.114 467.92
323.011 499.834
289.02 520.292
250.389 523.385
210.871 521.384
191.122 523.55
177.267 519.593
180.292 546.927
184.832 572.154
190.823 592.918
198.403 614.413
205.957 636.922
223.677 658.67
241.37 681.432
253.944 706.096
262.437 731.672
270.575 771.443
276.66 812.178
283.759 852.937
442.681 501.807
467.826 510.552
497.205 512.3
524.683 508.928
553.123 507.608
319.969 499.758
283.291 505.945
246.662 510.103
208.97 516.264
190.108 519.933
589.028 857.515
594.046 819.087
601.117 779.695
610.19 741.369
621.85 721.368
636.526 702.458
653.23 683.598
647.779 658.098
636.143 636.502
622.505 613.841
608.867 591.18
599.868 585.882
588.766 583.576
576.598 583.272
540.731 597.595
510.795 618.154
490.746 649.105
482.712 686.443
498.352 710.169
514.018 732.88
522.511 758.456
526.771 791.029
529.053 821.523
528.218 854.982
210.991 313.401
224.297 268.078
255.5 237.406
296.639 215.098
340.593 201.991
386.27 201.102
429.464 218.414
452.888 255.523
458.846 301.327`;

const points = rawPointsText.trim().split('\n').map((line, idx) => {
  const [xStr, yStr] = line.trim().split(/\s+/);
  return {
    index: idx,
    x: parseFloat(xStr),
    y: parseFloat(yStr)
  };
});

// Update point 70 raw Y to align with 69 and 71 and raise it up
points[70].y = 517.5;

// Compute center of original points
const xCoords = points.map(p => p.x);
const yCoords = points.map(p => p.y);
const xCenter_user = (Math.min(...xCoords) + Math.max(...xCoords)) / 2;
const yCenter_user = (Math.min(...yCoords) + Math.max(...yCoords)) / 2;

// Define scales and offsets: Femur/Patella = 0.45, Tibia = 0.45 (+15 y-offset), Fibula = 0.41 (+15 y-offset)
const scaleFemur = 0.45;
const scaleTibia = 0.45;
const scaleFibula = 0.41;

const mappedPoints = points.map(pt => {
  let scaleFactor = scaleFemur;
  let yOffset = 0;
  
  if (pt.index >= 45 && pt.index <= 95) {
    scaleFactor = scaleTibia;
    yOffset = 15;
  } else if (pt.index >= 96 && pt.index <= 119) {
    scaleFactor = scaleFibula;
    yOffset = 15;
  }
  
  const X = (pt.x - xCenter_user) * scaleFactor + 215;
  const Y = (pt.y - yCenter_user) * scaleFactor + 250 + yOffset;
  return {
    index: pt.index,
    x: Math.round(X * 10) / 10,
    y: Math.round(Y * 10) / 10
  };
});

// Update atlasData.ts file
const filepath = 'src/components/views/atlasData.ts';
let content = fs.readFileSync(filepath, 'utf8');

function replaceCoordsList(functionName, startIndex, endIndex) {
  const funcIndex = content.indexOf(`function ${functionName}`);
  if (funcIndex === -1) throw new Error(`Could not find function ${functionName}`);

  const targetPattern = '[number, number, string][] = [';
  const patternIndex = content.indexOf(targetPattern, funcIndex);
  if (patternIndex === -1) throw new Error(`Could not find pattern in ${functionName}`);
  
  const arrayStart = patternIndex + targetPattern.length - 1; // index of '['

  const arrayEnd = content.indexOf('];', arrayStart);
  if (arrayEnd === -1) throw new Error(`Could not find ]; in ${functionName}`);

  const coordsBlock = content.substring(arrayStart, arrayEnd);
  const lines = coordsBlock.split('\n');

  let ptIdx = startIndex;
  const newLines = lines.map(line => {
    const match = line.match(/^\s*\[\s*[\d\.\-]+,\s*[\d\.\-]+,\s*(.*)$/);
    if (match) {
      if (ptIdx > endIndex) {
        throw new Error(`Exceeded index range for ${functionName}`);
      }
      const pt = mappedPoints[ptIdx];
      ptIdx++;
      const leadingWhitespace = line.match(/^\s*/)[0];
      return `${leadingWhitespace}[${pt.x}, ${pt.y}, ${match[1]}`;
    }
    return line;
  });

  const newCoordsBlock = newLines.join('\n');
  content = content.substring(0, arrayStart) + newCoordsBlock + content.substring(arrayEnd);
}

replaceCoordsList('generateFemurPoints', 0, 44);
replaceCoordsList('generateTibiaPoints', 45, 95);
replaceCoordsList('generateFibulaPoints', 96, 119);
replaceCoordsList('generatePatellaPoints', 120, 128);

fs.writeFileSync(filepath, content, 'utf8');
console.log("SUCCESS: atlasData.ts coordinates updated correctly with Tibia = 0.45 (+15 offset) and Fibula = 0.41 (+15 offset)!");
