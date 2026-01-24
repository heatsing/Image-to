export interface FAQItem {
  question: string
  answer: string
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'How do I convert images?',
    answer:
      'Simply upload your images using the upload button or drag and drop them into the converter. Select your desired output format (JPG, WebP, or PNG) and click "Convert". All conversion happens locally in your browser—no uploads required.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely! All image conversion happens 100% locally on your device. Your files never leave your computer—no uploads to servers, no data collection, complete privacy.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'We support 40+ formats including WebP, PNG, JPEG, SVG, BMP, AVIF, HEIC, TIFF, GIF, ICO, PSD, TGA, CUR, DDS, and many more. You can convert from any of these formats to JPG, WebP, or PNG.',
  },
  {
    question: 'Can I convert multiple images at once?',
    answer:
      'Yes! You can upload and convert multiple images simultaneously. Our batch processing feature allows you to convert hundreds of images in one go, saving you time and effort.',
  },
  {
    question: 'Is this tool really free?',
    answer:
      'Yes, completely free! No signup required, no hidden fees, no watermarks. Use it as much as you want, whenever you need it.',
  },
  {
    question: 'What is the maximum file size?',
    answer:
      'We recommend files under 10MB per image for optimal performance. Larger files may take longer to process, but the tool can handle them.',
  },
]
