-- Fix CRM Permissions
-- This allows the CRM dashboard to view and manage leads

-- Option 1: Disable RLS (Simplest - do this for now)
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Option 2: If you want to keep RLS enabled, use these policies instead:
-- (Comment out the DISABLE line above and uncomment below)

-- DROP POLICY IF EXISTS "Allow anon to read leads" ON leads;
-- DROP POLICY IF EXISTS "Allow anon to update leads" ON leads;
--
-- CREATE POLICY "Allow anon to read leads" ON leads
--   FOR SELECT
--   USING (true);
--
-- CREATE POLICY "Allow anon to update leads" ON leads
--   FOR UPDATE
--   USING (true);
