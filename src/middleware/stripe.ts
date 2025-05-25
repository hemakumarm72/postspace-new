/* eslint-disable @typescript-eslint/no-unsafe-call */
import Stripe from 'stripe';



import { StripeSecretKey } from '../config/env';


const options: Stripe.StripeConfig = {
  apiVersion: '2024-06-20',
  typescript: true,
}

const stripe: Stripe = new Stripe(StripeSecretKey, options)

export default stripe