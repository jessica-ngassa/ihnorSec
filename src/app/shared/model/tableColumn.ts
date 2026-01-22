// export interface TableColumn {
//   key: string;
//   label: string;
//   type?: 'text' | 'tag' | 'badge' | 'action' | 'profile';
// }

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'profile-icon' | 'double-text' | 'details' | 'score' | 'anomalies' | 'status' | 'action';
  subKey?: string;
  align?: 'left' | 'right' | 'center';
}
