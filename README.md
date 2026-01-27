# IhnorSec - Fraud Detection System

A comprehensive Angular-based fraud detection and analysis system for identifying anomalies in identity documents, payments, and compliance processes across sensitive sectors.

## Features

- **Multi-Type Analysis**: Identity verification, payment fraud detection, and compliance monitoring
- **OCR Integration**: Document scanning and data extraction with confidence scoring
- **Real-time Dashboard**: Live fraud statistics and risk assessment metrics
- **Comparison Tables**: Side-by-side data validation between systems and documents
- **Anomaly Detection**: Automated identification of suspicious patterns and discrepancies
- **Configuration Management**: Modular system configuration and detection rules setup
- **Multi-tenant Support**: Platform administration for multiple organizations
- **Internationalization**: Runtime language switching (English/French)
- **Responsive Design**: Modern UI with Tailwind CSS and Lucide icons

## Tech Stack

- **Framework**: Angular 21.0.3 (Standalone Components)
- **UI Library**: Ng-Zorro (Ant Design)
- **Icons**: Lucide Angular
- **Styling**: Tailwind CSS + SCSS
- **Testing**: Vitest
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:jessica-ngassa/ihnorSec.git
   cd ihnorSec
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open browser**
   Navigate to `http://localhost:4200/`

## Project Structure

```
src/app/
├── features/
│   ├── dashboard/           # Main analytics dashboard
│   ├── upload-center/       # File upload functionality
│   ├── fraud-cases/         # Fraud case management
│   │   ├── fraud/          # Case listing
│   │   └── fraud-detail/   # Detailed case analysis
│   ├── document/           # OCR document review
│   ├── reports/            # Reports & audit functionality
│   ├── config/             # Configuration management
│   │   ├── modules/        # Module configuration
│   │   ├── detection-rules/ # Detection rules setup
│   │   ├── data-mapping/   # Data mapping configuration
│   │   └── agency-settings/ # Agency-specific settings
│   ├── admin/              # Platform administration
│   │   └── multi-tenant/   # Multi-tenant configuration
│   └── main-layout/        # Application shell
├── shared/
│   ├── components/         # Reusable UI components
│   │   ├── comparison-table/    # Data comparison tables
│   │   ├── anomalies-detected/ # Anomaly display
│   │   └── ocr-document-viewer/ # Document viewer
│   ├── model/             # TypeScript interfaces
│   └── services/          # Data services
│       └── translation.service.ts # Runtime translation service
└── core/                  # Core application logic
```

## Key Components

### Dashboard
- Real-time fraud statistics
- Risk assessment metrics
- Sector-wise analysis breakdown
- Quick action buttons for data upload

### Fraud Cases
- **List View**: Filterable table of all fraud cases
- **Detail View**: Comprehensive analysis with:
  - OCR document comparison
  - Payment variance analysis
  - Compliance deviation tracking
  - Anomaly detection results

### Comparison Table (Reusable)
```typescript
<app-comparison-table 
  title="Data Comparison: System vs Document"
  [data]="comparisonData"
  leftColumnLabel="System Data"
  rightColumnLabel="Document Data"
  [formatFunction]="customFormatter">
</app-comparison-table>
```

## Available Scripts

```bash
# Development
ng serve                    # Start dev server
ng build                   # Build for production
ng test                    # Run unit tests
ng e2e                     # Run e2e tests

# Code Generation
ng generate component name  # Create new component
ng generate service name   # Create new service
ng generate --help         # See all options
```

## Configuration

### Lucide Icons
Icons are configured in `src/app/app.config.ts`. To add new icons:

```typescript
import { NewIcon } from 'lucide-angular';
```

### Tailwind CSS
Custom styles in `src/app/features/*/component.scss` files.

## Data Models

### FraudCase Interface
```typescript
interface FraudCase {
  id: string | number;
  recordType: 'identity' | 'payment' | 'compliance';
  name: string;
  fraudScore: number;
  status: string;
  anomalies: Anomaly[];
  // Type-specific data...
}
```

### Comparison Data
```typescript
interface ComparisonRow {
  field: string;
  expected?: any;
  actual?: any;
  system?: any;
  doc?: any;
  match: boolean;
  isMissing?: boolean;
}
```

## Development Guidelines

1. **Components**: Use standalone components with explicit imports
2. **Services**: Implement reactive patterns with RxJS and signals
3. **Styling**: Prefer Tailwind utilities over custom CSS
4. **Icons**: Add new Lucide icons to app.config.ts
5. **Types**: Define interfaces in `shared/model/`

## Testing

```bash
# Unit tests
ng test

# E2E tests  
ng e2e

# Coverage report
ng test --code-coverage
```

## Build & Deployment

```bash
# Production build
ng build --configuration production

# Build artifacts stored in dist/
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branch from `main`
2. Follow Angular style guide
3. Add tests for new features
4. Update documentation
5. Submit pull request

## License

[Add your license information here]

## Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check Angular documentation: https://angular.dev
