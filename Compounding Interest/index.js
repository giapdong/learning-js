// P milions each year
// (r * 100)% / year
// n years
const P = 120_000_000
const r = 0.06
const n = 10

function formatMoney(money) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(money).replace('$', '')
}

/**
 * Caculate interest with recuisive algorithm
 */
function makeListPrefix(n) {
  if (n == 0) return []
  if (n == 1) return [1]

  let previousPrefix = makeListPrefix(n - 1)
  let newPrefix = [1]

  for (let i = 0; i < previousPrefix.length - 1; i++) {
    newPrefix.push(previousPrefix[i] + previousPrefix[i + 1])
  }

  newPrefix.push(n)

  return newPrefix
}

function caculatePrefix(r, n) {
  let prefix = makeListPrefix(n)
  let sumPrefix = 0
  for (let i = 0; i < prefix.length; i++) {
    sumPrefix += prefix[i] * Math.pow(r, n - i - 1)
  }
  return sumPrefix
}

function interestWithFormula(P, r, n) {
  const totalBuget = P * caculatePrefix(r, n)
  console.log('\nInterest with formula\n')
  console.log('Principal and interest: ', formatMoney(totalBuget))
  console.log('Interest: ', formatMoney(totalBuget - P * n))
}

/**
 * Caculate interest by recuisive
 */

function caculateRecuisiveInterest(P, r, n) {
  if (n == 0) return 0
  if (n == 1) return P

  return P + caculateRecuisiveInterest(P, r, n - 1) * (1 + r)
}

function interestWithRecuisive(P, r, n) {
  const totalBuget = caculateRecuisiveInterest(P, r, n)
  console.log('\nInterest with recuisive\n')
  console.log('Principal and interest: ', formatMoney(totalBuget))
  console.log('Interest: ', formatMoney(totalBuget - P * n))
}

/**
 * Executor
 */
interestWithFormula(P, r, n)
interestWithRecuisive(P, r, n)
