// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { FraudCase } from '../../shared/model/fraud-case.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class FraudService {

//   // Rich data matching your UI design screenshots
//   private MOCK_DATA: FraudCase[] = [
//     // 1. Identity Case (High Risk)
//     {
//       id: 1,
//       recordType: 'identity',
//       name: 'Jessica Ngassa',
//       idNumber: 'CMR09284759',
//       // Working placeholder image from Unsplash
//       documentImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
//       systemData: {
//         name: 'Jessica Ngassa',
//         idNumber: 'CMR09284759',
//         dateOfBirth: '18/05/1996',
//         region: 'Yaoundé - Civil Servant'
//       },
//       ocrData: {
//         name: "N'Gassa Jessica",
//         dob: "18/05/1996",
//         idNumber: "CMR09284759",
//         issueDate: "12/01/2020",
//         expiryDate: "12/01/2030",
//         address: "Yaoundé, Centre Region",
//         confidence: 94.5
//       },
//       fraudScore: 87,
//       status: 'High Risk',
//       documentMatched: false,
//       anomalies: [
//         { id: '1', title: 'Name Mismatch', description: 'System vs Doc', severity: 'High' },
//         { id: '2', title: 'Duplicate Doc', description: 'Used by others', severity: 'High' },
//         { id: '3', title: 'Address Missing', description: 'Critical Field', severity: 'Medium' },
//         { id: '4', title: 'Suspicious Pattern', description: 'Cluster ID', severity: 'Low' }
//       ]
//     },

//     // 2. Identity Case (Medium Risk)
//     {
//       id: 2,
//       recordType: 'identity',
//       name: 'Emmanuel Kouam',
//       idNumber: 'CMR08573921',
//       documentImage: 'https://images.unsplash.com/photo-1555445054-01880958d332?w=600',
//       systemData: {
//         name: 'Emmanuel Kouam',
//         idNumber: 'CMR08573921',
//         dateOfBirth: '20/02/1990',
//         region: 'Douala - Contractor'
//       },
//       fraudScore: 72,
//       status: 'High Risk',
//       documentMatched: false,
//       anomalies: [
//         { id: '1', title: 'Face Mismatch', description: 'Biometric fail', severity: 'High' },
//         { id: '2', title: 'Expired Doc', description: 'Date invalid', severity: 'Medium' },
//         { id: '3', title: 'Ghost ID', description: 'Not in civil registry', severity: 'High' }
//       ]
//     },

//     // 3. Payment Case (High Risk - Overpayment)
//     {
//       id: 3,
//       recordType: 'payment',
//       name: 'Thomas Nkwenti',
//       idNumber: 'CMR07835421',
//       paymentData: {
//         reference: 'PAY-2024-08912',
//         transactionId: 'TRX-001',
//         paymentDate: '2024-01-15',
//         department: 'Road Works',
//         paymentType: 'Contract',
//         approvedBy: 'Admin',
//         recipientName: 'Thomas Nkwenti',
//         previousPayments: 5,
//         expectedAmount: 2750000,
//         actualAmount: 8640000,
//         variance: 5890000,
//         variancePercentage: 214.2
//       },
//       fraudScore: 92,
//       status: 'High Risk',
//       documentMatched: true,
//       anomalies: [
//         { id: '1', title: 'Overpayment', description: 'Exceeds contract', severity: 'High' },
//         { id: '2', title: 'Kickback Risk', description: 'Pattern match', severity: 'High' },
//         { id: '3', title: 'Rapid Approval', description: 'Bypassed steps', severity: 'Medium' }
//       ]
//     },

//     // 4. Payment Case (Medical Supply - High Risk)
//     {
//       id: 4,
//       recordType: 'payment',
//       name: 'Grace Fotso',
//       idNumber: 'CMR09124567',
//       paymentData: {
//         reference: 'PAY-2024-01892',
//         transactionId: 'TRX-002',
//         paymentDate: '2024-01-18',
//         department: 'Health',
//         paymentType: 'Supply',
//         approvedBy: 'Admin',
//         recipientName: 'Grace Fotso',
//         previousPayments: 2,
//         expectedAmount: 3000000,
//         actualAmount: 5340000,
//         variance: 2340000,
//         variancePercentage: 78.0
//       },
//       fraudScore: 85,
//       status: 'High Risk',
//       documentMatched: true,
//       anomalies: [
//         { id: '1', title: 'Price Inflation', description: 'Market variance', severity: 'High' },
//         { id: '2', title: 'Ghost Vendor', description: 'New entity', severity: 'High' }
//       ]
//     },

//     // 5. Identity (Low Risk)
//     {
//       id: 5,
//       recordType: 'identity',
//       name: 'Sarah Nkembe',
//       idNumber: 'CMR06291847',
//       documentImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
//       systemData: {
//         name: 'Sarah Nkembe',
//         idNumber: 'CMR06291847',
//         dateOfBirth: '12/11/1995',
//         region: 'Bamenda - Nurse'
//       },
//       fraudScore: 38,
//       status: 'Low Risk',
//       documentMatched: true,
//       anomalies: [
//         { id: '1', title: 'Blurry Document', description: 'Low quality scan', severity: 'Low' }
//       ]
//     },

//     // 6. Payment (Clean)
//     {
//       id: 6,
//       recordType: 'payment',
//       name: 'Cecilia Atangana',
//       idNumber: 'CMR08783496',
//       paymentData: {
//         reference: 'PAY-2024-01201',
//         transactionId: 'TRX-005',
//         paymentDate: '2024-01-20',
//         department: 'Finance',
//         paymentType: 'Consulting',
//         approvedBy: 'Director',
//         recipientName: 'Cecilia Atangana',
//         previousPayments: 10,
//         expectedAmount: 1500000,
//         actualAmount: 1500000,
//         variance: 0,
//         variancePercentage: 0
//       },
//       fraudScore: 17,
//       status: 'Clean',
//       documentMatched: true,
//       anomalies: []
//     },

//     // 7. Identity (Medium Risk)
//     {
//       id: 7,
//       recordType: 'identity',
//       name: 'Paul Biya Jr.',
//       idNumber: 'CMR09384756',
//       documentImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600',
//       systemData: {
//         name: 'Paul Biya Jr.',
//         idNumber: 'CMR09384756',
//         dateOfBirth: '12/11/1985',
//         region: 'Yaoundé - IT Specialist'
//       },
//       fraudScore: 45,
//       status: 'Medium Risk',
//       documentMatched: true,
//       anomalies: [
//         { id: '1', title: 'Data Inconsistency', description: 'DOB Mismatch', severity: 'Medium' }
//       ]
//     },

//     // 8. Identity (Clean)
//     {
//       id: 8,
//       recordType: 'identity',
//       name: 'Andre Onana',
//       idNumber: 'CMR08164532',
//       documentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
//       systemData: {
//         name: 'Andre Onana',
//         idNumber: 'CMR08164532',
//         dateOfBirth: '02/04/1996',
//         region: 'Garoua - Administrator'
//       },
//       fraudScore: 15,
//       status: 'Clean',
//       documentMatched: true,
//       anomalies: []
//     },

//     // 9. Payment (High Risk - Business)
//     {
//       id: 9,
//       recordType: 'payment',
//       name: 'Restaurant Le Gourmet',
//       idNumber: 'FOOD-2024-001',
//       paymentData: {
//         reference: 'PAY-2024-001',
//         transactionId: 'TRX-009',
//         paymentDate: '2024-01-22',
//         department: 'Logistics',
//         paymentType: 'Catering Service',
//         approvedBy: 'Manager',
//         recipientName: 'Le Gourmet',
//         previousPayments: 1,
//         expectedAmount: 500000,
//         actualAmount: 1200000,
//         variance: 700000,
//         variancePercentage: 140.0
//       },
//       fraudScore: 88,
//       status: 'High Risk',
//       documentMatched: true,
//       anomalies: [
//         { id: '1', title: 'Inflated Invoice', description: 'Above standard rates', severity: 'High' },
//         { id: '2', title: 'New Vendor', description: 'No history', severity: 'Medium' },
//         { id: '3', title: 'Weekend Processing', description: 'Unusual time', severity: 'Medium' }
//       ]
//     }
//   ];

//   // Gets the full list (used by the main Fraud table)
//   getFraudCases(): Observable<FraudCase[]> {
//     return of(this.MOCK_DATA).pipe(delay(300));
//   }

//   // Gets a single case by ID (used by Fraud Detail page)
//   getFraudCaseById(id: string | number): Observable<FraudCase | undefined> {
//     // Ensure loose equality (==) to match string IDs from URL with number IDs in data
//     const fraudCase = this.MOCK_DATA.find(c => c.id == id);
//     return of(fraudCase).pipe(delay(300));
//   }
// }










import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FraudCase } from '../../shared/model/fraud-case.model';

@Injectable({
  providedIn: 'root'
})
export class FraudService {

  private MOCK_DATA: FraudCase[] = [
    {
      id: 1,
      recordType: 'identity',
      name: 'Jean Baptiste Kouame',
      idNumber: 'CI-2345678',
      fraudScore: 94,
      status: 'Unassigned',
      documentMatched: false,
      systemData: {
        region: 'Payroll Division',
        name: 'Jean Baptiste', idNumber: 'CI-2345678', dateOfBirth: ''
      },
      anomalies: [
        { id: '1', title: 'Duplicate Payment', severity: 'High', description: 'Multiple payroll entries' }
      ]
    },
    {
      id: 2,
      recordType: 'identity',
      name: 'Aminata Traoré',
      idNumber: 'CI-8765432',
      fraudScore: 88,
      status: 'Under Investigation',
      documentMatched: false,
      systemData: {
        region: 'Social Security',
        name: 'Aminata Traoré', idNumber: 'CI-8765432', dateOfBirth: ''
      },
      assignedTo: 'Marie Diop',
      anomalies: [
        { id: '2', title: 'Ghost Beneficiary', severity: 'High', description: 'Non-existent ID' }
      ]
    },
    {
      id: 3,
      recordType: 'payment',
      name: 'Ibrahim Sanogo',
      idNumber: 'CI-5544332',
      fraudScore: 76,
      status: 'Under Investigation',
      documentMatched: true,
      paymentData: {
        department: 'Health Claims',
        transactionId: '', paymentDate: '', paymentType: '', approvedBy: '', recipientName: '',
        expectedAmount: 0, actualAmount: 0, variance: 0, variancePercentage: 0, paymentMethod: '', reference: '',
        previousPayments: 0
      },
      assignedTo: 'Marie Diop',
      anomalies: [
        { id: '3', title: 'Duplicate Identity', severity: 'Medium', description: 'Multiple claims' }
      ]
    },
    {
      id: 4,
      recordType: 'payment',
      name: 'Kouassi Brigitte',
      idNumber: 'CI-9876543',
      fraudScore: 92,
      status: 'Unassigned',
      documentMatched: false,
      paymentData: {
        department: 'Procurement',
        transactionId: '', paymentDate: '', paymentType: '', approvedBy: '', recipientName: '',
        expectedAmount: 0, actualAmount: 0, variance: 0, variancePercentage: 0, paymentMethod: '', reference: '',
        previousPayments: 0
      },
      anomalies: [
        { id: '4', title: 'Document Forgery', severity: 'High', description: 'Altered invoice' }
      ]
    },
    {
      id: 5,
      recordType: 'compliance',
      name: 'Restaurant Le Gourmet',
      idNumber: 'FOOD-2024-001',
      fraudScore: 88,
      status: 'Unassigned',
      documentMatched: true,
      complianceData: {
        industry: 'Food Service',
        recordId: '', date: '', location: '', processStep: '', performedBy: '', deviationType: '',
        impact: '', expectedProcedure: '', actualProcedure: '', expectedMeasurement: '', measurement: ''
      },
      anomalies: [
        { id: '5', title: 'Health Violation', severity: 'High', description: 'Critical temp failure' }
      ]
    }
  ];

  getFraudCases(): Observable<FraudCase[]> {
    return of(this.MOCK_DATA).pipe(delay(300));
  }

  getFraudCaseById(id: string | number): Observable<FraudCase | undefined> {
    const fraudCase = this.MOCK_DATA.find(c => c.id == id);
    return of(fraudCase).pipe(delay(300));
  }
}
