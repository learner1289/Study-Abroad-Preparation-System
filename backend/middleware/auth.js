const supabase = require('../config/supabase');

// FIX: Validate Supabase JWT via SDK — jwt.verify() with static secret does NOT work for Supabase
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ error: 'Token verification failed' });
  }
};

// requireAdmin: checks user_metadata.is_admin from auth token
// (user_profiles table has no is_admin column — set via Supabase dashboard user metadata)
const requireAdmin = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const isAdmin = req.user.user_metadata?.is_admin === true ||
                    req.user.app_metadata?.role === 'admin';
    if (!isAdmin) {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { authenticateUser, requireAdmin };
