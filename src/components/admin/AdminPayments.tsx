
import React from 'react';
import Card from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, RefreshCw } from "lucide-react";
import { usePayment, PaymentData } from "@/hooks/usePayment";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";

export function AdminPayments() {
  const { getRecentPayments } = usePayment();
  
  const { 
    data: payments = [], 
    isLoading, 
    refetch 
  } = useQuery<PaymentData[]>({
    queryKey: ['recent-payments'],
    queryFn: () => getRecentPayments(10),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const fetchPayments = async () => {
    refetch();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Terminé</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">En attente</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'orange-money':
        return <Badge className="bg-orange-500">Orange Money</Badge>;
      case 'wave':
        return <Badge className="bg-blue-500">Wave</Badge>;
      case 'payeer':
        return <Badge className="bg-purple-500">Payeer</Badge>;
      case 'crypto':
        return <Badge className="bg-slate-800">Crypto</Badge>;
      case 'card':
        return <Badge className="bg-green-700">Carte</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  return (
    <Card>
      <Card.Header className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <Card.Title className="text-xl font-bold">Paiements récents</Card.Title>
          <Card.Description>
            Les 10 dernières transactions de paiement
          </Card.Description>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchPayments}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </Card.Header>
      <Card.Content>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <RefreshCw className="h-10 w-10 animate-spin text-gray-400" />
          </div>
        ) : payments.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-center">
            <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun paiement trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Article</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.payment_id}>
                    <TableCell className="font-medium">
                      {payment.created_at ? format(new Date(payment.created_at), 'dd MMM yyyy', { locale: fr }) : '-'}
                    </TableCell>
                    <TableCell>{payment.profiles?.name || 'Utilisateur inconnu'}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={payment.item_name}>
                      {payment.item_name}
                    </TableCell>
                    <TableCell>{getPaymentMethodIcon(payment.payment_method)}</TableCell>
                    <TableCell>{payment.amount.toLocaleString('fr-FR')} {payment.currency}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

export default AdminPayments;
