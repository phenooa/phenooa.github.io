const fs = require('fs');

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

console.log(`Parsed ${points.length} points.`);

// Compute min/max to establish scaling parameters
const xCoords = points.map(p => p.x);
const yCoords = points.map(p => p.y);

const xMin = Math.min(...xCoords);
const xMax = Math.max(...xCoords);
const yMin = Math.min(...yCoords);
const yMax = Math.max(...yCoords);

console.log(`Original Bounding Box: X [${xMin}, ${xMax}] (width ${xMax-xMin}), Y [${yMin}, ${yMax}] (height ${yMax-yMin})`);

// We want to fit these points into our SVG canvas nicely.
// Let's check target boundaries:
// ViewBox is "70 0 290 500" (X goes 70 to 360, Y goes 0 to 500)
// To have some margin, we can target Y range [15, 480].
// Let's preserve aspect ratio exactly.
const targetYMin = 15;
const targetYMax = 480;
const scale = (targetYMax - targetYMin) / (yMax - yMin);

const targetXMax = 345; // target max X on the canvas (leaving room for fibular shaft labels)
const targetXMin = targetXMax - (xMax - xMin) * scale;

console.log(`Scale: ${scale}`);
console.log(`targetXMin: ${targetXMin}`);

const mappedPoints = points.map(pt => {
  const X = (pt.x - xMin) * scale + targetXMin;
  const Y = (pt.y - yMin) * scale + targetYMin;
  return {
    index: pt.index,
    x: Math.round(X * 10) / 10,
    y: Math.round(Y * 10) / 10
  };
});

// Helper to generate path from indices
function getPath(indices, closed = false) {
  let path = '';
  indices.forEach((idx, i) => {
    const pt = mappedPoints.find(p => p.index === idx);
    if (i === 0) {
      path += `M${pt.x},${pt.y}`;
    } else {
      path += ` L${pt.x},${pt.y}`;
    }
  });
  if (closed) path += 'Z';
  return path;
}

// Helper to generate range path
function getRangePath(start, end, closed = false) {
  const indices = [];
  for (let i = start; i <= end; i++) {
    indices.push(i);
  }
  return getPath(indices, closed);
}

console.log("\n--- KNEE OUTLINES ---");
console.log(`femurShaftRight: "${getRangePath(0, 5)}",`);
console.log(`femurWidenRight: "${getRangePath(5, 10)}",`);
console.log(`lateralCondyle: "${getRangePath(10, 16)}",`);
console.log(`lateralCondyleBottom: "${getRangePath(16, 19)}",`);
console.log(`intercondylarNotch: "${getRangePath(19, 25)}",`);
console.log(`medialCondyleBottom: "${getRangePath(25, 28)}",`);
console.log(`medialCondyle: "${getRangePath(28, 34)}",`);
console.log(`femurWidenLeft: "${getRangePath(34, 39)}",`);
console.log(`femurShaftLeft: "${getRangePath(39, 44)}",`);

console.log(`lateralTibialShaft: "${getRangePath(45, 57)}",`);
console.log(`lateralPlateau: "${getRangePath(57, 62)}",`);
console.log(`tibialSpines: "${getRangePath(62, 67)}",`);
console.log(`medialPlateau: "${getRangePath(67, 73)}",`);
console.log(`medialTibialShaft: "${getRangePath(73, 85)}",`);

console.log(`lateralSubchondral: "${getRangePath(86, 90)}",`);
console.log(`medialSubchondral: "${getRangePath(91, 95)}",`);

console.log(`fibula: "${getRangePath(96, 119)}",`); // Note: points 96 and 119 do not connect!
console.log(`patella: "${getRangePath(120, 128)}",`);

// Print out mapped points list
console.log("\n--- MAPPED POINTS ARRAY ---");
console.log(JSON.stringify(mappedPoints));
