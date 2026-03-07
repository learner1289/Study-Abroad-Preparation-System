const supabase = require('../config/supabase');

const getAllUniversities = async (req, res) => {
  const { country_id, tuition_min, tuition_max } = req.query;
  try {
    let query = supabase.from('universities').select('*, countries(name, code)');
    if (country_id) query = query.eq('country_id', country_id);
    if (tuition_min) query = query.gte('tuition_min', tuition_min);
    if (tuition_max) query = query.lte('tuition_max', tuition_max);
    const { data, error } = await query.order('name');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve universities' });
  }
};

// FIX: Fetches all related data including intakes, language_requirements, scholarship_eligibility (FR-07/08/09)
const getUniversityById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('universities')
      .select(`
        *,
        countries(name, code),
        programs(*),
        intakes(*),
        language_requirements(*),
        scholarship_eligibility(*)
      `)
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'University not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve university' });
  }
};

const createUniversity = async (req, res) => {
  const { name, country_id } = req.body;
  if (!name || !country_id) return res.status(400).json({ error: 'Name and country are required' });
  try {
    const { data, error } = await supabase.from('universities').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create university' });
  }
};

const updateUniversity = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('universities').update(req.body).eq('id', req.params.id).select().single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'University not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update university' });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    const { error } = await supabase.from('universities').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'University deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete university' });
  }
};

module.exports = { getAllUniversities, getUniversityById, createUniversity, updateUniversity, deleteUniversity };
