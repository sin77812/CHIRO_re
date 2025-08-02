# Precision Mold Manufacturing Portfolio Website

A premium, industrial-focused portfolio website for Sejin Precision, a leading precision mold manufacturing company in Korea. This website showcases the company's expertise in automotive, electronics, medical, and industrial mold manufacturing.

## 🎯 Project Overview

This is a high-quality, professional website designed for a precision mold manufacturing company. The design emphasizes industrial premium aesthetics with a focus on precision, reliability, and global reach.

### Design Concept
- **Industrial Premium**: Clean, professional design with metallic accents
- **Color Palette**: Charcoal (#232323), Silver (#D9D9D9), Metal Blue (#3A72B0), White (#FFFFFF)
- **Typography**: Montserrat (headings), Inter (body), Roboto Mono (numbers/stats)
- **Target Audience**: Global manufacturers, automotive, electronics, medical device companies

## 🚀 Features

### Core Sections
- **Hero Section**: Bilingual (Korean/English) introduction with compelling CTAs
- **About**: Company history, certifications, and key statistics
- **Expertise**: Manufacturing process timeline with technical details
- **Products**: Filterable product catalog with specifications
- **Clients**: Client logos and performance metrics
- **Portfolio**: Case studies with before/after showcases
- **Process**: 5-step workflow from consultation to support
- **Contact**: Professional contact form with validation

### Technical Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Performance Optimized**: Lazy loading, efficient CSS, minimal JavaScript
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **SEO Optimized**: Meta tags, structured data, fast loading
- **Form Validation**: Real-time validation with user feedback
- **Smooth Animations**: Subtle hover effects and scroll-triggered animations

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── public/
│   └── img/               # Product and portfolio images
├── src/
│   ├── css/
│   │   └── styles.css     # Main stylesheet with CSS variables
│   └── js/
│       └── script.js      # Interactive functionality
├── README.md              # Project documentation
└── GEMINI.md             # Detailed specifications and requirements
```

## 🛠 Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties, Grid, Flexbox
- **Vanilla JavaScript**: No dependencies, lightweight interactions
- **Google Fonts**: Montserrat, Inter, Roboto Mono
- **Font Awesome**: Professional iconography

## 🎨 Design System

### Color Variables
```css
--color-charcoal: #232323    /* Primary dark */
--color-white: #FFFFFF       /* Primary light */
--color-silver: #D9D9D9      /* Secondary gray */
--color-metal-blue: #3A72B0  /* Accent blue */
--color-mid-gray: #6E6E6E    /* Text secondary */
```

### Typography Scale
- **Display**: 48px+ (Hero titles)
- **Headings**: 24-36px (Section headers)
- **Body**: 16-18px (Paragraphs)
- **Small**: 12-14px (Captions, specs)

### Spacing System
Based on 4px grid with consistent spacing tokens from 4px to 128px.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (Primary design)
- **Tablet**: 768px-1199px (Adapted layouts)
- **Mobile**: 320px-767px (Stacked layouts)

## 🔧 Setup & Deployment

### Local Development
1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. For development server, use tools like Live Server (VS Code) or Python's SimpleHTTPServer

### Production Deployment
This project is ready for static hosting on:
- **Vercel**: Drag & drop deployment
- **Netlify**: Git-based or manual deployment
- **Cloudflare Pages**: Enterprise-grade CDN
- **GitHub Pages**: Free hosting option

#### Deployment Steps:
1. Upload all files maintaining the folder structure
2. Ensure `index.html` is in the root directory
3. Update image paths if using a CDN
4. Configure any necessary redirects or headers

## 🖼 Image Requirements

### Recommended Image Specifications:
- **Hero Background**: 1920x1080px, high-quality industrial/manufacturing scene
- **Product Images**: 400x300px, consistent aspect ratio
- **Portfolio Images**: 600x400px, before/after comparison shots
- **Format**: WebP preferred, JPEG fallback
- **Optimization**: Compress for web without quality loss

### Placeholder Images:
Currently using placeholder paths. Replace with actual images:
- `public/img/auto-mold-500.jpg`
- `public/img/micro-mold-70.jpg`
- `public/img/medical-tool-30.jpg`
- `public/img/case-study-1.jpg`
- `public/img/case-study-2.jpg`
- `public/img/case-study-3.jpg`

## 📧 Contact Form Integration

The contact form is currently set up for frontend validation. To make it functional:

1. **Backend Integration**: Connect to email service (NodeMailer, SendGrid, etc.)
2. **Form Handler**: Use services like Formspree, Netlify Forms, or custom API
3. **Validation**: Server-side validation is recommended for production

### Form Fields:
- Name (required)
- Phone (required, format validation)
- Email (required, email validation)
- Inquiry Type (dropdown selection)
- Message (required, textarea)

## 🌐 Internationalization

The website includes bilingual content structure:
- Korean text in headings and CTAs
- English text for global appeal
- Easy to extend for full i18n implementation

## ⚡ Performance Optimizations

- **CSS**: Efficient selectors, minimal nesting
- **Images**: Lazy loading implementation ready
- **JavaScript**: Vanilla JS, no external dependencies
- **Fonts**: Optimized Google Fonts loading
- **Critical CSS**: Above-the-fold styles prioritized

## 🔍 SEO Features

- Semantic HTML5 structure
- Meta descriptions and titles
- Open Graph tags ready for implementation
- Fast loading times
- Mobile-friendly design
- Structured data potential

## 📞 Support & Customization

This template is designed for easy customization:

### Common Customizations:
1. **Company Information**: Update all company details in HTML
2. **Colors**: Modify CSS variables in `:root`
3. **Content**: Replace dummy content with actual data
4. **Images**: Add real product and portfolio images
5. **Contact**: Integrate with email service

### Advanced Features to Add:
- Multi-language switching
- Product detail modals
- Advanced filtering
- Blog/news section
- Client testimonials carousel

## 📄 License

This is a custom template created for Chiro Design Company. Please respect intellectual property rights and use responsibly.

---

**Created by**: Chiro Design Company  
**Project Type**: Industrial Portfolio Website  
**Industry**: Precision Mold Manufacturing  
**Target Market**: Global B2B Manufacturing