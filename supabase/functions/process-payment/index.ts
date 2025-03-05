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
    const { paymentMethod, amount, planId, userId, email, currency, courseId, courseName, screenshotUrl } = await req.json()
    console.log(`Processing payment: ${paymentMethod} for ${amount} ${currency}, course: ${courseName || 'N/A'}`)
    console.log(`Screenshot URL: ${screenshotUrl || 'None provided'}`)

    // Validation
    if (!paymentMethod || !amount || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Here we would integrate with different payment processors
    // This is a mock implementation for demonstration
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
          screenshotUrl: screenshotUrl
        }
        // In a real implementation, you would call Orange Money API here
        console.log('Processing Orange Money payment')
        break

      case 'wave':
        // Simulate Wave integration
        paymentDetails = {
          provider: 'Wave',
          referenceId: `WV-${Math.floor(Math.random() * 1000000)}`,
          phoneNumber: email,
          screenshotUrl: screenshotUrl
        }
        // In a real implementation, you would call Wave API here
        console.log('Processing Wave payment')
        break

      case 'payeer':
        // Simulate Payeer integration
        paymentDetails = {
          provider: 'Payeer',
          accountId: `PR-${Math.floor(Math.random() * 1000000)}`,
          wallet: email,
          screenshotUrl: screenshotUrl
        }
        // In a real implementation, you would call Payeer API here
        console.log('Processing Payeer payment')
        break

      case 'crypto':
        // Simulate crypto payment integration
        paymentDetails = {
          provider: 'Crypto',
          wallet: `0x${Math.random().toString(16).substring(2, 14)}`,
          currency: 'BTC',
          screenshotUrl: screenshotUrl
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
          screenshotUrl: screenshotUrl
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

    // Determine if this is a course payment or a plan payment
    const paymentType = courseId ? 'course' : 'plan';
    const itemId = courseId || planId;
    const itemName = courseName || planId;

    // Store payment information in the database
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          payment_id: paymentId,
          user_id: userId,
          item_id: itemId,
          item_type: paymentType,
          item_name: itemName,
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

    // Add course enrollment if this is a course payment
    if (courseId) {
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert([
          {
            user_id: userId,
            course_id: courseId,
            payment_id: paymentId,
            status: 'active',
            enrolled_at: new Date().toISOString(),
          },
        ])
      
      if (enrollmentError) {
        console.error('Error creating enrollment:', enrollmentError)
      }

      // Log the activity
      await supabase
        .from('activity_logs')
        .insert([
          {
            type: 'enrollment',
            user_id: userId,
            user_email: email,
            details: `Inscription au cours: ${courseName}`,
          },
        ])
    }

    // In a real implementation, we would check the payment status and update accordingly
    // For demo purposes, we'll simulate a successful payment if a screenshot was provided
    // Otherwise, leave it as pending for manual verification
    let finalStatus = screenshotUrl ? 'completed' : 'pending';
    
    const { data: updatedPayment, error: updateError } = await supabase
      .from('payments')
      .update({ 
        status: finalStatus,
        payment_details: {
          ...paymentDetails,
          verification_status: screenshotUrl ? 'screenshot_provided' : 'waiting_for_verification'
        }
      })
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
        message: screenshotUrl 
          ? `Paiement traité avec succès via ${paymentMethod}` 
          : `Paiement enregistré et en attente de vérification via ${paymentMethod}`,
        nextSteps: getNextSteps(paymentMethod, screenshotUrl),
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
function getNextSteps(paymentMethod: string, screenshotUrl?: string): string {
  const baseMessage = screenshotUrl 
    ? 'Votre capture d\'écran a été reçue. Notre équipe va vérifier votre paiement.' 
    : '';
    
  switch (paymentMethod) {
    case 'orange-money':
      return `${baseMessage} Vérifiez votre téléphone pour confirmer le paiement Orange Money.`;
    case 'wave':
      return `${baseMessage} Vérifiez votre téléphone pour confirmer le paiement Wave.`;
    case 'payeer':
      return `${baseMessage} Connectez-vous à votre compte Payeer pour confirmer la transaction.`;
    case 'crypto':
      return `${baseMessage} Vérifiez la transaction sur la blockchain. Votre accès sera activé dès confirmation.`;
    case 'card':
      return `${baseMessage} Votre paiement par carte a été traité. Vous avez accès immédiat à votre abonnement.`;
    default:
      return `${baseMessage} Votre paiement est en cours de traitement.`;
  }
}
