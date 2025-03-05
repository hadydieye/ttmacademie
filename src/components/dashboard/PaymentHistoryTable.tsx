
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentHistory } from '@/hooks/useUserDashboard';
import { Badge } from "@/components/ui/badge";

interface PaymentHistoryTableProps {
  payments: PaymentHistory[];
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({ payments }) => {
  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'failed':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Fonction pour formater le nom de la méthode de paiement
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'orange-money':
        return 'Orange Money';
      case 'wave':
        return 'Wave';
      case 'payeer':
        return 'Payeer';
      case 'crypto':
        return 'Crypto';
      case 'card':
        return 'Carte bancaire';
      default:
        return method;
    }
  };

  if (payments.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-medium mb-2 dark:text-white">Aucun historique de paiement</h3>
        <p className="text-gray-500 dark:text-gray-400">Vos transactions apparaîtront ici après votre premier achat</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Détails</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Méthode</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.payment_id}>
              <TableCell className="font-medium">{payment.date}</TableCell>
              <TableCell>{payment.item_name}</TableCell>
              <TableCell>{payment.amount.toLocaleString('fr-FR')} {payment.currency}</TableCell>
              <TableCell>{formatPaymentMethod(payment.payment_method)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status === 'completed' ? 'Complété' :
                   payment.status === 'pending' ? 'En attente' :
                   payment.status === 'failed' ? 'Échoué' : payment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
