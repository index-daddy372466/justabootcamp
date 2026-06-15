// vars
require('dotenv').config()
const express = require('express')
const router = express.Router();
const path = require('path')


const route = {
    public: '../../public',
    premium: '../../public/premium'
}


// middleware
// Middleware to protect routes (ensure the user is logged in)
router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(function loveYourself(req,res,next){
    console.log('Love Yourself!')
    next();
})
router.use(express.static(path.resolve(__dirname, route.premium)));

const authenticateToken = (req, res, next) => {
  // Add your JWT or Session auth logic here
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  next();
};

// routes



// 1. GET all available membership tiers
router.get('/tiers', async (req, res) => {
  try {
    const tiers = [
      { id: 'tier_free', name: 'Free', price: 0, duration: 'monthly' },
      { id: 'tier_premium', name: 'Premium', price: 9.99, duration: 'monthly' },
      { id: 'tier_yearly', name: 'Premium Plus', price: 99.99, duration: 'yearly' }
    ];
    res.status(200).json(tiers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch membership tiers.' });
  }
});

// 2. GET current user's membership details
router.get('/current', authenticateToken, async (req, res) => {
  try {
    // Fetch user membership from the database (e.g., req.user.id)
    const membershipData = { status: 'active', tier: 'premium', expiresAt: '2027-01-01T00:00:00.000Z' };
    res.status(200).json(membershipData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current membership.' });
  }
});

// 3. POST Upgrade/Downgrade membership
router.post('/change', authenticateToken, async (req, res) => {
  try {
    const { tierId } = req.body;
    
    // Example validation
    if (!['tier_free', 'tier_premium', 'tier_yearly'].includes(tierId)) {
      return res.status(400).json({ error: 'Invalid tier ID.' });
    }

    // Process upgrade in DB / call payment gateway (e.g., Stripe, PayPal)
    res.status(200).json({ message: `Successfully upgraded to ${tierId}`, tier: tierId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process membership change.' });
  }
});

// 4. POST Cancel membership (or degrade to free)
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    // Logic to update user subscription status to 'canceled' or 'pending_cancellation' in DB
    res.status(200).json({ message: 'Membership successfully canceled. It will remain active until the end of the billing cycle.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel membership.' });
  }
});


module.exports = router