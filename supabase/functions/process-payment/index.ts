
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client with the admin key
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { paymentMethod, amount, planId, userId, email, currency } = await req.json()
    console.log(`Processing payment: ${paymentMethod} for ${amount} ${currency}`)

    // Validation
    if (!paymentMethod || !amount || !planId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Here we would integrate with different payment processors
    // This is a mock implementation for demonstration
    let paymentResult
    let paymentId = crypto.randomUUID()
    let status = 'pending'
    let paymentDetails = {}

    switch (paymentMethod) {
      case 'orange-money':
        // Simulate Orange Money integration
        paymentDetails = {
          provider: 'Orange Money',
          referenceId: `OM-${Math.floor(Math.random() * 1000000)}`,
          phoneNumber: email, // In a real implementation, you'd collect the phone number
        }
        // In a real implementation, you would call Orange Money API here
        console.log('Processing Orange Money payment')
        break

      case 'crypto':
        // Simulate crypto payment integration
        paymentDetails = {
          provider: 'Crypto',
          wallet: `0x${Math.random().toString(16).substring(2, 14)}`,
          currency: 'BTC',
        }
        // In a real implementation, you would integrate with a crypto payment gateway
        console.log('Processing Crypto payment')
        break

      case 'card':
        // Simulate card payment integration
        paymentDetails = {
          provider: 'Credit Card',
          last4: `${Math.floor(Math.random() * 10000)}`.padStart(4, '0'),
          brand: 'Visa',
        }
        // In a real implementation, you would integrate with a card processor like Stripe
        console.log('Processing Credit Card payment')
        break

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid payment method' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }

    // Store payment information in the database
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          payment_id: paymentId,
          user_id: userId,
          plan_id: planId,
          amount,
          currency,
          payment_method: paymentMethod,
          status,
          payment_details: paymentDetails,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error storing payment:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to process payment' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // In a real implementation, we would check the payment status and update accordingly
    // For demo purposes, we'll simulate a successful payment
    const { data: updatedPayment, error: updateError } = await supabase
      .from('payments')
      .update({ status: 'completed' })
      .eq('payment_id', paymentId)
      .select()

    if (updateError) {
      console.error('Error updating payment:', updateError)
    }

    // Return the payment information
    return new Response(
      JSON.stringify({
        success: true,
        payment: data[0],
        message: `Payment processed successfully via ${paymentMethod}`,
        nextSteps: getNextSteps(paymentMethod),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing payment:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Helper function to provide next steps based on payment method
function getNextSteps(paymentMethod: string): string {
  switch (paymentMethod) {
    case 'orange-money':
      return 'Vérifiez votre téléphone pour confirmer le paiement Orange Money.'
    case 'crypto':
      return 'Vérifiez la transaction sur la blockchain. Votre accès sera activé dès confirmation.'
    case 'card':
      return 'Votre paiement par carte a été traité. Vous avez accès immédiat à votre abonnement.'
    default:
      return 'Votre paiement est en cours de traitement.'
  }
}
