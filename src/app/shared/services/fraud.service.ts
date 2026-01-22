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
    // --- CASE 1: IDENTITY DESIGN MATCH ---
    {
      id: 1,
      recordType: 'identity',
      name: 'Jessica Ngassa',
      idNumber: 'CMR09284759',
      documentImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600',
      fraudScore: 87,
      status: 'High Risk',
      documentMatched: false,
      systemData: {
        name: 'Jessica Ngassa',
        idNumber: 'CMR09284759',
        dateOfBirth: '18/05/1996',
        region: 'Yaoundé - Civil Servant'
      },
      ocrData: {
        name: "N'Gassa Jessica",
        dob: "18/05/1996",
        idNumber: "CMR09284759",
        issueDate: "12/01/2020",
        expiryDate: "12/01/2030",
        address: "Yaoundé, Centre Region",
        confidence: 94.5
      },
      anomalies: [
        { id: '1', title: 'Mismatch between document and system name', description: 'Name Mismatch', severity: 'High' },
        { id: '2', title: 'Document used by multiple users', description: 'Duplicate Document', severity: 'High' },
        { id: '3', title: 'Critical field missing in system', description: 'Address Missing', severity: 'Medium' },
        { id: '4', title: 'Similar ID numbers in cluster', description: 'Suspicious Pattern', severity: 'Low' }
      ]
    },

    // --- CASE 2: PAYMENT DESIGN MATCH ---
    {
      id: 3,
      recordType: 'payment',
      name: 'Thomas Nkwenti',
      idNumber: 'CMR07835421',
      fraudScore: 92,
      status: 'High Risk',
      documentMatched: true,
      paymentData: {
        reference: 'RD-MAINT-2024-Q2-087',
        transactionId: 'PAY-2024-00847',
        paymentDate: '15/04/2024',
        department: 'Ministry of Public Works',
        paymentType: 'Road Maintenance Contract',
        approvedBy: 'Director Mballa J.',
        paymentMethod: 'Bank Transfer',
        recipientName: 'Thomas Nkwenti',
        previousPayments: 2,
        expectedAmount: 2750000,
        actualAmount: 8640000,
        variance: 5890000,
        variancePercentage: 214.2,
        averagePayment: 2650000
      },
      anomalies: [
        { id: '1', title: 'Payment 215% above expected amount', description: 'Massive Overpayment', severity: 'High' },
        { id: '2', title: 'Multiple payments for same project', description: 'Duplicate Payment', severity: 'High' },
        { id: '3', title: 'Missing secondary approval', description: 'Approval Chain Bypass', severity: 'Medium' }
      ]
    },

    // --- CASE 3: COMPLIANCE DESIGN MATCH ---
    {
      id: 9,
      recordType: 'compliance',
      name: 'Restaurant Le Gourmet',
      idNumber: 'FOOD-2024-001',
      fraudScore: 88,
      status: 'High Risk',
      documentMatched: true, // Reused for Status Card
      complianceData: {
        recordId: 'COMP-FOOD-20240510',
        date: '10/05/2024',
        location: 'Restaurant Le Gourmet - Douala',
        industry: 'Food Service',
        processStep: 'Food Storage & Refrigeration',
        performedBy: 'Night Shift Staff',
        deviationType: 'Temperature + Skipped Monitoring',
        impact: '15 customers reported food poisoning symptoms',
        expectedProcedure: 'Store seafood at 4°C, check temperature hourly',
        actualProcedure: 'Stored at 12°C, no temperature checks for 8 hours',
        expectedMeasurement: '4°C',
        measurement: '12°C'
      },
      ocrData: { // Needed to prevent errors in UI if accessed
        name: 'Le Gourmet', dob: '', idNumber: '', issueDate: '', expiryDate: '', address: '', confidence: 85.0
      },
      anomalies: [
        { id: '1', title: 'Food stored at dangerous temperature', description: 'Critical Temperature Violation', severity: 'High' },
        { id: '2', title: 'Temperature checks not performed', description: 'Procedure Skipped', severity: 'High' },
        { id: '3', title: 'Unqualified staff handling food', description: 'Personnel Violation', severity: 'Medium' }
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
