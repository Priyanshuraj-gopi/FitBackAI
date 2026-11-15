import { Product, CustomerProfile, FitRecommendation, Size, FitPreference } from '../types';

export function calculateFitRecommendation(
  product: Product,
  customer: Partial<CustomerProfile>,
  preferredFitOverride?: FitPreference
): FitRecommendation {
  const fitPreference: FitPreference = preferredFitOverride || customer.preferredFit || 'regular';
  
  // Ease requirements based on fit preference (in cm)
  // For woven non-stretch fabric vs stretch
  const isStretch = product.fabricStretch.includes('Stretch') && !product.fabricStretch.includes('No Stretch');
  const stretchDeduction = isStretch ? 2 : 0;

  const targetEase = {
    fitted: { bust: Math.max(2, 3 - stretchDeduction), waist: 2, hip: 4 },
    regular: { bust: Math.max(4, 5 - stretchDeduction), waist: 5, hip: 6 },
    relaxed: { bust: Math.max(6, 8 - stretchDeduction), waist: 8, hip: 9 }
  }[fitPreference];

  const hasBodyMeasurements = Boolean(customer.bust && customer.bust > 0);
  
  // Fallback if measurements missing: estimate from usualSize
  let estBust = customer.bust || 0;
  let estWaist = customer.waist || 0;
  let estHip = customer.hip || 0;

  if (!hasBodyMeasurements && customer.usualSize) {
    const baselineMap: Record<Size, { bust: number; waist: number; hip: number }> = {
      XS: { bust: 82, waist: 68, hip: 90 },
      S: { bust: 86, waist: 72, hip: 94 },
      M: { bust: 90, waist: 76, hip: 98 },
      L: { bust: 96, waist: 82, hip: 104 },
      XL: { bust: 102, waist: 88, hip: 110 },
      XXL: { bust: 108, waist: 94, hip: 116 }
    };
    const mapped = baselineMap[customer.usualSize] || baselineMap['M'];
    estBust = mapped.bust;
    estWaist = mapped.waist;
    estHip = mapped.hip;
  }

  const sizes = Object.keys(product.garmentMeasurements) as Size[];
  
  const easeBreakdown = sizes.map(size => {
    const garment = product.garmentMeasurements[size];
    const bustEase = garment.bust - estBust;
    const waistEase = garment.waist - estWaist;
    const hipEase = garment.hip - estHip;

    // Evaluate fit assessment
    let fitAssessment: 'Tight' | 'Fitted' | 'Ideal Room' | 'Loose' | 'Too Loose' = 'Ideal Room';
    if (bustEase < 2 || waistEase < 1) {
      fitAssessment = 'Tight';
    } else if (bustEase >= 2 && bustEase < 4) {
      fitAssessment = 'Fitted';
    } else if (bustEase >= 4 && bustEase <= 9) {
      fitAssessment = 'Ideal Room';
    } else if (bustEase > 9 && bustEase <= 14) {
      fitAssessment = 'Loose';
    } else {
      fitAssessment = 'Too Loose';
    }

    // Proximity to target ease score
    const bustDiff = Math.abs(bustEase - targetEase.bust);
    const waistDiff = Math.abs(waistEase - targetEase.waist);
    const hipDiff = Math.abs(hipEase - targetEase.hip);

    // Negative penalty for negative ease (garment smaller than body!)
    const tightPenalty = (bustEase < 1.5 ? 40 : 0) + (waistEase < 1 ? 30 : 0);

    const error = (bustDiff * 1.5) + (waistDiff * 1.0) + (hipDiff * 0.8) + tightPenalty;
    const matchScore = Math.max(10, Math.round(100 - error * 4.5));

    return {
      size,
      bustEase,
      waistEase,
      hipEase,
      matchScore,
      fitAssessment
    };
  });

  // Sort by match score
  easeBreakdown.sort((a, b) => b.matchScore - a.matchScore);
  const bestMatch = easeBreakdown[0];
  const secondBest = easeBreakdown[1];

  // Calculate confidence
  let confidence = hasBodyMeasurements ? 94 : 68;
  if (product.fabricStretch === 'No Stretch' && hasBodyMeasurements) {
    confidence = 92; // slightly more strict
  }
  if (!customer.bust && !customer.usualSize) {
    confidence = 45;
  }

  // Generate transparent natural language explanation
  let reason = '';
  const recommendedGarment = product.garmentMeasurements[bestMatch.size];
  
  if (hasBodyMeasurements) {
    reason = `Based on your body bust (${estBust} cm) and preference for a ${fitPreference} silhouette, Size ${bestMatch.size} provides ${bestMatch.bustEase} cm of chest ease and ${bestMatch.waistEase} cm around the waist.`;
    if (bestMatch.bustEase < 3.5 && product.fabricStretch === 'No Stretch') {
      reason += ` Because this garment is in pure non-stretch ${product.fabric}, this provides a tailored drape without pulling.`;
    } else {
      reason += ` This ensures uninhibited arm movement while maintaining the intended ${product.fitType} silhouette.`;
    }
  } else {
    reason = `Estimated from your usual size ${customer.usualSize || 'M'}. For higher precision, save your exact bust and waist measurements in your Fit Profile.`;
  }

  const caveats: string[] = [
    `Product fabric: ${product.fabric} (${product.fabricStretch}).`,
    `Garment measurements reflect flat finished specs (+/- 1.2 cm artisan tailoring variance).`,
    `FitWise AI recommendations are advisory and never affect your eligible return or exchange rights.`
  ];

  if (bestMatch.size === 'M' && product.sku === 'KRT-101' && product.garmentMeasurements.M.bust <= 92) {
    caveats.unshift(`Note: Historical customer feedback indicates KRT-101 cut fits snug across the upper ribcage. If you prefer extra breathing room, consider Size L.`);
  }

  return {
    recommendedSize: bestMatch.size,
    alternativeSize: secondBest && secondBest.matchScore > 65 ? secondBest.size : undefined,
    confidence,
    fitPreference,
    reason,
    easeBreakdown,
    caveats,
    isAdvisory: true,
    sourceDocuments: [
      `${product.sku} Garment Spec Sheet`,
      `Brand Standard Ease Table (ISO 8559)`,
      `${product.fabric} Elasticity Index`
    ]
  };
}
