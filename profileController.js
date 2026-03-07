const supabase = require('../config/supabase');

const getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles').select('*').eq('id', req.user.id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Profile not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

const updateProfile = async (req, res) => {
  const { full_name, preferred_country, degree_level, field_of_study, budget_range, language_test, language_score } = req.body;
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        full_name, preferred_country, degree_level, field_of_study,
        budget_range, language_test, language_score,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.user.id)
      .select()
      .single();
    if (error) throw error;
    res.json({ message: 'Profile updated successfully', profile: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = { getProfile, updateProfile };
