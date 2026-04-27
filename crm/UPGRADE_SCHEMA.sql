-- CRM Upgrade: Add Follow-up Tracking and Outcome Fields
-- Run this in Supabase SQL Editor to upgrade your CRM

-- Add followed column (boolean flag for follow-up tracking)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS followed BOOLEAN DEFAULT false;

-- Add outcome column (track lead outcome/result)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS outcome VARCHAR(50) DEFAULT NULL;

-- Add last_contacted column (track when lead was last contacted)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS last_contacted TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Create index for followed status
CREATE INDEX IF NOT EXISTS idx_leads_followed ON leads(followed);

-- Create index for outcome
CREATE INDEX IF NOT EXISTS idx_leads_outcome ON leads(outcome);

-- Add comment to describe outcome values
COMMENT ON COLUMN leads.outcome IS 'Lead outcome: won, lost, no_response, qualified, disqualified, on_hold';

-- Update existing leads to have default values
UPDATE leads
SET followed = false
WHERE followed IS NULL;

-- Success message
SELECT 'CRM upgraded successfully! New fields: followed, outcome, last_contacted' as message;
