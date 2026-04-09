const supabase = require('../config/supabase');

// user_profiles.user_id is FK → users.id (custom users table)
// So we must ensure a row in `users` exists for this auth user before touching user_profiles

const ensureUserRow = async (authUser) => {
  // Use upsert to handle all cases: new user, existing user, stale data
  const { error } = await supabase.from('users').upsert({
    id: authUser.id,
    email: authUser.email,
    password_hash: 'supabase_auth_managed',
    full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Student',
    role: 'student',
    is_verified: !!authUser.email_confirmed_at,
  }, { onConflict: 'id' });
  if (error) console.error('ensureUserRow error:', error.message);
};

const getProfile = async (req, res) => {
  try {
    await ensureUserRow(req.user);

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) throw error;
    res.json(data || {});
  } catch (err) {
    console.error('getProfile error:', err.message);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

const updateProfile = async (req, res) => {
  const {
    date_of_birth, phone, current_education_level,
    field_of_interest, preferred_countries, budget_range, target_intake,
  } = req.body;

  // preferred_countries is TEXT[] in DB — convert comma-separated string to array if needed
  const parseCountries = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) return val;
    return val.split(',').map(s => s.trim()).filter(Boolean);
  };

  const updates = {
    date_of_birth: date_of_birth || null,
    phone: phone || null,
    current_education_level: current_education_level || null,
    field_of_interest: field_of_interest || null,
    preferred_countries: parseCountries(preferred_countries),
    budget_range: budget_range || null,
    target_intake: target_intake || null,
    updated_at: new Date().toISOString(),
  };

  try {
    // Ensure the user row exists (FK dependency)
    await ensureUserRow(req.user);

    // Check if profile row exists
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', req.user.id)
      .maybeSingle();

    let result;
    if (existing) {
      result = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', req.user.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('user_profiles')
        .insert({ user_id: req.user.id, ...updates })
        .select()
        .single();
    }

    if (result.error) throw result.error;
    res.json({ message: 'Profile updated successfully', profile: result.data });
  } catch (err) {
    console.error('updateProfile error:', err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = { getProfile, updateProfile };
