const fs = require('fs');

// Load original KL3HYK data
const originalData = JSON.parse(fs.readFileSync('KL3HYK.json', 'utf8'));

// New points list from user
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

// Note: the rawPointsText above has 1 duplicate line for point 33 (151.703 371.78 is written twice in the copy). Let's fix that.
const lines = rawPointsText.trim().split('\n');
const points = [];
lines.forEach((line, idx) => {
  const [xStr, yStr] = line.trim().split(/\s+/);
  points.push({
    index: idx,
    x: parseFloat(xStr),
    y: parseFloat(yStr)
  });
});

// Since the user list has 129 points but had one line duplicated, let's map them index-by-index to KL3HYK original points.
// Let's get the correspondences
const correspondences = [];
originalData.points.forEach(origPt => {
  const newPt = points.find(p => p.index === origPt.index);
  if (newPt) {
    correspondences.push({ orig: origPt, newPt: newPt });
  }
});

// Let's find the best affine transform from original to new coordinate system
// x_new = a * x_orig + b * y_orig + tx
// y_new = c * x_orig + d * y_orig + ty
// We can use a simple isotropic scaling + rotation + translation (similarity transform) or standard affine.
// Let's fit standard affine parameters using least squares.
let sum_x = 0, sum_y = 0, sum_x2 = 0, sum_y2 = 0, sum_xy = 0;
let sum_u = 0, sum_v = 0, sum_xu = 0, sum_yu = 0, sum_xv = 0, sum_yv = 0;
const N = correspondences.length;

correspondences.forEach(c => {
  const x = c.orig.x;
  const y = c.orig.y;
  const u = c.newPt.x;
  const v = c.newPt.y;

  sum_x += x;
  sum_y += y;
  sum_x2 += x * x;
  sum_y2 += y * y;
  sum_xy += x * y;
  sum_u += u;
  sum_v += v;
  sum_xu += x * u;
  sum_yu += y * u;
  sum_xv += x * v;
  sum_yv += y * v;
});

// Solves for [a, b, tx] and [c, d, ty]
// Matrix M:
// [ sum_x2  sum_xy  sum_x ]
// [ sum_xy  sum_y2  sum_y ]
// [ sum_x   sum_y   N     ]
function solve3x3(M, B) {
  const det = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
              M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
              M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
              
  const detA = B[0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
               M[0][1] * (B[1] * M[2][2] - M[1][2] * B[2]) +
               M[0][2] * (B[1] * M[2][1] - M[1][1] * B[2]);

  const detB = M[0][0] * (B[1] * M[2][2] - M[1][2] * B[2]) -
               B[0] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
               M[0][2] * (M[1][0] * B[2] - B[1] * M[2][0]);

  const detC = M[0][0] * (M[1][1] * B[2] - B[1] * M[2][1]) -
               M[0][1] * (M[1][0] * B[2] - B[1] * M[2][0]) +
               B[0] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

  return [detA / det, detB / det, detC / det];
}

const M = [
  [sum_x2, sum_xy, sum_x],
  [sum_xy, sum_y2, sum_y],
  [sum_x,  sum_y,  N]
];

const [a, b, tx] = solve3x3(M, [sum_xu, sum_yu, sum_u]);
const [c, d, ty] = solve3x3(M, [sum_xv, sum_yv, sum_v]);

console.log("Transformation Coefficients:");
console.log(`x_new = ${a} * x + ${b} * y + ${tx}`);
console.log(`y_new = ${c} * x + ${d} * y + ${ty}`);

// Now, let's transform the original osteophyte contours to the new points coordinate system!
// And then scale them to fit the SVG canvas.
// Canvas scaling parameters (from parsePoints.cjs)
const canvasXMin = Math.min(...points.map(p => p.x));
const canvasXMax = Math.max(...points.map(p => p.x));
const canvasYMin = Math.min(...points.map(p => p.y));
const canvasYMax = Math.max(...points.map(p => p.y));

const targetYMin = 15;
const targetYMax = 480;
const scale = (targetYMax - targetYMin) / (canvasYMax - canvasYMin);

const targetXMax = 345;
const targetXMin = targetXMax - (canvasXMax - canvasXMin) * scale;

console.log(`Canvas Scale: ${scale}`);
console.log(`Canvas targetXMin: ${targetXMin}`);

console.log("\n--- SCALED OSTEOPHYTE PATHS (ADAPTED TO NEW POINTS) ---");

originalData.osteophytes.forEach(ost => {
  let path = '';
  ost.contour_points.forEach((p, i) => {
    // Transform original to new coordinate system
    const newX = a * p.x + b * p.y + tx;
    const newY = c * p.x + d * p.y + ty;
    
    // Scale new coordinate system to canvas
    const X = Math.round(((newX - canvasXMin) * scale + targetXMin) * 10) / 10;
    const Y = Math.round(((newY - canvasYMin) * scale + targetYMin) * 10) / 10;
    if (i === 0) {
      path += `M${X},${Y}`;
    } else {
      path += ` L${X},${Y}`;
    }
  });
  path += 'Z';
  console.log(`${ost.compartment} (${ost.color_name}): "${path}",`);
});
