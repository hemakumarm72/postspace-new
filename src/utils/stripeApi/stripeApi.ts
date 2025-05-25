import Stripe from 'stripe'

import stripe from '../../middleware/stripe'

export const stripeSessionCreate = async (
  pricePlanId: string,
  userId: string,
  planId: string,
  stripeCustomerId: string,
) => {
  console.log(userId, planId, String(pricePlanId), 'plan price id')
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: pricePlanId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    client_reference_id: userId,
    metadata: {
      planId,
    },
    subscription_data: {
      metadata: {
        user_id: userId,
        plan_id: planId,
      },
    },
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  })

  return Promise.resolve(checkoutSession)
}
export const createStripeCustomer = async (email: string) => {
  const customer = await stripe.customers.create({
    email: email,
  })

  return Promise.resolve(customer)
}
export const stripeGetCustomer = async (stripeCustomerId: string) => {
  try {
    const customer = (await stripe.customers.retrieve(
      stripeCustomerId,
    )) as Stripe.Customer
    return Promise.resolve(customer)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const stripeCustomerDelete = async (stripCustomerId: string) => {
  try {
    await stripe.customers.del(stripCustomerId)
    return Promise.resolve()
  } catch (error) {
    // return Promise.reject(error);
  }
}

export const stripeSubscribesCancel = async (stripSubscribesId: string) => {
  try {
    await stripe.subscriptions.cancel(stripSubscribesId)
    return Promise.resolve()
  } catch (error) {
    console.log(error)
    // return Promise.reject()
  }
}
export const createStripePriceId = async (
  amount: number,
  currency: 'USD' | 'JPY',
  PlanName: string,
  interval: 'month' | 'week' | 'year' | 'day',
  intervalCount: number,
) => {
  const price = await stripe.prices.create({
    currency: currency,
    unit_amount: amount,
    recurring: {
      interval,
      interval_count: intervalCount,
    },
    product_data: {
      name: PlanName,
    },
  })

  return Promise.resolve(price)
}

export const stripeCardList = async (stripeCustomerId: string) => {
  try {
    const getList = await stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: 'card',
    })

    return Promise.resolve(getList)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const stripePaymentDetach = async (paymentMethodId: string) => {
  try {
    await stripe.paymentMethods.detach(paymentMethodId)

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const stripeCreditCardDeleteAll = async (stripeCustomerId: string) => {
  try {
    const paymentMethods = await stripeCardList(stripeCustomerId)

    paymentMethods
      ? paymentMethods.data.map(async (pm: any) => {
          await stripePaymentDetach(pm.id)
        })
      : []
    return Promise.resolve()
  } catch (error) {
    //  return Promise.reject(error);
  }
}

export const stripeDefaultPayment = async (
  stripeCustomerId: string,
  stripeSubscriptionId: string | null,
  paymentMethodId: string,
) => {
  try {
    await stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
      expand: ['invoice_settings.default_payment_method'],
    }) // TODO: update based customer id,

    stripeSubscriptionId
      ? await stripe.subscriptions.update(stripeSubscriptionId, {
          default_payment_method: paymentMethodId,
        })
      : null // TODO: update subscribes paymentMethod

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const stripePaymentAttach = async (
  stripeCustomerId: string,
  paymentMethodId: string,
  stripeSubscriptionId: string | null,
) => {
  try {
    const [intent] = await Promise.all([
      createStripeIntent(stripeCustomerId, paymentMethodId),
      // You can add other async operations here if needed
    ])

    const checkStripeIntentPromise = retrieveStripeIntent(intent.id)
    const stripDefaultPaymentPromise = stripeDefaultPayment(
      stripeCustomerId,
      stripeSubscriptionId,
      paymentMethodId,
    )

    const [checkStripeIntent] = await Promise.all([
      checkStripeIntentPromise,
      stripDefaultPaymentPromise,
    ])

    return Promise.resolve(checkStripeIntent)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createStripeIntent = async (
  stripeCustomerId: string,
  paymentMethodId: string,
) => {
  try {
    const stripeIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method: paymentMethodId,
      usage: 'off_session', //TODO: for subscriptions or future payments
      confirm: true,
      payment_method_types: ['card'],
    })
    return Promise.resolve(stripeIntent)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const retrieveStripeIntent = async (setupIntentId: string) => {
  try {
    const setUpIntent = await stripe.setupIntents.retrieve(setupIntentId)

    return setUpIntent
  } catch (error) {
    return Promise.reject(error)
  }
}

type inputCard = {
  cardNumber: string
  expMonth: number
  expYear: number
  cvc: string
  token: string
}

export const createStripePaymentMethod = async (card: inputCard) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: card.cardNumber,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        cvc: card.cvc,
        token: card.token,
      },
    })
    return Promise.resolve(paymentMethod)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getStripePaymentMethodById = async (paymentMethodId: string) => {
  try {
    const result = await stripe.paymentMethods.retrieve(paymentMethodId)
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}
