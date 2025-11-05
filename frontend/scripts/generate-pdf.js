// Generate a PDF from a source image path and save into public/pdfs
// Usage: node scripts/generate-pdf.js <relative-image-path-from-public> <output-filename-without-ext>

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generatePdfFromImage(relativeImagePathFromPublic, outputNameWithoutExt) {
  const publicDir = path.join(__dirname, '..', 'public');
  const imagesDirPath = path.join(publicDir, relativeImagePathFromPublic);
  const outputDir = path.join(publicDir, 'pdfs');
  const outputPath = path.join(outputDir, `${outputNameWithoutExt}.pdf`);

  if (!fs.existsSync(imagesDirPath)) {
    console.error(`Image not found at: ${imagesDirPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const doc = new PDFDocument({ autoFirstPage: false });
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Read image to get dimensions
  const size = doc.openImage(imagesDirPath);
  const pageWidth = size.width;
  const pageHeight = size.height;

  doc.addPage({ size: [pageWidth, pageHeight], margin: 0 });
  doc.image(imagesDirPath, 0, 0, { width: pageWidth, height: pageHeight });

  doc.end();

  writeStream.on('finish', () => {
    console.log(`PDF generated: ${outputPath}`);
  });
}

const [,, relImg, outName] = process.argv;
if (!relImg || !outName) {
  console.error('Usage: node scripts/generate-pdf.js <relative-image-path-from-public> <output-filename-without-ext>');
  process.exit(1);
}

generatePdfFromImage(relImg, outName);




















